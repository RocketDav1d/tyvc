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
        className={`flex items-center text-sm font-medium transition-colors ${router.pathname === '/app/dashboard' ? 'text-tyvc-green' : 'hover:text-tyvc-green'}`}
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h7v7H3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 3h7v7h-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 14h7v7h-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 14h7v7H3z"
          />
        </svg>
        <span>Dashboard</span>
      </Link>

      <Link
        href="/app/search/investors"
        className={`flex items-center text-sm font-medium transition-colors ${router.pathname === '/app/investors/search' ? 'text-tyvc-green' : 'hover:text-tyvc-green'}`}
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Investor Search</span>
      </Link>

      {/* <Link
        href="/app/knowledge-base"
        className={`flex items-center text-sm font-medium transition-colors ${router.pathname === '/app/knowledge-base' ? 'text-tyvc-green' : 'hover:text-tyvc-green'}`}
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v8m4-4H8"
          />
        </svg>
        <span>Knowledge Base</span>
      </Link> */}
    </nav>
  );
}
