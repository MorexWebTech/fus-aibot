import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch the data from your database.
    const mockUsers = [
      { email: 'user1@example.com', credits: 100, subscription: 'premium' },
      { email: 'user2@example.com', credits: 50, subscription: 'basic' },
    ];
    setUsers(mockUsers);
    setContent('Welcome to the Fus AI Model!');
    const mockBlogPosts = [
      { id: 1, title: 'New Feature: AI Face Clone', content: 'We have just released a new feature that allows you to clone faces using AI.' },
      { id: 2, title: 'New Payment Options', content: 'We now support payments in NGN and USD.' },
    ];
    setBlogPosts(mockBlogPosts);
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
      <h2>Blog Posts</h2>
      <ul>
        {blogPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
