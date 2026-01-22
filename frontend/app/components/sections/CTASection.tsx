'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';

export function CTASection() {
  const router = useRouter();

  const handleJoinWaitlist = () => {
    router.push('/waitlist');
  };

  return (
    <section className="flex flex-col items-center gap-10 lg:gap-20 px-4">
      <Button 
        variant="primary" 
        size="lg" 
        onClick={handleJoinWaitlist}
        className="w-full max-w-[400px] shadow-button text-lg lg:text-h4"
      >
        Join Waitlist
      </Button>
      <p className="font-gabarito font-semibold text-xl md:text-2xl lg:text-h1 text-text-primary text-center max-w-[1023px]">
        One place. Fewer follow-ups. Less time spent chasing procurement.
      </p>
    </section>
  );
}
