import { GetServerSideProps, Metadata } from 'next';

import InvestorHeader from '@/components/investor_profile/investor-header';
import { Icons } from '@/components/ui/icons';
import AppLayout from '@/layouts/app-layout';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Investor',
  description: '',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { investorId } = context.params as { investorId?: string };
  if (!investorId) {
    // Handle the case where fundId is not provided
    throw new Error('investorId is required');
  }

  logger.debug('Fetching data for fundId: ', investorId);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employees/${investorId}`,
      {
        headers: {
          cookie: context.req.headers.cookie || '',
        },
      }
    );

    const json = await res.json();
    let investor = json.data ? json.data : null;

    logger.debug('Fetched investor data: ', investor);

    return {
      props: { investor },
    };
  } catch (error) {
    logger.debug('Error fetching investor data:', error);
    return {
      props: { investor: null },
    };
  }
};

// Example data for Cherry Ventures
const mockInvestorData = {
  logoSrc: '/assets/cherry-header.png',
  name: 'Cherry Ventures',
  bio: 'Early-stage venture capital firm empowering exceptional founders.',
  isVerified: true,
  socialLinks: [
    { icon: <Icons.twitter />, url: 'https://twitter.com/cherryventors' },
    {
      icon: <Icons.twitter />,
      url: 'https://www.linkedin.com/company/cherryventures/',
    },
  ],
  sections: [
    { title: 'Overview', content: <div>Overview Content</div> },
    { title: 'Investments', content: <div>Investments Content</div> },
    { title: 'Team', content: <div>Team Content</div> },
  ],
  isFollowed: false,
  onFollowChange: () => console.log('Follow status changed'),
  followText: 'Follow',
  unfollowText: 'Unfollow',
  onSendReview: () => console.log('Send review clicked'),
  profileDetails: {
    about:
      'Cherry Ventures is an early-stage venture capital firm that empowers exceptional founders. We focus on B2B and consumer technologies.',
    investmentStages: ['Seed', 'Series A', 'Series B'],
    investmentSectors: ['Technology', 'Healthcare', 'Financial Services'],
    investmentSizes: ['€200K - €500K', '€500K - €2M', '€2M+'],
  },
  fundPerformance: {
    2022: 543,
  },
};

export default function InvestorPage() {
  return (
    <AppLayout>
      <InvestorHeader
        logoSrc={mockInvestorData.logoSrc}
        name={mockInvestorData.name}
        bio={mockInvestorData.bio}
        isVerified={mockInvestorData.isVerified}
        socialLinks={mockInvestorData.socialLinks}
        isFollowed={mockInvestorData.isFollowed}
        onFollowChange={mockInvestorData.onFollowChange}
        followText={mockInvestorData.followText}
        unfollowText={mockInvestorData.unfollowText}
        onSendReview={mockInvestorData.onSendReview}
      />
      <div className="w-full flex flex-col px-8 py-8 bg-gray-50">
        {/* <About investorData={mockInvestorData.profileDetails} /> */}
      </div>
    </AppLayout>
  );
}
