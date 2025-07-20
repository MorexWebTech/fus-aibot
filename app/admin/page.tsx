import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    // In a real application, you would fetch the users and content from your database.
    const mockUsers = [
      { email: 'user1@example.com', credits: 100, subscription: 'premium' },
      { email: 'user2@example.com', credits: 50, subscription: 'basic' },
    ];
    setUsers(mockUsers);
    setContent('Welcome to the Fus AI Model!');
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleContentSave = () => {
    // In a real application, you would save the content to your database.
    alert('Content saved!');
  };

  return (
    <div>
      <h1>Admin Portal</h1>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Credits</th>
            <th>Subscription</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.credits}</td>
              <td>{user.subscription}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>CMS</h2>
      <textarea value={content} onChange={handleContentChange} />
      <button onClick={handleContentSave}>Save Content</button>
    </div>
  );
};

export default AdminPage;
