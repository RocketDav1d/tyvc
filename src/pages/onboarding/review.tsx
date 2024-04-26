import { Metadata } from 'next';


import OnboardingLayout from '@/layouts/onboarding-layout';

export const metadata: Metadata = {
  title: 'Application under Review',
  description:
    'Thank you for applying. We are currently reviewing your application.',
};

export default function OnboardingReviewPage() {
  return (
    <OnboardingLayout
      title={'Application under Review'}
      description={
        'Thank you for applying. We are currently reviewing your application.'
      }
    >
      <></>
      {/* <WaitlistWidget /> */}
    </OnboardingLayout>
  );
}
