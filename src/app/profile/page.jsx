'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";;

const handleUpload = async () => {
  try {
    const response = await fetch('api/uploadYoutube', {
      method: 'GET'
    })
    console.log(response, "response from server");
  } catch (error) {
    console.error(error);
  }
}

export default function Profile() {
  const [videoUrl, setVideoUrl] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await fetch('api/getUrl', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setVideoUrl(data.url);
        console.log(data.url);
      }
    }
    fetchUrl();
  }, []);

  if (!session) {
    return <p>You need to be signed in to upload a video.</p>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <div>
        {videoUrl ? (
          <video src={videoUrl} controls />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
      <button onClick={() => handleUpload(videoUrl)}>
        upload video
      </button>
    </div>
  )
}
