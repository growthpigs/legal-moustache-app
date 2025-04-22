import { Inter } from "next/font/google";

import Providers from './Providers';
import type { Metadata } from "next";
import './globals.css';
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Legal-Moustache",
  description: "AI-Powered Marketing Compliance Checks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased",inter.variable)} >
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl px-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
