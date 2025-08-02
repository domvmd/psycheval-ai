'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
          
          <div className="mb-6">
            <p className="text-gray-600">Welcome back!</p>
            <p className="text-sm text-gray-500 mt-1">
              Logged in as: {user?.email}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h2 className="text-lg font-medium text-blue-900">Coming Soon</h2>
              <p className="text-blue-700 mt-1">
                Your session recordings and transcriptions will appear here.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}