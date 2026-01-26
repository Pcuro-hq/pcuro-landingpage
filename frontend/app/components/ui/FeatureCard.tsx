interface FeatureCardProps {
  title: string;
  description: string;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  variant = 'default',
  className = '' 
}: FeatureCardProps) {
  const baseStyles = 'flex flex-col gap-5 p-[30px] rounded-xl transition-all duration-300 ease-out';
  const variantStyles = variant === 'highlighted' 
    ? 'bg-white shadow-glass-secondary hover:shadow-xl hover:-translate-y-1' 
    : 'bg-transparent shadow-glass hover:shadow-lg hover:-translate-y-1';

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`}>
      <h3 className="font-ibm-plex font-semibold text-card-title text-neutral-700 text-center">
        {title}
      </h3>
      <p className="font-ibm-plex text-body-lg text-text-secondary text-center leading-normal">
        {description}
      </p>
    </div>
  );
}
