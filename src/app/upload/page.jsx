'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('video uploaded');
        router.push('/');
      }
    } catch (error) {
      console.error();
    }
  };

  if (!session) {
    return <p>You need to be signed in to upload a video.</p>;
  }

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='flex item-center'>Upload Video</h1>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className='rounded-lg bg-slate-950 text-yellow-300' onClick={handleUpload}>Upload</button>
    </div>
  );
}
