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

interface FundHeaderProps {
  logoSrc: string;
  backgroundSrc: string;
  title: string;
  description: string;
  isVerified: boolean;
  socialLinks: { icon: JSX.Element; href: string }[];

  isFollowing: boolean;
  onFollowToggle: () => void;
  followLabel: string;
  unfollowLabel: string;
  onReview: () => void;
}

const FundHeader: React.FC<FundHeaderProps> = ({
  logoSrc,
  backgroundSrc,
  title,
  description,
  isVerified,
  socialLinks,

  isFollowing,
  onFollowToggle,
  followLabel,
  unfollowLabel,
  onReview,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow">
      <img
        src={backgroundSrc}
        alt={`${title} logo`}
        className="w-full h-40 object-cover"
      />
      <div className="flex justify-center items-start px-8 py-6 border-b border-gray-200">
        <img
          src={logoSrc}
          alt={`${title} logo`}
          className="w-36 h-36 p-8 -mt-12 object-scale-down bg-white rounded-lg shadow-md"
        />
        <div className="flex flex-grow flex-col justify-start items-start ml-4 space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-600">Venture Capital Fund</p>
          <div>{isVerified && <Badge variant="default">Verified</Badge>}</div>


        </div>
        <div className="flex">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="ml-2 text-gray-500 hover:text-gray-700"
              target="_blank"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-2">
        <div className="flex space-x-4">
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              href={`/app/funds/${router.query.fundId}/${tab.link}`}
              className={`underline ${tab.link && (router.asPath === `/app/funds/${router.query.fundId}/${tab.link}` ? 'text-blue-600' : 'text-gray-600')}`}
            >
              {tab.title}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4">
          <Follow
            isFollowing={isFollowing}
            onFollowToggle={onFollowToggle}
            followLabel={followLabel}
            unfollowLabel={unfollowLabel}
          />
          <AddReview onAddReviewToggle={onReview} reviewLabel="Review" />
        </div>
      </div>
    </div>
  );
};

export default FundHeader;
