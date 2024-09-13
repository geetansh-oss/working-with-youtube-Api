'use client'

import { getObject } from "@/utils/s3";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import uploadVideoYoutube from "@/utils/youtube";

const handleUpload = async () => { }

export default function Profile() {
  const [videoUrl, setVideoUrl] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await fetch('api/getUrl', {
        method: 'GET',
      });
      if (response.ok) {
        console.log(response);
        const data = await response.json();
        setVideoUrl(data.url);
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
      <button onClick={handleUpload}>upload video</button>
    </div>
  )
}
