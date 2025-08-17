import mongoose from "mongoose";
import PostItem from "../../../../models/postItem.jsx";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../config/db.jsx";
import { console } from "inspector";
import sanitizeHtml from "sanitize-html";

// Connect to database
connectDB();

async function createTextIndex() {
  try {
    await PostItem.init();
    if (!(await PostItem.collection.indexExists("search_index"))) {
      await PostItem.collection.createIndex(
        {
          title: "text",
          content: "text",
          author: "text",
          category: "text",
          tags: "text",
        },
        {
          name: "search_index",
          weights: {
            title: 10,
            tags: 5,
            category: 4,
            author: 3,
            content: 1,
          },
        }
      );
      console.log("Text index created successfully");
    }
  } catch (error) {
    console.error("Error creating text index:", error);
  }
}
createTextIndex();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const searchQuery = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    let filter = {};
    let sort = { createdAt: -1 };

    if (searchQuery) {
      filter = { $text: { $search: searchQuery } };
      sort = { score: { $meta: "textScore" } };
    }

    const aggregationPipeline = [
      { $match: filter },
      { $sort: sort },
      {
        $facet: {
          posts: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                title: 1,
                content: 1,
                img: 1,
                category: 1,
                author: 1,
                createdAt: 1,
                tags: 1,
                ...(searchQuery && { score: { $meta: "textScore" } }),
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const [result] = await PostItem.aggregate(aggregationPipeline);

    const posts = result.posts || [];
    const totalCount = result.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      posts,
      totalCount,
      currentPage: page,
      totalPages,
      limit,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const { userId } = token ? getAuth(request) : { userId: null };

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }
    const cleanContent = sanitizeHtml(data.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "p",
        "b",
        "i",
        "em",
        "strong",
        "a",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "blockquote",
        "img",
        "br",
      ]),
      allowedAttributes: {
        a: ["href", "target"],
        img: ["src", "alt"],
        "*": ["style"],
      },
      allowedSchemes: ["http", "https", "data"],
    });
    // console.log("Received data:", data);
    
    // Post creation
    const newPost = new PostItem({
      ...data,
      content: cleanContent,
      author: data.author || "UMEED",
    });

    const savedPost = await newPost.save();
    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: error.message || "Database operation failed" },
      { status: 500 }
    );
  }
}
