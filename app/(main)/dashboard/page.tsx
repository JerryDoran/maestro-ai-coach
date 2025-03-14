import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

export default async function IndustryInsights() {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect('/onboarding');
  }
  return <div>IndustryInsights</div>;
}
