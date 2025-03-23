import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}: any) {
  if (!result) return null;
  return (
    <div className='mx-auto'>
      <h1 className='flex items-center gap-2 text-3xl gradient-title'>
        <Trophy className='size-6 text-yellow-500' /> Quiz Results
      </h1>
      <CardContent>
        {/* Score Overview */}
        <div className='text-center spacy-y-2'>
          <h3 className='text-2xl font-bold'>{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className='w-full' />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className='p-4 bg-muted rounded-lg'>
            <p className='font-medium'>Improvement Tip:</p>
            <p className='text-muted-foreground'>{result.improvementTip}</p>
          </div>
        )}

        <div className='space-y-4'>
          <h3 className='font-medium'>Question Review</h3>
          {result.questions.map((question: any) => (
            <div
              key={question.question}
              className='space-y-2 border p-4 rounded-lg'
            >
              <div className='flex items-start justify-between gap-2'>
                <p className='font-medium'>{question.question}</p>
                {question.isCorrect ? (
                  <CheckCircle2 className='size-5 text-green-500 flex-shrink-0' />
                ) : (
                  <XCircle className='size-5 text-red-500 flex-shrink-0' />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
}
