'use client';

import { useEffect, useState } from 'react';
import { generateQuiz, saveQuizResult } from '@/actions/interview';
import useFetch from '@/hooks/use-fetch';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarLoader } from 'react-spinners';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import QuizResult from '@/components/quiz-result';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  function startNewQuiz() {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  }

  if (generatingQuiz) {
    return <BarLoader className='mt-4' width='100%' color='gray' />;
  }

  // show results if quiz is finished
  if (resultData) {
    return (
      <div className='mx-2'>
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className='mx-2'>
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn}>Start Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  function handleAnswer(answer: any) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  }

  function handleNextQuestion() {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  }

  function calculateScore() {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });

    return (correct / quizData.length) * 100;
  }

  async function finishQuiz() {
    const score = calculateScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success('Quiz completed!');
    } catch (error: any) {
      toast.error(error.message || 'Error saving quiz result');
    }
  }
  const question = quizData[currentQuestion];

  return (
    <Card className='mx-2'>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-lg font-medium'>{question.question}</p>
        <RadioGroup
          className='space-y-2'
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
        >
          {question.options.map((option: any, index: number) => (
            <div key={index} className='flex items-center space-x-2'>
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        {showExplanation && (
          <div className='mt-4 p-4 bg-muted rounded-lg'>
            <p className='font-medium mb-2'>Explanation:</p>
            <p className='text-muted-foreground'>{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant='outline'
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNextQuestion}
          className='ml-auto'
          disabled={!answers[currentQuestion] || savingResult}
        >
          {savingResult && <Loader2 className='mr-2 size-4 animate-spin' />}
          {currentQuestion < quizData.length - 1
            ? 'Next Question'
            : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
}
