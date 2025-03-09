import { ThemeToggle } from '@/components/theme-toggle';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/public/maestro-logo.png';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
      <nav className='container mx-auto px-4 py-5 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src={logo} alt='logo' className='w-10' />
          <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-yellow-500 to-pink-500'>
            Maestro
          </h1>
        </Link>
        <div className=' flex items-center space-x-2 md:space-x-4'>
          <SignedIn>
            <Link href='/dashboard'>
              <Button variant='outline' className='border-gray-700'>
                <LayoutDashboard className='size-4' />
                <span className='hidden md:block'>Industry Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarsIcon className='size-4' />
                  <span className='hidden md:block'>Growth Tools</span>
                  <ChevronDown className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href='/growth-tools/resume'
                    className='flex items-center gap-2'
                  >
                    <FileText className='size-4' />
                    <span className=''>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href='/growth-tools/ai-cover-letter'
                    className='flex items-center gap-2'
                  >
                    <PenBox className='size-4' />
                    <span className=''>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href='/growth-tools/interview-prep'
                    className='flex items-center gap-2'
                  >
                    <GraduationCap className='size-4' />
                    <span className=''>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          {/* <ThemeToggle /> */}
          <SignedOut>
            <SignInButton>
              <Button variant='outline' className='border-gray-700'>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSwitchSessionUrl='/' />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
