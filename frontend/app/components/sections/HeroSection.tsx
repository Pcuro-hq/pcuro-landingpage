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
        <h1 className="font-gabarito font-semibold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] xl:text-display text-text-primary leading-tight animate-fade-in">
          <span className="block whitespace-nowrap">Where businesses connect,</span>
          <span className="block whitespace-nowrap">bid and buy smarter with AI</span>
        </h1>
        <div className="max-w-[540px] animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <p className="text-body lg:text-body-lg text-black leading-relaxed">
            Pcuro is a next-gen B2B marketplace where businesses search, compare and buy from trusted suppliers with real-time AI insights.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <Button variant="primary" size="lg" onClick={handleJoinWaitlist}>
            Join Waitlist
          </Button>
          <Button variant="secondary" size="lg" onClick={onRequestDemo}>
            Request a Demo
          </Button>
        </div>
      </div>
      <div className="relative w-full max-w-[320px] aspect-[394/450] lg:w-[320px] lg:h-[365px] shrink-0 animate-fade-in hover:scale-[1.02] transition-transform duration-300" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
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
