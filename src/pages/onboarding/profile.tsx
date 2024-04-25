import { Metadata } from 'next';
import { useRouter } from 'next/router';

import { OnboardingProfileForm } from '@/components/onboarding/profile-form';
import { useOnboardingProfile } from '@/hooks/use-onboarding-profile';
import OnboardingLayout from '@/layouts/onboarding-layout';
import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Onboarding Profile',
  description: '',
};

export default function OnboardingProfilePage() {
  const router = useRouter();
  const { submitOnboardingProfile } = useOnboardingProfile();

  const onSubmit = async (selectedRole: string, data: any) => {
    logger.debug('Submitting onboarding profile:', selectedRole, data);

    try {
      await submitOnboardingProfile(selectedRole, data);
      router.push('/onboarding/review');
    } catch (error) {
      logger.error('Error submitting onboarding profile:', error);
    }
  };

  return (
    <OnboardingLayout
      title={'Welcome to TYVC'}
      description={'Follow the steps below to complete your profile setup.'}
    >
      <OnboardingProfileForm onSubmit={onSubmit} />
    </OnboardingLayout>
  );
}
