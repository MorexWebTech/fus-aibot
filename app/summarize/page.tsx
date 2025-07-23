import React, { useState } from 'react';

const SummarizePage = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    const response = await fetch('/api/ai/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <h1>Summarize Text</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
      />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizePage;
