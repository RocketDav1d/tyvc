import React from 'react';

import { Inter } from 'next/font/google';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { MainNav } from '@/components/dashboard/main-nav';
import { Search } from '@/components/dashboard/search';
import TeamSwitcher from '@/components/dashboard/team-switcher';
import { UserNav } from '@/components/dashboard/user-nav';

type AppLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={`dashboard-layout ${inter.className}`}>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="h-16 flex items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="flex items-center ml-auto space-x-4">
              <Search />
              <UserNav onSignout={signOut} />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
