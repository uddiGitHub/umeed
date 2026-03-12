import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });
    const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, thumbnailLink)",
    });

    const imageFiles = response.data.files || [];

    const imageList = imageFiles.map((file) => ({
      id: file.id,
      name: file.name,
      thumbnail: file.thumbnailLink,
      full: `https://lh3.googleusercontent.com/d/${file.id}`, // FIXED
    }));

    return NextResponse.json(imageList);

  } catch (error) {
    console.error("Gallery API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}