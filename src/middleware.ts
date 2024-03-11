import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { checkUserOnboardingStatus } from '@/server/db/handlers/User';

export default withAuth(async function middleware(req) {
  if (req.nextauth.token?.email) {
    const isUserApproved = await checkUserOnboardingStatus(
      req.nextauth.token.email
    );
    const currentPath = new URL(req.url).pathname;
    if (isUserApproved) {
      if (currentPath === '/app/dashboard') {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/app/dashboard', req.url));
      }
    } else {
      if (currentPath.startsWith('/onboarding')) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/onboarding/profile', req.url));
      }
    }
  }

  return NextResponse.redirect(new URL('/auth/signup', req.url));
});

export const config = {
  matcher: ['/app/:path*', '/onboarding/:path*'],
};
