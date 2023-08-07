import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import type { GoogleProfile } from 'next-auth/providers/google';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (account?.provider === 'google') {
        const googleProfile = profile as GoogleProfile;
        return (
          googleProfile.email_verified &&
          googleProfile.email === process.env.ADMIN_EMAIL
        );
      }

      return false;
    },
  },
};

export default NextAuth(authOptions);
