'use client';

interface ToggleProps {
  options: [string, string];
  activeIndex: number;
  onToggle: (index: number) => void;
  className?: string;
}

export function Toggle({ 
  options, 
  activeIndex, 
  onToggle, 
  className = '' 
}: ToggleProps) {
  return (
    <div className={`
      flex items-center gap-2 md:gap-3 
      bg-primary 
      p-1 
      rounded-4xl
      ${className}
    `}>
      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => onToggle(index)}
          className={`
            flex items-center justify-center
            px-3 py-2
            w-[100px] md:w-[140px] lg:w-[168px]
            rounded-[44px]
            font-gabarito font-semibold text-lg md:text-2xl lg:text-[32px]
            transition-all duration-200
            cursor-pointer
            ${activeIndex === index 
              ? 'bg-white text-text-primary shadow-toggle' 
              : 'text-white hover:bg-white/10'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
