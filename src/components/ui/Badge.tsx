import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'featured' | 'bestseller' | 'category' | 'warning';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  className = '',
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-medium transition-colors select-none tracking-wide';

  const variants = {
    default: 'bg-[#1B2A4A]/10 text-[#1B2A4A] border border-[#1B2A4A]/20',
    featured: 'bg-[#C9A84C] text-[#1B2A4A] font-bold border border-[#C9A84C] shadow-sm',
    bestseller: 'bg-[#1B2A4A] text-[#FAFAF8] font-bold border border-[#C9A84C]/40 shadow-sm',
    category: 'bg-white text-[#1B2A4A] border border-[#1B2A4A]/15 shadow-2xs hover:border-[#C9A84C]',
    warning: 'bg-amber-100 text-amber-800 font-bold border border-amber-300 shadow-sm',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-full gap-1',
    md: 'text-xs px-3 py-1 rounded-full gap-1.5',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
