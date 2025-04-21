'use client'; // Need client component to use hooks

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'; // Import redirect

export default function DashboardPage() {
  const { data: session, status } = useSession({
    // If session is required, redirect if not authenticated
    required: true,
    onUnauthenticated() {
      // Redirect to login page if not authenticated
      redirect('/login');
    },
  });

  // Show loading state
  if (status === 'loading') {
    return <p className="p-6 text-center">Loading dashboard...</p>;
  }

  // If session exists (it should due to required: true), show content
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-2">Welcome back, {session?.user?.name ?? session?.user?.email}!</p>
      <p className="text-sm text-gray-600">Your user ID: {session?.user?.id}</p>
      {/* Dashboard content will go here */}
      <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}

