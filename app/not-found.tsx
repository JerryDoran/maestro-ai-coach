'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 text-center'>
      <div className='space-y-6 max-w-md'>
        <h1 className='text-6xl font-bold gradient-title'>404</h1>
        <h2 className='text-2xl font-semibold'>Page Not Found</h2>
        <p className='text-muted-foreground'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or never existed.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
          <Button asChild variant='default'>
            <Link href='/'>
              <Home className='mr-2 h-4 w-4' />
              Back to Home
            </Link>
          </Button>
          <Button variant='outline' onClick={() => window.history.back()}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
