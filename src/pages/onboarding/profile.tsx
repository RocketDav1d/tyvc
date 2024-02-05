import { Metadata } from 'next';
import { useRouter } from 'next/router';

import { OnboardingProfileCard } from '@/components/onboading/profile-card';
import OnboardingLayout from '@/layouts/onboarding-layout';

export const metadata: Metadata = {
  title: 'Onboarding Profile',
  description: '',
};

export default function OnboardingProfilePage() {
  const router = useRouter();

  const onSubmit = (data: {
    role: string;
    firstName: string;
    lastName: string;
  }) => {
    console.log(data);
    // You can add form submission logic here
  };
  return (
    <OnboardingLayout>
      <OnboardingProfileCard onSubmit={onSubmit} />
    </OnboardingLayout>
  );
}
