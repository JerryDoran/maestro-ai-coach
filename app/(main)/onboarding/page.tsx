import { getUserOnboardingStatus } from '@/actions/user';
import OnboardingForm from '@/components/onboarding/onboarding-form';
import { industries } from '@/data/industries';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  // check if user has completed onboarding
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect('/dashboard');
  }

  return (
    <div>
      <OnboardingForm industries={industries} />
    </div>
  );
}
