import { google } from 'googleapis';

export default async function list(accessToken) {

  const youtube = google.youtube({
    version: 'v3',
    auth: accessToken,
  });

  const res = await youtube.videos.list({
    part: 'snippet',
    mine: true
  });

  return res.data;
}

 
