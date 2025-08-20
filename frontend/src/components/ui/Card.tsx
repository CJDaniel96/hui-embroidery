'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'minimal' | 'artwork';
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = `
      relative overflow-hidden transition-all duration-300
      bg-moon-white-pure border border-smoke-lightest
      rounded-lg
    `;

    const variants = {
      // 預設卡片 - 美術館標準展示
      default: `
        shadow-sm hover:shadow-md hover:-translate-y-1
        border-smoke-lightest hover:border-smoke-lighter
        transition-all duration-300
      `,
      
      // 浮起卡片 - 重要內容展示
      elevated: `
        shadow-md hover:shadow-xl hover:-translate-y-2
        border-smoke-lighter hover:border-smoke-light
        transition-all duration-300
      `,
      
      // 極簡卡片 - 純淨展示
      minimal: `
        shadow-none border-0 bg-transparent
        hover:bg-moon-white-soft
        transition-all duration-300
      `,
      
      // 作品卡片 - 藝術品專用展示
      artwork: `
        shadow-md hover:shadow-2xl hover:-translate-y-3
        border-smoke-lightest hover:border-sand-gold/20
        hover:shadow-gold-md
        transition-all duration-500
        group
      `
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          className
        )}
        {...props}
      >
        {/* 作品卡片的金色光暈效果 */}
        {variant === 'artwork' && (
          <div className="absolute inset-0 bg-sand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        )}
        
        {/* 內容層 */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;