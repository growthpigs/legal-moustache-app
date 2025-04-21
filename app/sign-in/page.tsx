tsx
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    // Instead of router.push, use redirect outside the component body
    redirect('/dashboard');
    
  } else if(session){
    return <div>Loading...</div>
  }

  const handleSignIn = async () => {
    setError(null); // Clear previous errors

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // Prevent default redirect
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFF6] py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-[#0C1713]">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#343534]">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#343534]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-[#343534]">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#343534]"
              />
            </div>
            <Button
              className="bg-[#A453F2] text-white hover:bg-[#9346E0]"
             onClick={handleSignIn}
            >
              Sign In
              
              
            </Button>
          </div>
          <div className="mt-6">
            <Button
              className="w-full bg-white text-[#343534] hover:bg-gray-100 border border-gray-300"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;