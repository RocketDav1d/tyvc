
import React from 'react';

import AddReview from '@/components/add-review';
import Follow from '@/components/follow';
import { Badge } from '@/components/ui/badge';

interface FundHeaderProps {
  logoSrc: string;
  title: string;
  description: string;
  isVerified: boolean;
  socialLinks: { icon: JSX.Element; href: string }[];
  tabs: { title: string; content: JSX.Element }[];
  isFollowing: boolean;
  onFollowToggle: () => void;
  followLabel: string;
  unfollowLabel: string;
  onReview: () => void;
}

const FundHeader: React.FC<FundHeaderProps> = ({
  logoSrc,
  title,
  description,
  isVerified,
  socialLinks,
  tabs,
  isFollowing,
  onFollowToggle,
  followLabel,
  unfollowLabel,
  onReview,
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <img src={logoSrc} alt={`${title} logo`} className="w-full h-40" />
      <div className="flex justify-center items-center px-8 py-2 border-b border-gray-200">
        <div className="w-32 h-32">
          <img
            src={logoSrc}
            alt={`${title} logo`}
            className="w-full h-full -mt-20 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-grow flex-col justify-start items-start ml-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-600">{description}</p>
          {isVerified && <Badge variant="default">Verified</Badge>}
        </div>
        <div className="flex">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-2">
        <Follow
          isFollowing={isFollowing}
          onFollowToggle={onFollowToggle}
          followLabel={followLabel}
          unfollowLabel={unfollowLabel}
        />
        <AddReview onAddReviewToggle={onReview} reviewLabel="Review" />
      </div>
    </div>
  );
};

export default FundHeader;
