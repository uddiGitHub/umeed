import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Initialize GridFS 
let bucket;
const initBucket = async () => {
  if (!bucket) {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const db = mongoose.connection.db;
    bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'pdfStore' });
  }
  return bucket;
};

// POST
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category');

    if (!file || !category) {
      return NextResponse.json(
        { error: 'File and category are required' },
        { status: 400 }
      );
    }

    const bucket = await initBucket();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { category },
      contentType: file.type
    });
    
    uploadStream.end(buffer);
    
    return new Promise((resolve) => {
      uploadStream.on('finish', () => {
        resolve(NextResponse.json({
          success: true,
          fileId: uploadStream.id,
          category
        }, { status: 201 }));
      });
    });
  } catch (error) {
    console.error('[PDF UPLOAD ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}

// GET: List PDFs by category with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sort = searchParams.get('sort') || 'uploadDate';
    const order = searchParams.get('order') || 'desc';

    await initBucket();
    const db = mongoose.connection.db;
    const query = category ? { 'metadata.category': category } : {};
    
    // Validate sort field
    const sortOptions = { [sort]: order === 'asc' ? 1 : -1 };
    
    const files = await db.collection('pdfStore.files')
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    const totalCount = await db.collection('pdfStore.files')
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
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('[PDF QUERY ERROR]', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Query failed: ' + error.message 
      },
      { status: 500 }
    );
  }
}