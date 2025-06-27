import mangoose from "mongoose";

export const getBucket = async () => {
  if (!mangoose.connection.readyState) {
    await mangoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const db = mangoose.connection.db;
  return new mongoose.mongo.GridFSBucket(db, { bucketName: 'pdfStore' });
};

export const getFilesByCategory = async (category) => {
  const db = mongoose.connection.db;
  return db.collection('pdfStore.files')
    .find({ 'metadata.category': category })
    .toArray();
};


export const downloadFile = async (fileId, res) => {
  const bucket = getBucket();
  const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
  
  return new Promise((resolve, reject) => {
    const chunks = [];
    downloadStream.on('data', (chunk) => chunks.push(chunk));
    downloadStream.on('end', () => resolve(Buffer.concat(chunks)));
    downloadStream.on('error', reject);
  });
};