import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { width: 90, height: 20 },
  md: { width: 135, height: 29 },
  lg: { width: 180, height: 39 },
};

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const { width, height } = sizeMap[size];
  
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/pcuro-logo-new.png"
        alt="Pcuro"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}
