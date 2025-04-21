'use client'; // Need client component to use hooks

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession({ // Corrected useSession parameter
    // If session is required, redirect if not authenticated
    required: true,
    onUnauthenticated() {
      // Redirect to login page if not authenticated
      redirect('/login');
    },
  });

  // Show loading state
  if (status === 'loading') {
    return <p className="p-6 text-center text-lg">Loading dashboard...</p>;
  }
  const userName = session?.user?.name || session?.user?.email;

  return (
    <div className="container mx-auto px-6 py-8 bg-[#FFFFF6]">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[#0C1713]">Dashboard</h1>
        <p className="text-lg text-[#343534] mb-8">
          Welcome back,{' '}
          <span className="font-semibold">
            {userName}!
          </span>
        </p>
        <Link href="/check-content">
          <Button className="bg-[#A453F2] text-white px-6 py-4 rounded">
            Check New Content
          </Button>
        </Link>
      </div>
    </div>
  );
}

