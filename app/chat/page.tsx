import React, { useState, useEffect } from 'react';

const ChatPage = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const userId = 'user1'; // In a real app, you'd get the user ID from the session

  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await fetch(`/api/ai/chat?userId=${userId}`);
      const data = await response.json();
      setChatHistory(data);
    };
    fetchChatHistory();
  }, []);

  const handleSend = async () => {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, prompt }),
    });
    const data = await response.json();
    setChatHistory([...chatHistory, { prompt }, { response: data.response }]);
    setPrompt('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            {message.prompt && <p>You: {message.prompt}</p>}
            {message.response && <p>AI: {message.response}</p>}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatPage;
