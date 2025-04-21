"use client"; // Required for using hooks like useSession

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

// Top-level Navbar component export
export function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-inter">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="mr-auto flex items-center space-x-2 md:mr-6">
          {/* Placeholder for the Legal Moustache Logo */}
        <img
          src="https://p129.p0.n0.cdn.zight.com/items/ApuWAE9Q/8d2c50de-43ea-4e93-833d-383645a967d3.svg?v=4bb7fdd9894dd4be04f33bc051e739de"
          alt="Legal Moustache Logo"
          className="h-8 w-auto" />        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={toggleMenu} asChild>
              <button aria-label="Open Menu" className="focus:outline-none">
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <img
                  src="https://p129.p0.n0.cdn.zight.com/items/ApuWAE9Q/8d2c50de-43ea-4e93-833d-383645a967d3.svg?v=4bb7fdd9894dd4be04f33bc051e739de"
                  alt="Legal Moustache Logo"
                  className="h-8 w-auto" />
              </SheetHeader>
              <MobileNavLinks
                session={session}
                status={status}
                isLoading={isLoading}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <DesktopNavLinks
            session={session}
            status={status}
            isLoading={isLoading}
          />
        </div>
      </div>
    </header>
  );
}

function DesktopNavLinks({ session, status, isLoading }) {
  return (
    <>
      <nav className="flex items-center gap-6 text-sm flex-1">
        {status === "authenticated" && (
          <>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/check-content">Check Content</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#">Account Settings</Link>
            </Button>
          </>
        )}
      </nav>
      <AuthButtons session={session} status={status} isLoading={isLoading} />
    </>
  );
}

function MobileNavLinks({ session, status, isLoading }) {
  return (
    <div className="flex flex-col mt-4 gap-4">
      {status === "authenticated" && (
        <>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/check-content">Check Content</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#">Account Settings</Link>
          </Button>
        </>
      )}
      <AuthButtons session={session} status={status} isLoading={isLoading} />
    </div>
  );
}

function AuthButtons({ session, status, isLoading }) {
  return (
    <div className="flex items-center gap-2 text-base">
      {isLoading ? (
        <div className="h-8 w-20 animate-pulse bg-muted rounded-md" />
      ) : session ? (
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Button>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-[#A453F2] hover:bg-[#A453F2]/90 text-white"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
