'use client'; // Required for using hooks like useState and functions like signIn

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Import signIn

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Email/Password Sign In
  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false, // Don't redirect automatically, handle response
        email: email,
        password: password,
      });

      if (result?.error) {
        setError('Invalid email or password.'); // Show generic error
        console.error("Sign in error:", result.error);
      } else if (result?.ok) {
        // Successful sign in - NextAuth usually redirects automatically
        // If not redirecting, you might manually redirect here:
         window.location.href = '/dashboard'; // Or wherever you want users to go
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error("Sign in exception:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Redirects user to Google, then back to the callback URL
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (err) {
       setError('Failed to start Google sign-in.');
       console.error("Google sign in error:", err);
       setIsLoading(false); // Only set loading false on error here
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.14))]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        {/* Wrap fields in a form */}
        <form onSubmit={handleCredentialsSignIn}>
          <CardContent className="grid gap-4">
            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md text-center">
                {error}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {/* Sign In Button (type="submit") */}
            <Button
              type="submit" // Make this submit the form
              className="w-full bg-[#A453F2] hover:bg-[#A453F2]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </CardContent>
        </form>
         {/* Separator or just place Google button outside the email/pw form */}
         <CardContent className="grid gap-4 pt-0"> {/* Added pt-0 */}
            {/* Google Sign In Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn} // Add onClick handler
              disabled={isLoading}
            >
               {/* Basic Google Icon Placeholder */}
               <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                 <path d="M488 261.8C488 403.3 381.5 512 244.8 512C108.1 512 0 403.3 0 261.8C0 120.3 108.1 11.8 244.8 11.8C316.1 11.8 377.4 41.1 423.5 85.5L352.6 150.3C322.9 123.2 288.4 108.8 244.8 108.8C168.5 108.8 106.7 170.5 106.7 261.8C106.7 353 168.5 414.8 244.8 414.8C297.4 414.8 337.9 394.5 364.1 369.3C385.4 349 400.1 320.6 407.1 284.8L244.8 284.8L244.8 210.4L483.4 210.4C485.6 224.3 488 241.9 488 261.8z"/>
               </svg>
              Sign in with Google
            </Button>
        </CardContent>
        <CardFooter className="text-sm">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 ml-1" asChild>
            <Link href="/signup">
               Sign up
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
