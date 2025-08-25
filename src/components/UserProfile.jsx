import React from 'react';

export default function UserProfile({ user }) {
  return (
    <div className="card p-4">
      <div className="font-semibold">Profile</div>
      <div className="text-sm text-gray-700">{user?.name || user?.email}</div>
      <div className="text-xs text-gray-500 capitalize">Role: {user?.role}</div>
    </div>
  )
}