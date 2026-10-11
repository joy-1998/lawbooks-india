import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const helperId = inputId ? `${inputId}-helper` : undefined;

    return (
      <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A]/80 select-none flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#1B2A4A]/50">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              w-full px-4 py-2.5 rounded-lg text-sm bg-white text-[#1A1A2E] placeholder:text-[#5A607F]/60
              border transition-all duration-200 outline-none
              ${
                leftIcon ? 'pl-10' : 'pl-4'
              }
              ${
                rightIcon ? 'pr-10' : 'pr-4'
              }
              ${
                error
                  ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                  : 'border-[#1B2A4A]/20 hover:border-[#1B2A4A]/40 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/25'
              }
              ${
                disabled
                  ? 'bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed select-none'
                  : 'bg-white'
              }
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#1B2A4A]/50">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-600 font-medium mt-0.5 flex items-center gap-1">
            <span aria-hidden="true">⚠️</span>
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-[#5A607F] mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
