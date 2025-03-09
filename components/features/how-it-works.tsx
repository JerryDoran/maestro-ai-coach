import { howItWorks } from '@/data/how-it-works';

export default function HowItWorks() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <h2 className='text-3xl font-bold mb-4'>How it Works</h2>
          <p className='text-muted-foreground'>
            Four simple steps to accelerate your career growth
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center space-y-4'
            >
              <div className='size-16 rounded-full bg-primary/10 flex items-center justify-center'>
                {item.icon}
              </div>
              <h3 className='font-semibold text-xl'>{item.title}</h3>
              <p className='text-muted-foreground'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
