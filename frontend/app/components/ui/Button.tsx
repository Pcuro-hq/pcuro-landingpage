'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'cta';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
  secondary: 'bg-transparent border-[1.5px] border-primary-variant text-primary hover:bg-primary/5 hover:border-primary hover:scale-[1.02] active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-body rounded-3xl',
  md: 'px-6 py-2 text-body-lg rounded-3xl',
  lg: 'px-12 py-4 text-body-lg rounded-3xl',
  cta: 'px-[50px] py-[15px] text-h3 rounded-[40px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-gabarito font-medium
        transition-all duration-200
        cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
