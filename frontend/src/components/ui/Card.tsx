'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'paper' | 'silk' | 'ink';
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = `
      relative overflow-hidden transition-all duration-300
      bg-white border border-gray-200
    `;

    const variants = {
      // 預設宣紙風格
      default: `
        paper-card rounded-lg
        hover:shadow-lg transition-all duration-300
      `,
      
      // 浮起宣紙風格
      elevated: `
        paper-card rounded-lg shadow-md
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      `,
      
      // 描邊風格
      outlined: `
        bg-white border-2 border-gray-200 rounded-lg
        hover:border-vermillion-300 hover:shadow-md
        eastern-border transition-all duration-300
      `,
      
      // 宣紙質感
      paper: `
        bg-moon-white rounded-lg shadow-sm
        paper-texture border border-gray-100
        hover:shadow-md transition-all duration-300
      `,
      
      // 絲綢質感  
      silk: `
        bg-gradient-to-br from-moon-white to-gray-50
        silk-texture rounded-lg shadow-sm
        border border-gray-100
        hover:shadow-md transition-all duration-300
      `,
      
      // 墨跡風格
      ink: `
        bg-gradient-to-br from-gray-900 to-gray-800
        text-white rounded-lg shadow-lg
        border border-gray-700
        hover:shadow-xl transition-all duration-300
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
        {/* 宣紙紋理層 */}
        {(variant === 'paper' || variant === 'default') && (
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="w-full h-full bg-paper-texture"></div>
          </div>
        )}
        
        {/* 絲綢紋理層 */}
        {variant === 'silk' && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-silk-texture"></div>
          </div>
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