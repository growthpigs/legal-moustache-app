'use client'; // This directive marks it as a Client Component

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

// Wrap the SessionProvider around child components
export default function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
