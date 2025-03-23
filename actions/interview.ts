'use server';

import db from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

export async function generateQuiz() {
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
    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(', ')}` : ''
    }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedUpText = text.replace(/```(?:json)?\n?/g, '').trim();

    const quiz = JSON.parse(cleanedUpText);

    return quiz.questions;
  } catch (error) {
    console.error('Generate quiz error:', error);
    throw new Error('Failed to generate quiz questions');
  }
}

export async function saveQuizResult(
  questions: any,
  answers: any,
  score: number
) {
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

  const questionResults = questions.map((q: any, index: number) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter(
    (question: any) => !question.isCorrect
  );
  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongAnswerText = wrongAnswers
      .map(
        (question: any) =>
          `Question: "${question.question}"\nCorrect Answer: "${question.answer}"\nYour Answer: "${question.userAnswer}"`
      )
      .join('\n\n');

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:
      ${wrongAnswerText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by the wrong answers.
      Keep the response under 2 sentances and make it encouraging.
      Don't explicitly mention the wrong answers, focus on what to learn/practice.
      `;

    try {
      const result = await model.generateContent(improvementPrompt);
      const response = result.response;
      improvementTip = response.text().trim();
    } catch (error) {
      console.error('Generate improvement tip error:', error);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: 'Technical',
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error('Save quiz result error:', error);
    throw new Error('Failed to save quiz result');
  }
}
