import React from 'react';
import { getToken } from "next-auth/jwt";
import uploadVideo from "@/utils/youtube.js"


const handler = async (req, res) => {
  const token = await getToken({});

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });

  }
  if (req.method == 'POST') {
    try {
      const { videoFilePath, title, description } = req.body;
      const response = await uploadVideo(token.accessToken, videoFilePath, title, description);
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({message:"video upload failed", error});
    }
  }else{
    res.setHeader('Allow',['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
