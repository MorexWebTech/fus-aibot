import React, { useState } from 'react';

const FaceClonePage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [clonedImageUrl, setClonedImageUrl] = useState('');

  const handleGenerate = async () => {
    const response = await fetch('/api/ai/face-clone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });
    const data = await response.json();
    setClonedImageUrl(data.clonedImageUrl);
  };

  return (
    <div>
      <h1>AI Face Clone</h1>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <button onClick={handleGenerate}>Generate</button>
      {clonedImageUrl && <img src={clonedImageUrl} alt="Cloned face" />}
    </div>
  );
};

export default FaceClonePage;
