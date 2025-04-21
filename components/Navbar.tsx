'use client'; // Required for using hooks like useSession

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from 'next-auth/react'; // Import useSession and signOut

export function Navbar() {
  const { data: session, status } = useSession(); // Get session data and status
  const isLoading = status === 'loading';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold inline-block">Legal Moustache</span>
        </Link>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-6 text-sm flex-1">
          {/* Show links only when logged in and not loading */}
          {status === 'authenticated' && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/check-content">Check Content</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Auth Buttons - Conditionally Render based on status */}
        <div className="flex items-center gap-2">
          {isLoading ? (
             <div className="h-8 w-20 animate-pulse bg-muted rounded-md"></div> // Placeholder while loading
          ) : session ? (
            <>
              {/* Show user info or account menu if desired */}
              {/* <span className="text-sm mr-2">{session.user?.email}</span> */}
              <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => signIn()}> {/* Can also use asChild + Link */}
                 Login
              </Button>
              <Button asChild className="bg-[#A453F2] hover:bg-[#A453F2]/90 text-white">
                 <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
