'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function UploadPage() {
  const { data: session } = useSession();
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('videoFilePath', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  if (!session) {
    return <p>You need to be signed in to upload a video.</p>;
  }

  return (
    <div className = 'flex flex-col'>
      <h1 className='flex item-center'>Upload Video</h1>
      <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button className='rounded-lg bg-slate-950 text-yellow-300' onClick={handleUpload}>Upload</button>
    </div>
  );
}
