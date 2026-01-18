interface InfoCardProps {
  title: string;
  description: string;
  variant?: 'default' | 'active' | 'muted';
  className?: string;
}

export function InfoCard({ 
  title, 
  description, 
  variant = 'default',
  className = '' 
}: InfoCardProps) {
  const variantStyles = {
    default: 'bg-white/70 shadow-glass',
    active: 'bg-white shadow-glass-secondary',
    muted: 'bg-primary-variant/10 shadow-card',
  };

  return (
    <div className={`
      flex flex-col gap-6 
      px-6 py-5 
      rounded-xl 
      text-center
      ${variantStyles[variant]}
      ${className}
    `}>
      <h4 className="font-ibm-plex font-semibold text-h3 text-neutral-700">
        {title}
      </h4>
      <p className="font-ibm-plex text-xl text-text-secondary leading-normal">
        {description}
      </p>
    </div>
  );
}
