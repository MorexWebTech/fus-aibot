import React from 'react';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Portal</h1>
      <p>Welcome to the admin portal.</p>
      <Link href="/admin/dashboard">
        <a>Go to Dashboard</a>
      </Link>
    </div>
  );
};

export default AdminPage;
