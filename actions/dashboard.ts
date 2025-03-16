'use server';

import db from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DemandLevel } from '@prisma/client';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

// interface IndustryInsights {
//   salaryRanges: any[];
//   growthRate: number;
//   demandLevel: string;
//   topSkills: string[];
//   marketOutlook: string;
//   keyTrends: string[];
//   recommendedSkills: string[];
// }

export async function generateAIInsights(industry: string) {
  const prompt = `
  Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
  {
    "salaryRanges": [
      { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
    ],
    "growthRate": number,
    "demandLevel": "High" | "Medium" | "Low",
    "topSkills": ["skill1", "skill2"],
    "marketOutlook": "Positive" | "Neutral" | "Negative",
    "keyTrends": ["trend1", "trend2"],
    "recommendedSkills": ["skill1", "skill2"]
  }
  
  IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
  Include at least 5 common roles for salary ranges.
  Growth rate should be a percentage.
  Include at least 5 skills and trends.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const cleanedUpText = text.replace(/```(?:json)?\n?/g, '').trim();

  return JSON.parse(cleanedUpText);
}

export async function getIndustryInsights() {
  // check if user is logged in
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      industryInsight: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry as string);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry as string,
        growthRate: insights.growthRate,
        demandLevel: insights.demandLevel as DemandLevel,
        marketOutlook: 'NEUTRAL',
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return industryInsight;
  }

  return user.industryInsight;
}
