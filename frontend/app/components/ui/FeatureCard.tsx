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
  const baseStyles = 'flex flex-col gap-4 p-6 rounded-xl';
  const variantStyles = variant === 'highlighted' 
    ? 'bg-white shadow-glass-secondary' 
    : 'bg-transparent shadow-glass';

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`}>
      <h3 className="font-ibm-plex font-semibold text-h3 text-neutral-700 text-center">
        {title}
      </h3>
      <p className="font-ibm-plex text-xl text-text-secondary text-center leading-normal">
        {description}
      </p>
    </div>
  );
}
