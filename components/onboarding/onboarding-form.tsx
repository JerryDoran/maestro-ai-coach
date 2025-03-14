'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingFormSchema } from '@/lib/schemas';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

type OnboardingFormProps = {
  industries: {
    id: string;
    name: string;
    subIndustries: string[];
  }[];
};

export default function OnboardingForm({ industries }: OnboardingFormProps) {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(onboardingFormSchema as any),
    defaultValues: {
      industry: '',
      subIndustry: '',
      bio: '',
      experience: 0,
      skills: '',
    },
  });
  return (
    <div className='flex items-center justify-center bg-background'>
      <Card className='w-full max-w-lg mt-10 mx-2'>
        <CardHeader>
          <CardTitle className='text-4xl gradient-title'>
            Complete your profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}></Form>
        </CardContent>
      </Card>
    </div>
  );
}
