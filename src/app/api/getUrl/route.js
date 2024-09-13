import { getObject } from "@/utils/s3";

export async function GET() {

  try {
    const url = await getObject("editor-upload/video-1726156895477.mp4");
    const qwe = url.split("?")[0];
    return new Response(JSON.stringify({
      message: "success",
      url: url
    }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}