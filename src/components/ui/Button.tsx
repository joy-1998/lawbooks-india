'use client';

import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-[#1B2A4A] text-white hover:bg-[#121E36] focus:ring-[#C9A84C] shadow-sm border border-[#1B2A4A]',
      secondary:
        'bg-[#C9A84C] text-[#1B2A4A] hover:bg-[#B8963E] focus:ring-[#1B2A4A] font-semibold shadow-sm border border-[#C9A84C]',
      outline:
        'border-2 border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white focus:ring-[#C9A84C]',
      ghost:
        'text-[#1B2A4A] hover:bg-[#1B2A4A]/10 focus:ring-[#1B2A4A]/20',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-lg gap-2',
      lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 shadow-md',
    };

    const disabledStyles = 'opacity-60 cursor-not-allowed active:scale-100 pointer-events-none';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${disabled || isLoading ? disabledStyles : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
