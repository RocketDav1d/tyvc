import { BusinessAngel } from '@prisma/client';
import { GetServerSideProps, Metadata } from 'next';

import InvestorHeader from '@/components/investor_profile/investor-header';
import AppLayout from '@/layouts/app-layout';
import { Assets, PayloadAsset } from '@/utils/assets';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Angel Details',
  description: '',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { angelId } = context.params as { angelId?: string };
  if (!angelId) {
    // Handle the case where fundId is not provided
    throw new Error('angelId is required');
  }

  logger.debug('Fetching data for angelId: ', angelId);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/angels/${angelId}`,
      {
        headers: {
          cookie: context.req.headers.cookie || '',
        },
      }
    );

    const json = await res.json();
    let angel = json.data ? json.data : null;

    logger.debug('Fetched angel data: ', angel);

    return {
      props: { angel },
    };
  } catch (error) {
    logger.debug('Error fetching angel data:', error);
    return {
      props: { angel: null },
    };
  }
};

export default function AngelPage({ angel }: { angel: BusinessAngel }) {
  return (
    <AppLayout>
      <InvestorHeader
        logoSrc={PayloadAsset.fromFilename(
          angel.profilePicture,
          Assets.FundLogoFallback
        )}
        backgroundSrc={Assets.HeaderImageFallback}
        name={`${angel?.name}`}
        bio={angel?.about ? angel.about : ''}
        isVerified={true}
        socialLinks={[]}
        isFollowed={true}
        onFollowChange={() => {}}
        followText="Follow"
        unfollowText="Unfollow"
        onSendReview={() => {}}
      />
      <div className="container flex flex-col px-8 py-8">
        {/* <About investorData={mockInvestorData.profileDetails} /> */}
      </div>
    </AppLayout>
  );
}
