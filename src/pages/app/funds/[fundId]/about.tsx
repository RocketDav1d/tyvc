import { Fund } from '@prisma/client';
import { GetServerSideProps, Metadata } from 'next';

import FundHeader from '@/components/funds/fund-header';
import About from '@/components/investor_profile/about';
import { Icons } from '@/components/ui/icons';
import AppLayout from '@/layouts/app-layout';
import { Assets, PayloadAsset } from '@/utils/assets';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Fund - About',
  description: '',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fundId } = context.params as { fundId?: string };
  if (!fundId) {
    // Handle the case where fundId is not provided
    throw new Error('fundId is required');
  }

  logger.info('Fetching data for fundId: ', fundId);

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

    logger.info('Fetched fund data: ', fund);

    return {
      props: { fund },
    };
  } catch (error) {
    logger.info('Error fetching fund data:', error);
    return {
      props: { fund: null },
    };
  }
};

export default function FundAboutPage({ fund }: { fund: Fund }) {
  if (!fund) {
    return <div>Not found</div>;
  }

  return (
    <AppLayout>
      <FundHeader
        logoSrc={PayloadAsset.fromFilename(fund.logo)}
        backgroundSrc={PayloadAsset.fromFilename(
          fund.image,
          Assets.HeaderImageFallback
        )}
        title={fund.name}
        description={fund.description ? fund.description : ''}
        isVerified={true}
        socialLinks={[
          ...(fund.linkedIn
            ? [{ icon: <Icons.linkedin />, href: fund.linkedIn }]
            : []),
          ...(fund.twitter
            ? [{ icon: <Icons.twitter />, href: fund.twitter }]
            : []),
          ...(fund.medium
            ? [{ icon: <Icons.medium />, href: fund.medium }]
            : []),
          ...(fund.youTube
            ? [{ icon: <Icons.youtube />, href: fund.youTube }]
            : []),
          ...(fund.instagram
            ? [{ icon: <Icons.instagram />, href: fund.instagram }]
            : []),
        ]}
        isFollowing={true}
        onFollowToggle={() => {}}
        followLabel="Follow"
        unfollowLabel="Unfollow"
        onReview={() => {}}
      />
      <div className="w-full h-screen flex flex-col px-8 py-8">
        <div className="container grid grid-cols-2 grid-rows-1 gap-4">
          <About
            investorData={{
              about: fund.about ? fund.about : '',
              stages: fund.stages,
              sectors: fund.sector,
              ticketSizes: [fund.ticketSize ? fund.ticketSize : ''],
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
}
