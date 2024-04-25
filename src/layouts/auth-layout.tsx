import React from 'react';

import { Inter } from 'next/font/google';

import { Assets } from '@/utils/assets';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={`w-full h-screen ${inter.className}`}>
      <div className="relative container h-full flex-col justify-center items-center md:grid lg:grid-cols-2 lg:px-0 lg:max-w-none">
        <div className="relative h-full hidden flex-col p-10 text-white bg-gray-200 lg:flex dark:bg-none dark:border-r">
          <div className="relative flex justify-start items-center space-x-5 text-lg font-medium">
            <img
              className="w-auto h-10"
              src={Assets.LogoWithText}
              alt="TYVC Logo"
            />
          </div>
          <div className="z-20 relative mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-black dark:text-white">
                &ldquo;Hunderte Gründer recherchieren für Ihr Fundraising auf
                TrustYourVC. Werde einer von Ihnen.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
