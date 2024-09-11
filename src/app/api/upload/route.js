// import { getToken } from "next-auth/jwt";
// import uploadVideoYoutube from "@/utils/youtube.js";
import { join } from 'path';
import { writeFile } from 'fs/promises';


export async function POST(request) {
  const data = await request.formData();
  const file = data.get('video');
  const title = data.get('title');
  const description = data.get('description');

  console.log(file, title, description);

  if (!file) {
    throw new Error('No file uploaded')
  };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join('@/','uploads', file.name);
  await (writeFile(path, buffer));
  console.log(`${path}`);

  return new Response(JSON.stringify({ message: "sucess" }), { status: 200 });
}

