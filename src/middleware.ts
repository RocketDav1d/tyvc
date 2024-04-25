
import { OnboardingStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { checkUserOnboardingStatus } from '@/server/db/handlers/User';

export default withAuth(async function middleware(req) {
  if (req.nextauth.token?.email) {
    const userOnboardingStatus = await checkUserOnboardingStatus(
      req.nextauth.token.email
    );

    const currentPath = new URL(req.url).pathname;

    if (userOnboardingStatus === OnboardingStatus.APPROVED) {
      if (
        currentPath.startsWith('/onboarding') ||
        currentPath.startsWith('/auth')
      ) {
        return NextResponse.redirect(new URL('/app/dashboard', req.url));
      }
      return NextResponse.next();
    } else if (userOnboardingStatus === OnboardingStatus.PENDING) {
      if (currentPath.startsWith('/onboarding/profile')) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/onboarding/profile', req.url));
      }
    } else if (userOnboardingStatus === OnboardingStatus.IN_REVIEW) {
      if (currentPath.startsWith('/onboarding/review')) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/onboarding/review', req.url));
      }
    }
  }

  return NextResponse.redirect(new URL('/auth/signup', req.url));
});

export const config = {
  matcher: ['/app/:path*', '/onboarding/:path*'],
};
