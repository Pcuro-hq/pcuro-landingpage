'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import Image from 'next/image';

// Local image path
const quoteImage = '/images/hero-quote-summary.png';

interface HeroSectionProps {
  onRequestDemo?: () => void;
}

export function HeroSection({ onRequestDemo }: HeroSectionProps) {
  const router = useRouter();

  const handleJoinWaitlist = () => {
    router.push('/waitlist');
  };

  return (
    <section className="w-full px-10 lg:px-20 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
      <div className="flex-1 flex flex-col gap-8 lg:gap-10 max-w-[700px]">
        <h1 className="font-gabarito font-semibold text-4xl md:text-5xl lg:text-[56px] xl:text-display text-text-primary leading-tight">
          Where businesses connect, bid and buy smarter with AI
        </h1>
        <p className="text-body lg:text-body-lg text-black leading-relaxed max-w-[500px]">
          Pcuro is a next-gen B2B marketplace where businesses search, compare and buy from trusted suppliers with real-time AI insights.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Button variant="primary" size="lg" onClick={handleJoinWaitlist}>
            Join Waitlist
          </Button>
          <Button variant="secondary" size="lg" onClick={onRequestDemo}>
            Request a Demo
          </Button>
        </div>
      </div>
      <div className="relative w-full max-w-[394px] aspect-[394/450] lg:w-[394px] lg:h-[450px] shrink-0">
        <Image
          src={quoteImage}
          alt="Quote Summary Preview"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </section>
  );
}
