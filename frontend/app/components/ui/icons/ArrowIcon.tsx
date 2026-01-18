interface ArrowIconProps {
  direction: 'left' | 'right';
  className?: string;
}

export function ArrowIcon({ direction, className = '' }: ArrowIconProps) {
  return (
    <svg 
      className={className}
      viewBox="0 0 30 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {direction === 'left' ? (
        <>
          <path 
            d="M15 6L6 15L15 24" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M6 15H24" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path 
            d="M15 6L24 15L15 24" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M24 15H6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
