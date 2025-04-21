tsx
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <Button
          className="w-full bg-[#A453F2] hover:bg-[#A453F2]/90 text-white"
          onClick={() => signIn("google")}
        >
          <Image
            src="https://p129.p0.n0.cdn.zight.com/items/geuQwwwq/f7d9efe4-ed40-4a90-b537-064700bb38ca.svg?source=client&v=2c15211e8cd072bbfc32794cd20c1ab2" // Replace with your actual logo URL
            alt="Legal Moustache Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}