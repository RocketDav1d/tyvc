import React from 'react';

import AddReview from '@/components/add-review';
import Follow from '@/components/follow';
import { Badge } from '@/components/ui/badge';

interface InvestorHeaderProps {
  logoSrc: string;
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
  return (
    <div className="bg-white rounded-lg shadow">
      <img src={logoSrc} alt={`${name} logo`} className="w-full h-40" />
      <div className="flex justify-center items-center px-8 py-2 border-b border-gray-200">
        <div className="w-32 h-32">
          <img
            src={logoSrc}
            alt={`${name} logo`}
            className="w-full h-full -mt-20 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-grow flex-col justify-start items-start ml-4">
          <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
          <p className="text-sm text-gray-600">{bio}</p>
          {isVerified && <Badge variant="default">Verified</Badge>}
        </div>
        <div className="flex">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-2">
        <Follow
          isFollowing={isFollowed}
          onFollowToggle={onFollowChange}
          followLabel={followText}
          unfollowLabel={unfollowText}
        />

        <AddReview onAddReviewToggle={onSendReview} reviewLabel="Review" />
      </div>
    </div>
  );
};

export default InvestorHeader;
