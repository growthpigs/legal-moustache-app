ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Add other providers as needed

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...other providers
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };