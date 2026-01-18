'use client';

import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface HeaderProps {
  onJoinWaitlist?: () => void;
  onRequestDemo?: () => void;
}

export function Header({ onJoinWaitlist, onRequestDemo }: HeaderProps) {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
    onJoinWaitlist?.();
  };

  return (
    <header className="w-full px-4 md:px-6 lg:px-10 py-4 flex items-center justify-between">
      <Logo size="md" className="text-3xl md:text-4xl lg:text-5xl" />
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
        <Button variant="primary" size="sm" className="text-sm md:text-base lg:text-body-lg" onClick={scrollToWaitlist}>
          Join Waitlist
        </Button>
        <Button variant="secondary" size="sm" className="text-sm md:text-base lg:text-body-lg hidden sm:flex" onClick={onRequestDemo}>
          Request Demo
        </Button>
      </div>
    </header>
  );
}
