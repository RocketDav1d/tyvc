import { Fund } from '@prisma/client';
import { GetServerSideProps, Metadata } from 'next';

import FundHeader from '@/components/funds/fund-header';
import { Icons } from '@/components/ui/icons';
import AppLayout from '@/layouts/app-layout';
import { Assets, PayloadAsset } from '@/utils/assets';
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

export default function FundReviewsPage({ fund }: { fund: Fund }) {
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
      <div className="w-full h-screen flex flex-col px-8 py-8 bg-gray-50">




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

      </div>
    </AppLayout>
  );
}
