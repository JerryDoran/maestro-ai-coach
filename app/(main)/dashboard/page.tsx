import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import DashboardView from '@/components/dashboard/dashboard-view';
import { redirect } from 'next/navigation';

export default async function IndustryInsights() {
  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();

  if (!isOnboarded) {
    redirect('/onboarding');
  }
  return (
    <div className='constainer mx-auto'>
      <DashboardView insights={insights} />
    </div>
  );
}
