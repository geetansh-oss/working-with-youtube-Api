// lib/youtube.js
import { google } from 'googleapis';
import fs from 'fs';

const uploadVideo = async(accessToken, videoFilePath, title, description) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

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
      body: fs.createReadStream(videoFilePath),
    },
  });

  return response.data;
}

export default uploadVideo;