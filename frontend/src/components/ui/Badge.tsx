'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium font-body rounded-full
      transition-all duration-300
    `;

    const variants = {
      // 預設標籤 - 煙灰風格
      default: `
        bg-smoke-lightest text-smoke-gray
        border border-smoke-lighter
        hover:bg-smoke-lighter hover:text-ink-medium
      `,
      
      // 次要標籤 - 更淺的煙灰
      secondary: `
        bg-moon-white-soft text-smoke-light
        border border-smoke-lightest
        hover:bg-smoke-lightest hover:text-smoke-gray
      `,
      
      // 金色標籤 - 重要標記（謹慎使用）
      gold: `
        bg-sand-gold text-moon-white
        border border-sand-gold
        hover:bg-sand-gold-dark hover:shadow-gold-sm
      `,
      
      // 描邊標籤 - 純框線
      outline: `
        bg-transparent text-smoke-gray
        border border-smoke-lighter
        hover:bg-smoke-lightest hover:border-smoke-light
      `
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base'
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;