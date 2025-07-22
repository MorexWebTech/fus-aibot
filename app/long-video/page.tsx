import React, { useState } from 'react';

const LongVideoPage = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    const response = await fetch('/api/ai/long-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setVideoUrl(data.videoUrl);
  };

  return (
    <div>
      <h1>Long Video Generation</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for the video"
      />
      <button onClick={handleGenerate}>Generate</button>
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default LongVideoPage;
