interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  return (
    <div className={`font-bold ${className}`}>
      <span className="text-brand-blue">Pcuro</span>
      <span className="text-brand-purple">.</span>
    </div>
  );
}
