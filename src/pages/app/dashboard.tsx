import { Review } from '@prisma/client';
import { Metadata } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import AddReview from '@/components/add-review';
import Gamification from '@/components/dashboard/gamification';
import ReviewSmall from '@/components/dashboard/review-small';
import { Button } from '@/components/ui/button';
import useUserDetails from '@/hooks/use-user-details';
import AppLayout from '@/layouts/app-layout';
import { logger } from '@/utils/logger';


export const metadata: Metadata = {
  title: 'Dashboard',
  description: '',
};

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
      <div className="container flex flex-col justify-center px-8 py-8 mx-auto xl:py-12">
        <div className="flex flex-col space-y-6 text-left xl:space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back {userFirstName}!
          </h1>

          <h2 className="text-xl font-semibold xl:text-2xl">Overview</h2>
          <div className="flex justify-between mt-8 space-x-4">
            <Gamification
              total={100}
              current={25}
              label="Helpfulness"
              subLabel="Founders found the review helpful"
              achievement="/500 you will recieve a"
              imageSrc="/assets/dashboard/grow-help.svg"
            />

            <Gamification
              total={100}
              current={25}
              label="Reviews"
              subLabel="Reviews you submitted"
              achievement="| 1 Review is still in verification process "
              imageSrc="/assets/dashboard/review.svg"
            />

            <Gamification
              total={100}
              current={25}
              label="Invitations"
              subLabel="Invite other Founders for faster access"
              achievement="/5 Invitations are left"
              imageSrc="/assets/dashboard/invitation.svg"
            />
          </div>
          <div className="flex justify-between mt-8 space-x-4">
            <div className="w-1/2 space-y-6">
              <h2 className="text-xl font-semibold xl:text-2xl">
                New Reviews about VCs you monitor
              </h2>
              <div className="flex flex-col space-y-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewSmall
                      id={review.id}
                      key={review.id}
                      avatar={''}
                      name={review.title}
                      rating={4}
                      recommendations={10}
                      verified={true}
                      headline={'Innovative and supportive'}
                      text={
                        'Their hands-on approach and industry insights have significantly propelled our growth.'
                      }
                      date={new Date().toISOString()}
                      investmentRaised={true}
                    />
                  ))
                ) : (
                  <Link href="/app/search/investors">
                    <Button>Fülle deine Watchlist</Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="w-1/2 space-y-6">
              <h2 className="text-xl font-semibold xl:text-2xl">
                Deine Aktivitäten
              </h2>
              <div className="flex flex-col space-y-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewSmall
                      id={review.id}
                      key={review.id}
                      avatar={''}
                      name={review.title}
                      rating={4}
                      recommendations={10}
                      verified={true}
                      headline={'Innovative and supportive'}
                      text={
                        'Their hands-on approach and industry insights have significantly propelled our growth.'
                      }
                      date={new Date().toISOString()}
                      investmentRaised={true}
                    />
                  ))
                ) : (
                  <Link href="/app/search/investors">
                    <AddReview
                      onAddReviewToggle={() => {}}
                      reviewLabel="Review verfassen"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
