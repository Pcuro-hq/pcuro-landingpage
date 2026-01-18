interface IconProps {
  className?: string;
}

export function CheckCircleIcon({ className = '' }: IconProps) {
  return (
    <svg 
      className={className}
      viewBox="0 0 30 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="15" 
        cy="15" 
        r="12.5" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <path 
        d="M10 15.5L13.5 19L20 11" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
