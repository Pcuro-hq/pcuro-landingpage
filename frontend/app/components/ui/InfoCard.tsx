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
    default: 'bg-white/70 shadow-glass hover:shadow-lg hover:-translate-y-1',
    active: 'bg-white shadow-glass-secondary hover:shadow-xl hover:-translate-y-1',
    muted: 'bg-primary-variant/10 shadow-card hover:shadow-lg hover:-translate-y-1',
  };

  return (
    <div className={`
      flex flex-col gap-5 
      p-[30px] 
      rounded-xl 
      text-center
      transition-all duration-300 ease-out
      ${variantStyles[variant]}
      ${className}
    `}>
      <h4 className="font-ibm-plex font-semibold text-card-title text-neutral-700">
        {title}
      </h4>
      <p className="font-ibm-plex text-body-lg text-text-secondary leading-normal">
        {description}
      </p>
    </div>
  );
}
