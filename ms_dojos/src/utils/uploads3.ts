import S3 from 'aws-sdk/clients/s3';

export async function uploadFile(fileName, filePath, mimeType) {
  const s3 = new S3({
    apiVersion: '2006-03-01',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  });

  const params: S3.PutObjectRequest = {
    Bucket: process.env.AWS_S3_DOJOS_LOGOS_BUCKET,
    Key: fileName,
    Body: filePath,
    ContentType: mimeType,
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}
