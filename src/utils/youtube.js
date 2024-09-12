// lib/youtube.js
import { google } from 'googleapis';
import {createReadStream} from 'fs';

const uploadVideoYoutube = async (accessToken, videoFilePath, title, description) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  console.log("uploading on youtube ... ")
  try {
    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
        },
        status: {
          privacyStatus: 'private', // Change to 'public' or 'unlisted' as needed
        },
      },
      media: {
        body: createReadStream(videoFilePath),
      },
    });

    console.log("upload successful :" , response.data);

    return response.data;

  } catch (error) {
    console.error(`Error during uploading: ${error}`);
    throw new Error('failed to upload video');
  }
}
export default uploadVideoYoutube;