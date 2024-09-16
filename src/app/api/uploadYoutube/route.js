import uploadVideoYoutube from "@/utils/youtube";
import { getToken } from "next-auth/jwt";
import { downloadStream } from "@/utils/s3";
import { google } from 'googleapis';

export async function GET(req, res) {

  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return new Response(
      JSON.stringify({
        message: 'No access token available',
      }),
      { status: 401 }
    );
  }
  const accessToken = token.accessToken;

  // oauth2Client.on('tokens', (tokens) => {
  //   if (tokens.refresh_token) {
  //     // Store the refresh token in the session or database
  //     console.log('Refresh token:', tokens.refresh_token);
  //   }
  //   console.log('Access token:', tokens.access_token);
  // });
  

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
    // refresh_token: token.refreshToken
  });
  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  const videoKey = "editor-upload/video-1726156895477.mp4"
  const videoStream = await downloadStream(videoKey);
  if (!videoStream) {
    return new Response(
      JSON.stringify({
        message: 'No video url provided',
      }),
      { status: 400 }
    )
  }

  try {
    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: "test",
          description: "testdescription",
        },
        status: {
          privacyStatus: 'private', // Change to 'public' or 'unlisted' as needed
        },
      },
      media: {
        body: videoStream
      },
    });

    console.log("upload successful :", response.data);
    return new Response(
      JSON.stringify({
        message: "sucess uploaded to youtube",
        response: response
      }), { status: 200 }
    )
  } catch (error) {
    console.error(`Error during uploading: ${error}`);
    throw new Error('failed to upload video');
    return new Response(
      JSON.stringify({
        message: 'video not uploaded to youtube',
        error: error.message
      }), { status: 500 }
    )
  }
}