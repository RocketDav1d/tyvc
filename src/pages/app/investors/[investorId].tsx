import { Employee, Fund } from '@prisma/client';
import { GetServerSideProps, Metadata } from 'next';

import InvestorHeader from '@/components/investor_profile/investor-header';
import AppLayout from '@/layouts/app-layout';
import { Assets, PayloadAsset } from '@/utils/assets';
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

  logger.debug('Fetching data for investorId: ', investorId);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/investors/${investorId}`,
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

export default function InvestorPage({
  investor,
}: {
  investor: Employee & { funds: Fund[] };
}) {
  return (
    <AppLayout>
      <InvestorHeader
        logoSrc={PayloadAsset.fromFilename(
          investor?.profilePicture,
          Assets.FundLogoFallback
        )}
        backgroundSrc={PayloadAsset.fromFilename(
          investor?.funds[0].image,
          Assets.HeaderImageFallback
        )}
        name={`${investor?.firstName} ${investor?.lastName}`}
        bio={investor?.about ? investor.about : ''}
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
