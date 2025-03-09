import { testimonials } from '@/data/testimonials';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

export default function WhatUsersSay() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
      <div className='container mx-auto px-4 md:px-8'>
        <h2 className='text-3xl font-bold mb-10 text-center tracking-tighter'>
          What Our Users Say
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='bg-background'>
              <CardContent className='pt-6'>
                <div className='flex flex-col space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='relative size-12 flex-shrink-0'>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className='rounded-full object-cover border-2 border-primary/40'
                      />
                    </div>
                    <div>
                      <p className='font-semibold'>{testimonial.author}</p>
                      <p className='text-muted-foreground text-sm'>
                        {testimonial.role}
                      </p>
                      <p className='text-primary text-sm'>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote>
                    <p className='text-muted-foreground italic relative'>
                      <span className='text-3xl absolute text-primary -top-1 -left-4'>
                        &quot;
                      </span>
                      {testimonial.quote}
                      <span className='text-3xl absolute text-primary -bottom-4'>
                        &quot;
                      </span>
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
