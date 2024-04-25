import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/app/dashboard"
        className={`text-sm font-medium transition-colors ${router.pathname === '/app/dashboard' ? 'text-primary' : 'hover:text-primary'}`}
      >
        Dashboard
      </Link>
      {/* <Link
        href="/app/reviews"
        className={`text-sm font-medium transition-colors ${router.pathname === '/app/reviews' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
      >
        Reviews
      </Link> */}
      <Link
        href="/app/search/investors"
        className={`text-sm font-medium transition-colors ${router.pathname === '/app/search/investors' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
      >
        Investor Search
      </Link>
      <Link
        href="/app/knowledge-base"
        className={`text-sm font-medium transition-colors ${router.pathname === '/app/knowledge-base' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
      >
        Knowledge Base
      </Link>
    </nav>
  );
}
