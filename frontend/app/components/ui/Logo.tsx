import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { width: 80, height: 24 },
  md: { width: 120, height: 36 },
  lg: { width: 160, height: 48 },
};

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const { width, height } = sizeMap[size];
  
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/pcuro-logo.svg"
        alt="Pcuro"
        width={width}
        height={height}
        className="object-contain"
        priority
        unoptimized
      />
    </div>
  );
}
