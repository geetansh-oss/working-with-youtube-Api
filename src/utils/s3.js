import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  }
});

// get the object from s3
const getObject = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "geet-02-videos",
    Key: key
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

// create downloadable stream of video file
const downloadStream = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "geet-02-videos",
    Key: key
  });
  try {
    const response = await s3Client.send(command);
    return response.Body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// put the object in s3
const putObject = async (filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: "geet-02-videos",
    Key: `editor-upload/${filename}`,
    ContentType: contentType
  });
  try {
    const url = await getSignedUrl(s3Client, command);
    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getObject, putObject, downloadStream};