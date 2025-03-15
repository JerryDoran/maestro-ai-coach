'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingFormSchema } from '@/lib/schemas';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type OnboardingFormProps = {
  industries: {
    id: string;
    name: string;
    subIndustries: string[];
  }[];
};

export default function OnboardingForm({ industries }: OnboardingFormProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<{
    id: string;
    name: string;
    subIndustries: string[];
  } | null>(null);
  const router = useRouter();

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingFormSchema as any),
  });

  const watchIndustry = watch('industry');

  async function onSubmit(values: FieldValues) {
    const { industry, subIndustry, bio, experience, skills } = values as {
      industry: string;
      subIndustry: string;
      bio: string;
      experience: number;
      skills: string;
    };
    try {
      const formattedIndustry = `${industry}-${subIndustry
        .toLowerCase()
        .replace(/ /g, '-')}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error('Onboarding error:', error);
    }
  }

  useEffect(() => {
    if (updateResult && !updateLoading) {
      toast.success('Profile updated successfully');
      router.push('/dashboard');
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateResult, updateLoading]);

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
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'>
              <Label htmlFor='industry'>Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue('industry', value);
                  const selectedIndustry = industries.find(
                    (industry) => industry.id === value
                  );
                  setSelectedIndustry(selectedIndustry ?? null);
                  setValue('subIndustry', '');
                }}
              >
                <SelectTrigger id='industry'>
                  <SelectValue placeholder='Select industry' />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className='text-xs text-red-500'>
                  {errors.industry.message?.toString()}
                </p>
              )}
            </div>
            {watchIndustry && (
              <div className='space-y-2'>
                <Label htmlFor='subIndustry'>Specialization</Label>
                <Select
                  onValueChange={(value) => setValue('subIndustry', value)}
                >
                  <SelectTrigger id='subIndustry'>
                    <SelectValue placeholder='Select specialization' />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className='text-xs text-red-500'>
                    {errors.subIndustry.message?.toString()}
                  </p>
                )}
              </div>
            )}
            <div className='space-y-2'>
              <Label htmlFor='experience'>Years of experience</Label>
              <Input
                id='experience'
                type='number'
                min='0'
                max='50'
                placeholder='Enter years of experience'
                {...register('experience')}
              />
              {errors.experience && (
                <p className='text-xs text-red-500'>
                  {errors.experience.message?.toString()}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='skills'>Skills</Label>
              <Input
                id='skills'
                placeholder='e.g., JavaScript, React, Node.js'
                {...register('skills')}
              />
              <p className='text-sm text-muted-foreground'>
                Enter up to 5 skills separated by commas
              </p>
              {errors.skills && (
                <p className='text-xs text-red-500'>
                  {errors.skills.message?.toString()}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                placeholder='Tell us about your professional background'
                rows={5}
                {...register('bio')}
              />
              {errors.bio && (
                <p className='text-xs text-red-500'>
                  {errors.bio?.message?.toString()}
                </p>
              )}
            </div>
            <Button type='submit' className='w-full' disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...
                </>
              ) : (
                'Complete profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
