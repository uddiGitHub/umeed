import PostItem from "../../../../../models/postItem.jsx";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "../../../../../config/db.jsx";
import sanitizeHtml from "sanitize-html";
import mongoose from "mongoose";

// Connect to database
connectDB();

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const post = await PostItem.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Fetch single post error:", error);
    return NextResponse.json(
      { error: "Failed to fetch the post" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const { userId } = token ? getAuth(request) : { userId: null };

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const data = await request.json();

    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const cleanContent = sanitizeHtml(data.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "p", "b", "i", "em", "strong", "a", "ul", "ol", "li",
        "h1", "h2", "h3", "blockquote", "img", "br",
      ]),
      allowedAttributes: {
        a: ["href", "target"],
        img: ["src", "alt"],
        "*": ["style"],
      },
      allowedSchemes: ["http", "https", "data"],
    });

    const updatedPost = await PostItem.findByIdAndUpdate(
      id,
      {
        ...data,
        content: cleanContent,
        author: data.author || "UMEED",
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: error.message || "Database operation failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const { userId } = token ? getAuth(request) : { userId: null };

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const deletedPost = await PostItem.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully", id }, { status: 200 });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
