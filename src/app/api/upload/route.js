import { getToken } from "next-auth/jwt";
import uploadVideo from "@/utils/youtube.js";
import upload from "@/utils/multer.js";
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser
  },
};

export async function POST(req, res) {
  console.log("Processing upload ......");

  const formData = await req.formData();
      // const filePath = req.file.path;
      const video = formData.get('videoFilePath');
      console.log(video);
      const title = formData.get('title');
      const description = formData.get('description');
      console.log(title, description)

  upload.single('videoFilePath')(req, {}, async(err) =>{
    if(err){
      console.error('multer error:',err);
      return new Response(JSON.stringify({message: 'upload failed', error: err.message}), {status:500});
    }
  })

  const token = await getToken({ req });

  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }),{status: 401});
  }

  if (req.method == 'POST') {
    try {
      // const formData = await req.formData();
      // const filePath = req.file.path;
      // const title = formData.get('title');
      // const description = formData.get('description');
      
      console.log(filePath);

      const response = await uploadVideo(token.accessToken, filePath, title, description);
      return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Video upload failed', error: error.message }), { status: 500 });
    }
  }
  else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}