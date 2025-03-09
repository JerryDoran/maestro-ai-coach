'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import heroImage from '@/public/banner.jpeg';

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    function handleScroll() {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add('scrolled');
      } else {
        imageElement?.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div className='space-y-6 text-center'>
        <div className='space-y-6 mx-auto'>
          <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
            Your AI Career Coach for <br />
            Professional Success
          </h1>
          <p className='mx-auto max-w-[600px] text-lg md:text-xl text-muted-foreground'>
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success
          </p>
        </div>
        <div className='flex justify-center space-x-4'>
          <Link href='/dashboard'>
            <Button size='lg' className='px-8 md:px-12 md:py-6 md:text-lg'>
              Get Started
            </Button>
          </Link>
          <Link
            href='https://thewebarchitech.com'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Button
              size='lg'
              className='px-8 md:px-12 md:py-6 md:text-lg'
              variant='outline'
            >
              Read More
            </Button>
          </Link>
        </div>
        <div className='hero-image-wrapper mt-5 md:mt-0'>
          <div ref={imageRef} className='hero-image'>
            <Image
              src={heroImage}
              alt='Dashboard Preview'
              width={1280}
              height={720}
              className='rounded-lg shadow-2xl border mx-auto'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
