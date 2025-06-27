import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

// Initialize GridFS bucket (reuse from main route)
let bucket;
const initBucket = async () => {
  if (!bucket) {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI_TEST);
    }
    const db = mongoose.connection.db;
    bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'pdfStore' });
  }
  return bucket;
};

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid file ID format' },
        { status: 400 }
      );
    }

    const bucket = await initBucket();
    const objectId = new ObjectId(id);
    const filesCollection = mongoose.connection.db.collection('pdfStore.files');
    const fileDoc = await filesCollection.findOne({ _id: objectId });
    
    if (!fileDoc) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    const downloadStream = bucket.openDownloadStream(objectId);

    const headers = new Headers();
    headers.set('Content-Type', fileDoc.contentType || 'application/pdf');
    headers.set('Content-Length', fileDoc.length.toString());
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(fileDoc.filename)}"`);

    return new Response(downloadStream, { headers });
  } catch (error) {
    console.error('[PDF FETCH ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}