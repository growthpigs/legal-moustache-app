"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
        router.push('/dashboard');
    } catch (error) {
        setError("An unexpected error occurred");
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[#FFFFF6]">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#0C1713]">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#343534]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-[#343534]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
              />
            </div>
            <Button type="submit" className="bg-[#A453F2]">
              Sign Up
            </Button>
            <Button type="button" className="bg-[#A453F2]" onClick={() => signIn("google")}>
              Sign up with Google
            </Button>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
