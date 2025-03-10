import CTA from '@/components/features/cta';
import Faqs from '@/components/features/faq';
import FeaturesSection from '@/components/features/features-section';
import HeroSection from '@/components/features/hero-section';
import HowItWorks from '@/components/features/how-it-works';
import StatisticSection from '@/components/features/statistics-section';
import WhatUsersSay from '@/components/features/what-users-say';

export default function Home() {
  return (
    <div>
      <div className='grid-background' />
      <HeroSection />
      <FeaturesSection />
      <StatisticSection />
      <HowItWorks />
      <WhatUsersSay />
      <Faqs />
      <CTA />
    </div>
  );
}
