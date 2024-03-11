import { Metadata } from 'next';

import WaitlistWidget from '@/components/waitlist-widget';
import OnboardingLayout from '@/layouts/onboarding-layout';

export const metadata: Metadata = {
  title: 'Application Under Review',
  description:
    'Thank you for applying. We are currently reviewing your application.',
};

export default function OnboardingReviewPage() {
  return (
    <OnboardingLayout
      title={'Application Under Review'}
      description={
        'Thank you for applying. We are currently reviewing your application.'
      }
    >
      <WaitlistWidget />
    </OnboardingLayout>
  );
}
