import { GetServerSideProps, Metadata } from 'next';

import FundHeader from '@/components/funds/fund-header';
import { Icons } from '@/components/ui/icons';
import AppLayout from '@/layouts/app-layout';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Fund - Reviews',
  description: '',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fundId } = context.params as { fundId?: string };
  if (!fundId) {
    // Handle the case where fundId is not provided
    throw new Error('fundId is required');
  }

  logger.debug('Fetching data for fundId: ', fundId);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/funds/${fundId}/reviews`,
      {
        headers: {
          cookie: context.req.headers.cookie || '',
        },
      }
    );

    const json = await res.json();
    let reviews = json.data ? json.data : null;

    logger.debug('Fetched reviews data for fund: ', reviews);

    return {
      props: { reviews },
    };
  } catch (error) {
    logger.debug('Error fetching fund reviews data:', error);
    return {
      props: { reviews: null },
    };
  }
};

// Example data for Cherry Ventures
const mockFundData = {
  logoSrc: '/assets/cherry-header.png',
  title: 'Cherry Ventures',
  description:
    'Early-stage venture capital firm empowering exceptional founders.',
  isVerified: true,
  socialLinks: [
    { icon: <Icons.twitter />, href: 'https://twitter.com/cherryventures' },
    {
      icon: <Icons.twitter />,
      href: 'https://www.linkedin.com/company/cherryventures/',
    },
  ],
  tabs: [
    { title: 'Overview', content: <div>Overview Content</div> },
    // Mock portfolio companies data
    {
      title: 'Portfolio',
      content: (
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-center items-center bg-primary"
            >
              <img
                src={`/assets/company-logo-${index + 1}.png`}
                alt={`Company ${index + 1}`}
              />
            </div>
          ))}
        </div>
      ),
    },
    { title: 'Team', content: <div>Team Content</div> },
    // Mock reviews data
    {
      title: 'Reviews',
      content: (
        <div className="space-y-4">
          {[
            {
              id: 1,
              author: 'John Doe',
              rating: 5,
              comment: 'Excellent partnership and support.',
            },
            {
              id: 2,
              author: 'Jane Smith',
              rating: 4,
              comment: 'Great experience, but communication can improve.',
            },
          ].map((review) => (
            <div key={review.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h5 className="text-lg font-bold">{review.author}</h5>
                <span className="text-primary">{`Rating: ${review.rating}`}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      ),
    },
  ],
  isFollowing: false,
  onFollowToggle: () => console.log('Follow toggled'),
  followLabel: 'Follow',
  unfollowLabel: 'Unfollow',
  onReview: () => console.log('Review clicked'),
  investorData: {
    about:
      'Cherry Ventures is an early-stage venture capital firm that empowers exceptional founders. We focus on B2B and consumer technologies.',
    stages: ['Seed', 'Series A', 'Series B'],
    sectors: ['Technology', 'Healthcare', 'Financial Services'],
    ticketSizes: ['€200K - €500K', '€500K - €2M', '€2M+'],
  },
  generations: {
    2022: 543,
  },
};

export default function FundReviewsPage() {
  return (
    <AppLayout>
      <FundHeader
        backgroundSrc=""
        logoSrc={mockFundData.logoSrc}
        title={mockFundData.title}
        description={mockFundData.description}
        isVerified={mockFundData.isVerified}
        socialLinks={mockFundData.socialLinks}
        tabs={mockFundData.tabs}
        isFollowing={mockFundData.isFollowing}
        onFollowToggle={mockFundData.onFollowToggle}
        followLabel={mockFundData.followLabel}
        unfollowLabel={mockFundData.unfollowLabel}
        onReview={mockFundData.onReview}
      />
      <div className="w-full flex flex-col px-8 py-8 bg-gray-50">
        {mockFundData.tabs.find((tab) => tab.title === 'Reviews')?.content}
      </div>
    </AppLayout>
  );
}
