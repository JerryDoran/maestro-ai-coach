'use server';

import db from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

type User = {
  bio?: string;
  experience?: Number;
  skills: string[];
  industry?: string;
};

export async function updateUser(data: User) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  try {
    // check if the industry exists
    const result = await db.$transaction(
      async (transaction) => {
        let industryInsight = await transaction.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        if (!industryInsight) {
          industryInsight = await transaction.industryInsight.create({
            data: {
              industry: data.industry as string,
              salaryRanges: [],
              growthRate: 0,
              demandLevel: 'MEDIUM',
              topSkills: [],
              marketOutlook: 'NEUTRAL',
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            },
          });
        }

        const updatedUser = await transaction.user.update({
          where: {
            id: user.id,
          },
          data: {
            bio: data.bio,
            experience: data.experience as number,
            skills: data.skills,
            industry: data.industry,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );

    return result.updatedUser;
  } catch (error: any) {
    console.error('Error updating user and industry:', error.message);
    throw new Error('Failed to update profile');
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error('Error getting user onboarding status:', error);
    throw new Error('Failed to get user onboarding status');
  }
}
