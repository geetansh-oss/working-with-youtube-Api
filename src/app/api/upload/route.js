import { getToken } from "next-auth/jwt";
import uploadVideoYoutube from "@/utils/youtube.js";
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { putObject } from "@/utils/s3";


export async function POST(req, res) {

  const data = await req.formData();
  const file = data.get('video');
  const title = data.get('title');
  const description = data.get('description');
  const token = await getToken({ req });
  const accessToken = token.accessToken;

  console.log(file, title, description, accessToken);

  if (!file) {
    throw new Error('No file uploaded')
  };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join('./src/', 'uploads', file.name);
  await (writeFile(path, buffer));
  console.log(`${path}`);

  try {

    // uploadVideoYoutube(token, path, title, description);
    const uploadUrl = await putObject(`video-${Date.now()}.mp4`, 'video/mp4');

    return new Response(
      JSON.stringify({
        message: "sucess uploaded to youtube",
        uploadUrl: uploadUrl
      }), { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'video not uploaded to youtube',
        error : error.message
      }), { status: 500 }
    );
  }
}

