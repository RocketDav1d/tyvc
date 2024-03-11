import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client/edge';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

import { sendAuthenticationEmail } from '@/utils/email/templates/authentication';

const prisma = new PrismaClient();

export default NextAuth({
  pages: {
    signIn: '/auth/signup',
    verifyRequest: '/auth/verify',
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest(params) {
        return sendAuthenticationEmail({
          from: process.env.RESEND_FROM_EMAIL as string,
          to: params.identifier,
          url: params.url,
        });
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to the onboarding profile page after sign in
      return baseUrl + '/onboarding/profile';
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    maxAge: 14 * 24 * 60 * 60, // 14 days
    updateAge: 24 * 60 * 60, // 24 hours
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
});
