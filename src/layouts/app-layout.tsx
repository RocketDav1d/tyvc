import React from 'react';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { MainNav } from '@/components/dashboard/main-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import PageHead from '@/components/page-head';
import { Assets } from '@/utils/assets';

type AppLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <PageHead title="Home" />
      <div className={`dashboard-layout ${inter.className}`}>
        <div className="flex flex-col">
          <div className="border-b">
            <div className="h-16 flex items-center px-4">
              <Link href="/app/dashboard">
                <img
                  src={Assets.LogoWithText}
                  alt="Logo"
                  width={120}
                  height={'auto'}
                />
              </Link>
              {/* <TeamSwitcher /> */}
              <MainNav className="mx-6" />
              <div className="flex items-center ml-auto space-x-4">
                {/* <Search /> */}
                <UserNav onSignout={signOut} />
              </div>
            </div>
          </div>
          {children}
        </div>

      </div>
    </>
  );
};

export default AppLayout;
