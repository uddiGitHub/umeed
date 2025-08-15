import mongoose from "mongoose";
import Subscribes from "./Subscribes";
import sendEmail from "../src/lib/sendEmail";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";


const window = new JSDOM("").window;
const purify = DOMPurify(window);

const postItemSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    category: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      // minlength: 50
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postItemSchema.post("save", async function (doc) {
  try {
    const subscribers = await Subscribes.find({});
    if (!subscribers.length) return;

    const emails = subscribers.map((s) => s.email);

    const tempDiv = window.document.createElement("div");
    tempDiv.innerHTML = doc.content;
    const plainTextPreview = tempDiv.textContent || tempDiv.innerText || "";
    const preview =
      plainTextPreview.length > 200
        ? plainTextPreview.substring(0, 200) + "..."
        : plainTextPreview;

    const cleanTitle = purify.sanitize(doc.title, { ALLOWED_TAGS: [] });
    const cleanPreview = purify.sanitize(preview, { ALLOWED_TAGS: [] });
    const cleanAuthor = purify.sanitize(doc.author, { ALLOWED_TAGS: [] });

    const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>New Article Published</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #fffdf5;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    color: #1a1a1a;
  }
  .container {
    max-width: 640px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    border-top: 6px solid #e8c03b;
  }
  .header {
    background: linear-gradient(135deg, #fff9e6 0%, #fff3c4 100%);
    padding: 24px;
    text-align: center;
    border-bottom: 1px solid #f5e5a5;
  }
  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
  }
  .content {
    padding: 32px;
  }
  .content h2 {
    margin-top: 0;
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
  }
  .content p {
    font-size: 16px;
    line-height: 1.7;
    color: #444;
  }
  .divider {
    border-top: 1px solid #eee;
    margin: 32px 0;
  }
  .author {
    font-size: 14px;
    font-style: italic;
    color: #666;
    text-align: center;
  }
  .button {
    display: inline-block;
    background: linear-gradient(135deg, #ffd166, #e8c03b);
    color: #1a1a1a;
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    font-size: 16px;
    transition: opacity 0.3s;
  }
  .button:hover {
    opacity: 0.85;
  }
  .footer {
    background: #f9f9f9;
    padding: 20px;
    text-align: center;
    font-size: 14px;
    color: #555;
    border-top: 1px solid #eee;
  }
  .footer a {
    color: #e8c03b;
    text-decoration: none;
  }
  .footer small {
    display: block;
    margin-top: 8px;
    color: #999;
    font-size: 12px;
  }
</style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>New Article Published</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>${cleanTitle}</h2>
      <p>${cleanPreview}</p>
      <div class="divider"></div>
      <p class="author">Written by ${cleanAuthor}</p>
      <div style="text-align:center; margin-top: 24px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/pages/articles/${doc._id}" class="button">Read Full Article</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${"Maan ki Umeed"}. All rights reserved.</p>
      <small>This is an automated notification. Please do not reply to this message.</small>
    </div>
  </div>
</body>
</html>
    `;

    await sendEmail(
      emails.join(","),
      `New Article: ${cleanTitle}`,
      emailTemplate
    );
  } catch (error) {
    console.error("Error sending update email:", error);
  }
});


export default mongoose.models.PostItem ||
  mongoose.model("PostItem", postItemSchema);
