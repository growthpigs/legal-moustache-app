import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email'; // If you want passwordless email link sign-in
import CredentialsProvider from 'next-auth/providers/credentials'; // For email/password sign-in
import { FirestoreAdapter } from '@next-auth/firebase-adapter';

// Import your Firebase config (client-side for adapter) and Firebase Admin config (server-side)
import { db } from '@/lib/firebase'; // Client-side Firestore instance
import { adminDb } from '@/lib/firebase-admin'; // Admin Firestore instance for adapter

// Ensure environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables are not set. Google Provider will be disabled.');
  // You might throw an error here in production if Google login is mandatory
}
// Add checks for other necessary env vars if needed (e.g., for EmailProvider)

export const authOptions = {
  // Use FirestoreAdapter
  adapter: FirestoreAdapter(adminDb), // Pass the admin Firestore instance here

  providers: [
    // Google Provider (Requires Google Cloud Console setup and env vars)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Email/Password Provider (Example - requires custom credential handling)
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // --- IMPORTANT ---
          // You MUST implement your own logic here to verify the user's credentials
          // 1. Find user in your Firestore 'users' collection by email.
          // 2. Compare the provided password with the stored hashed password.
          //    - You'll need a password hashing library like `bcrypt`. Install it: `npm install bcrypt @types/bcrypt`
          //    - Hash passwords when users sign up/change passwords.
          //    - Use `bcrypt.compare()` here.
          // 3. If credentials are valid, return the user object (must include at least `id`, `email`, `name`).
          // 4. If invalid, return null or throw an Error.

          // Placeholder - THIS IS INSECURE, REPLACE WITH REAL LOGIC
          console.warn("INSECURE: Credentials provider needs real verification logic!");
          if (credentials?.email === "test@example.com" && credentials?.password === "password") {
            // Replace with actual user lookup and password check
             return { id: "test-user-id", name: "Test User", email: "test@example.com" };
          } else {
             return null; // Authentication failed
          }
        }
      })

    // Add other providers like EmailProvider if desired
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],

  // Optional: Define session strategy, callbacks, pages, etc.
  session: {
    strategy: 'jwt', // Using JWT for sessions is common with database adapters
  },
  callbacks: {
      // Example callback to include user ID in the session token
      async jwt({ token, user }) {
          if (user) {
              token.id = user.id;
          }
          return token;
      },
      async session({ session, token }) {
          if (session.user) {
              session.user.id = token.id as string; // Add id to session object
          }
          return session;
      },
  },
  pages: {
    signIn: '/login', // Redirect users to /login if they need to sign in
    // signOut: '/auth/signout', // Optional custom signout page
    // error: '/auth/error', // Optional custom error page
    // verifyRequest: '/auth/verify-request', // Optional email verification page
    // newUser: '/auth/new-user' // Optional new user page
  },

  // Add secret for production
   secret: process.env.NEXTAUTH_SECRET, // Crucial for production! Generate one and add to .env.local

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
