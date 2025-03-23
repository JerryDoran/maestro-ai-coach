import Quiz from '@/components/quiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MockInterviewPage() {
  return (
    <div className='container mx-auto space-y-4 py-6'>
      <div className='flex flex-col space-y-2 mx-2'>
        <Link href='/interview-prep'>
          <Button variant='link' className='gap-2 pl-0'>
            <ArrowLeft className='size-4' />
            Back to Interview Prep
          </Button>
        </Link>

        <div className=''>
          <h1 className='text-6xl font-bold gradient-title'>Mock Interview</h1>
          <p className='text-muted-foreground'>
            Test your knowledge with industry specific questions
          </p>
        </div>
      </div>
      <Quiz />
    </div>
  );
}
