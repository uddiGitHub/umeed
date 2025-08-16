import { NextResponse } from "next/server";
import mongoose from "mongoose";
import subscribes from "../../../../models/Subscribes";
import sendEmail from "../../../lib/sendEmail";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

// Initialize GridFS
let bucket;
const initBucket = async () => {
  if (!bucket) {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI_TEST);
    }
    const db = mongoose.connection.db;
    bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pdfStore" });
  }
  return bucket;
};

// POST
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = formData.get("category");

    if (!file || !category) {
      return NextResponse.json(
        { error: "File and category are required" },
        { status: 400 }
      );
    }

    const bucket = await initBucket();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { category },
      contentType: file.type,
    });

    uploadStream.end(buffer);

    return new Promise((resolve) => {
      uploadStream.on("finish", async () => {
        try {
          const subscribers = await subscribes.find({});
          if (subscribers.length > 0) {
            const emails = subscribers.map((s) => s.email);

            const downloadLink = `${process.env.NEXT_PUBLIC_SITE_URL}/pages/newsletter`;

            const cleanCategory = purify.sanitize(category, {
              ALLOWED_TAGS: [],
            });
            const cleanFileName = purify.sanitize(file.name, {
              ALLOWED_TAGS: [],
            });
            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Notification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #fff9e6;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 32px auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        .header {
            padding: 24px;
            background: linear-gradient(135deg, #e8c03b 0%, #ffd166 100%);
            text-align: center;
            position: relative;
        }
        .header::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, #e8c03b, #ffd166, #e8c03b);
        }
        .header h1 {
            margin: 0;
            font-size: 1.8rem;
            font-weight: bolder;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        .content {
            padding: 32px;
        }
        .file-card {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding: 16px;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid #e8c03b;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        .file-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ffd166, #e8c03b);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            flex-shrink: 0;
        }
        .file-info h2 {
            margin: 0 0 4px 0;
            font-size: 1.4rem;
            font-weight: 700;
            color: #1a1a1a;
        }
        .file-info p {
            margin: 0;
            color: #64748b;
            font-size: 0.95rem;
        }
        .description {
            color: #475569;
            line-height: 1.6;
            font-size: 1.05rem;
            margin-bottom: 32px;
        }
        .btn-container {
            text-align: center;
            margin-bottom: 32px;
        }
        .btn {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #e8c03b 0%, #ffd166 100%);
            color: #1a1a1a;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(232, 192, 59, 0.3);
        }
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(232, 192, 59, 0.4);
        }
        .note {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 16px;
            border-left: 4px solid #94a3b8;
            color: #475569;
            font-size: 0.95rem;
        }
        .note strong {
            color: #1a1a1a;
        }
        .footer {
            padding: 24px;
            background-color: #f1f5f9;
            text-align: center;
            color: #64748b;
            font-size: 0.9rem;
            border-top: 1px solid #e2e8f0;
        }
        .footer-links {
            margin: 16px 0;
        }
        .footer-links a {
            color: #2563eb;
            text-decoration: none;
            margin: 0 8px;
            font-weight: 500;
        }
        .footer small {
            display: block;
            font-size: 0.8rem;
            color: #94a3b8;
            margin-top: 16px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>New Newsletter Available</h1>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="file-card">
                <div class="file-info">
                    <h2>${cleanFileName}</h2>
                    <p>Category: ${cleanCategory} • ${new Date().toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            )}</p>
                </div>
            </div>
            
            <p class="description">
                We’re pleased to announce that a new newsletter in the <strong>${cleanCategory}</strong> category is now available for you to read and download.
            </p>
            
            <div class="btn-container">
                <a href="${downloadLink}" class="btn">
                    View Newsletter
                </a>
            </div>
            
            <div class="note">
                <strong>Note:</strong> This document is provided in PDF format. You may need Adobe Acrobat Reader to view this file.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>© ${new Date().getFullYear()} ${"Maan ki Umeed"}. All rights reserved.</p>
            
            <small>
                This is an automated notification. Please do not reply to this message.<br>
                ${process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Office? Nah. We live on the internet. HQ expands worldwide as soon as we go viral.'}
            </small>
        </div>
    </div>
</body>
</html>
`;
            await sendEmail(
              emails.join(","),
              `New Newsletter: ${cleanCategory} Update`,
              htmlContent
            );
          }
        } catch (err) {
          console.error("[NEWSLETTER EMAIL ERROR]", err);
        }

        resolve(
          NextResponse.json(
            {
              success: true,
              fileId: uploadStream.id,
              category,
            },
            { status: 201 }
          )
        );
      });
    });
  } catch (error) {
    console.error("[PDF UPLOAD ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}

// GET: List PDFs by category with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "uploadDate";
    const order = searchParams.get("order") || "desc";

    await initBucket();
    const db = mongoose.connection.db;
    const query = category ? { "metadata.category": category } : {};

    // Validate sort field
    const sortOptions = { [sort]: order === "asc" ? 1 : -1 };

    const files = await db
      .collection("pdfStore.files")
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalCount = await db
      .collection("pdfStore.files")
      .countDocuments(query);

    return NextResponse.json({
      success: true,
      data: files,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("[PDF QUERY ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Query failed: " + error.message,
      },
      { status: 500 }
    );
  }
}
