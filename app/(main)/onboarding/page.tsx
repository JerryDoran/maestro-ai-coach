import OnboardingForm from '@/components/onboarding/onboarding-form';
import { industries } from '@/data/industries';

export default function OnboardingPage() {
  // check if user has completed onboarding

  return (
    <div>
      <OnboardingForm industries={industries} />
    </div>
  );
}
