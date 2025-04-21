<<<<<<< HEAD
ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Add other providers as needed
=======
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

>>>>>>> 5afd933286e31ebdda8a47cb2980022c51eb7b87

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
<<<<<<< HEAD
    // ...other providers
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
=======
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});


export { handler as GET, handler as POST };


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
>>>>>>> 5afd933286e31ebdda8a47cb2980022c51eb7b87
