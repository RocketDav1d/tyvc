import React from 'react';

import { Inter } from 'next/font/google';

import { Assets } from '@/utils/assets';

type OnboardingLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 dark:bg-gray-900 ${inter.className}`}
    >
      <div className="w-full space-y-8 max-w-md">
        <div>
          <img
            className="w-auto h-12 mx-auto"
            src={Assets.Logo}
            alt="Your Company Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            Welcome to TYVC
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
            Please follow the steps to set up your account
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;
