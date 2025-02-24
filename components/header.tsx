import { ThemeToggle } from '@/components/theme-toggle';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';

export default function Header() {
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link
          href='/'
          className='text-3xl font-bold bg-transparent text-transparent bg-clip-text  bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 tracking-wide'
        >
          Maestro
        </Link>
        <div className=''>
          <SignedIn>
            <Link href='/dashboard'>
              <Button>
                <LayoutDashboard className='size-4' />
                Industry Insights
              </Button>
            </Link>
          </SignedIn>
        </div>
      </nav>
      <ThemeToggle />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
