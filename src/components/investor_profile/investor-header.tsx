import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import AddReview from '@/components/add-review';
import Follow from '@/components/follow';
import { Badge } from '@/components/ui/badge';

const TABS = [
  { id: 'overview', title: 'Overview', link: '' },
  { id: 'reviews', title: 'Reviews', link: 'reviews' },
  { id: 'about', title: 'About', link: 'about' },
];

interface InvestorHeaderProps {
  logoSrc: string;
  backgroundSrc: string;
  name: string;
  bio: string;
  isVerified: boolean;
  socialLinks: { icon: JSX.Element; url: string }[];
  isFollowed: boolean;
  onFollowChange: () => void;
  followText: string;
  unfollowText: string;
  onSendReview: () => void;
}

const InvestorHeader: React.FC<InvestorHeaderProps> = ({
  logoSrc,
  backgroundSrc,
  name,
  bio,
  isVerified,
  socialLinks,
  isFollowed,
  onFollowChange,
  followText,
  unfollowText,
  onSendReview,
}) => {
  const router = useRouter();

  return (
    <div>
      <img
        src={backgroundSrc}
        alt={`${name} logo`}
        className="w-full h-40 object-cover"
      />
      <div className="flex justify-center items-start px-8 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container flex mx-auto">
          <img
            src={logoSrc}
            alt={`${name} image`}
            className="w-40 h-40 block -mt-12 object-contain rounded-md shadow-md dark:bg-gray-200"
          />

          <div className="flex flex-grow flex-col justify-start items-start ml-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {name}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-200">{bio}</p>
            <div>{isVerified && <Badge variant="default">Verified</Badge>}</div>
          </div>
          <div className="flex">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-200"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-8 border-b dark:border-gray-700">
        <div className="container flex justify-between mx-auto">
          <div className="flex space-x-4">
            {TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/app/funds/${router.query.fundId}/${tab.link}`}
                className={`px-4 py-2 underline rounded-md ${tab.link && (router.asPath === `/app/funds/${router.query.fundId}/${tab.link}` ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800')}`}
              >
                {tab.title}
              </Link>
            ))}
          </div>
          <div className="flex space-x-4">
            <Follow
              isFollowing={isFollowed}
              onFollowToggle={onFollowChange}
              followLabel={followText}
              unfollowLabel={unfollowText}
            />
            <AddReview onAddReviewToggle={onSendReview} reviewLabel="Review" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorHeader;
