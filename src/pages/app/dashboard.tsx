import { Review } from '@prisma/client';
import { Metadata } from 'next';
import { GetServerSideProps } from 'next';

import ReviewSmall from '@/components/dashboard/review-small';
import useUserDetails from '@/hooks/use-user-details';
import AppLayout from '@/layouts/app-layout';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '',
};

// Sample data for demonstration
const mockReviews = [
  {
    id: '1',
    title: 'Cherry Ventures',
    logoUrl: '/assets/Cherry.png',
    review: 'Zero support in finding employees. Cherry straight up cappin.',
    date: 'November 2023',
  },
  {
    id: '2',
    title: 'HV Capital',
    logoUrl: '/assets/HV.jpeg',
    review:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    date: 'November 2023',
  },
];

interface DashboardPageProps {
  reviews: Review[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/reviews`, {
      headers: {
        cookie: context.req.headers.cookie || '',
      },
    });

    const json = await res.json();
    let reviews = json.data ? json.data : null;

    logger.debug('Fetched reviews:', reviews);

    return {
      props: { reviews },
    };
  } catch (error) {
    logger.debug('Error fetching fund data:', error);
    return {
      props: { reviews: null },
    };
  }
};

export default function DashboardPage({ reviews }: DashboardPageProps) {
  const { userDetails } = useUserDetails();

  const userFirstName =
    userDetails && userDetails.onboardingData
      ? userDetails.onboardingData['firstName']
      : 'User';

  return (
    <AppLayout>
      <div className="w-full flex flex-col justify-center px-8 mx-auto space-y-6">
        <div className="flex flex-col py-8 space-y-2 text-left">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome {userFirstName}!
          </h1>
          <div className="flex justify-between mt-8 space-x-4">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">Watchlist</h2>
              <div className="flex flex-col space-y-4">
                {mockReviews.map((review) => (
                  <ReviewSmall
                    id={review.id}
                    key={review.id}
                    avatar={review.logoUrl}
                    name={review.title}
                    rating={4}
                    recommendations={10}
                    verified={true}
                    headline={'Innovative and supportive'}
                    text={
                      'Their hands-on approach and industry insights have significantly propelled our growth.'
                    }
                    date={review.date}
                    investmentRaised={true}
                  />
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">Your Reviews</h2>
              <div className="flex flex-col space-y-4">
                {mockReviews.map((review) => (
                  <ReviewSmall
                    id={review.id}
                    key={review.id}
                    avatar={review.logoUrl}
                    name={review.title}
                    rating={4}
                    recommendations={10}
                    verified={true}
                    headline={'Innovative and supportive'}
                    text={
                      'Their hands-on approach and industry insights have significantly propelled our growth.'
                    }
                    date={review.date}
                    investmentRaised={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
