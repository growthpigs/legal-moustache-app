import Providers from './Providers'; // Use relative path
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'; // Ensure this imports the global styles
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar"; // Your Navbar component

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Legal Moustache",
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
        // Keep existing classes for background, font, layout
        className={cn(
          "min-h-screen flex flex-col bg-[#FFFFF6] font-sans antialiased",
          inter.variable
        )}
      >
        {/* Wrap Navbar and main content with Providers */}
        <Providers>
          <Navbar /> {/* Render the Navbar component */}
          {/* flex-1 allows this main section to grow */}
          <main className="flex-1">
            {children}
          </main>
          {/* Footer could potentially go here */}
        </Providers>
      </body>
    </html>
  );
}
