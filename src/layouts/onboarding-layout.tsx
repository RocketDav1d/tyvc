import React from 'react';

import { Inter } from 'next/font/google';

import { Assets } from '@/utils/assets';

type OnboardingLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

const inter = Inter({ subsets: ['latin'] });

const OnboardingLayout = ({
  children,
  title,
  description,
}: OnboardingLayoutProps) => {
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gray-100 sm:px-6 lg:px-8 dark:bg-gray-900 ${inter.className}`}
    >
      <div className="w-full space-y-8 max-w-2xl">
        <div>
          <img
            className="w-auto h-12 mx-auto"
            src={Assets.Logo}
            alt="Your Company Logo"
          />
          <h2 className="mt-6 text-4xl font-extrabold text-center text-gray-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;
