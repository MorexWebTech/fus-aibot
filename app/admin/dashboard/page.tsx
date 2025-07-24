import React from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      subscriptions: true,
    },
  });
  return users;
}

const AdminDashboardPage = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Credits</th>
            <th>Subscription</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.credits}</td>
              <td>
                {user.subscriptions.length > 0
                  ? user.subscriptions[0].plan
                  : 'No subscription'}
              </td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Create User</button>
    </div>
  );
};

export default AdminDashboardPage;
