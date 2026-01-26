interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ 
  title, 
  subtitle, 
  className = '',
  align = 'left'
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      <h2 className="font-gabarito font-semibold text-h1 text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="font-gabarito font-normal text-[22px] text-black max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
