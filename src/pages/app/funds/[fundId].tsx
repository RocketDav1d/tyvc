import { Fund } from '@prisma/client';
import { Metadata } from 'next';
import { GetServerSideProps } from 'next';

import FundHeader from '@/components/funds/fund-header';
import About from '@/components/investor-profile/about';

import { Icons } from '@/components/ui/icons';
import AppLayout from '@/layouts/app-layout';
import { PayloadAsset } from '@/utils/assets';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Fund',
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
      `${process.env.NEXT_PUBLIC_API_URL}/funds/${fundId}`,
      {
        headers: {
          cookie: context.req.headers.cookie || '',
        },
      }
    );

    const json = await res.json();
    let fund = json.data ? json.data : null;

    logger.debug('Fetched fund data: ', fund);

    return {
      props: { fund },
    };
  } catch (error) {
    logger.debug('Error fetching fund data:', error);
    return {
      props: { fund: null },
    };
  }
};

export default function FundPage({ fund }: { fund: Fund }) {
  if (!fund) {
    return <div>Not found</div>;
  }

  return (
    <AppLayout>
      <FundHeader
        logoSrc={new PayloadAsset(fund.logo).url}
        backgroundSrc={new PayloadAsset(fund.logo).url}
        title={fund.name}
        description={fund.description ? fund.description : ''}
        isVerified={true}
        socialLinks={[
          { icon: <Icons.twitter />, href: fund.linkedIn ? fund.linkedIn : '' },
          { icon: <Icons.twitter />, href: fund.twitter ? fund.twitter : '' },
          { icon: <Icons.twitter />, href: fund.medium ? fund.medium : '' },
          { icon: <Icons.twitter />, href: fund.youTube ? fund.youTube : '' },
          {
            icon: <Icons.twitter />,
            href: fund.instagram ? fund.instagram : '',
          },
        ]}
        tabs={[
          { title: 'Overview', content: <div>Overview Content</div> },
          { title: 'Portfolio', content: <div>Portfolio Content</div> },
          { title: 'Team', content: <div>Team Content</div> },
        ]}
        isFollowing={true}
        onFollowToggle={() => {}}
        followLabel="Follow"
        unfollowLabel="Unfollow"
        onReview={() => {}}
      />
      <div className="w-full flex flex-col px-8 py-8 bg-gray-50">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <About
            investorData={{
              about: fund.about ? fund.about : '',
              stages: fund.stages,
              sectors: fund.sector,
              ticketSizes: [fund.ticketSize ? fund.ticketSize : ''],
            }}
          />

          {/* <FundGenerations fundGenerations={[]} /> */}
        </div>
      </div>
    </AppLayout>
  );
}
