import React from 'react';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">My Profile</h3>
                <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-2">My Events</h3>
                <p className="text-gray-600">You have no upcoming events</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">My Resources</h3>
                <p className="text-gray-600">No resources saved yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}