'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      font-medium transition-all duration-300
      disabled:opacity-40 disabled:cursor-not-allowed
      focus:outline-none focus-visible:ring-2 focus-visible:ring-sand-gold focus-visible:ring-offset-2
      border font-body
    `;

    const variants = {
      // 主要按鈕 - 墨黑背景，月白文字，hover時文字變流沙金
      primary: `
        bg-ink-black text-moon-white border-ink-black
        hover:text-sand-gold hover:shadow-gold-sm
        active:scale-95 active:shadow-sm
        transition-all duration-300
      `,
      
      // 次要按鈕 - 透明背景，煙灰邊框，hover時變墨黑
      secondary: `
        bg-transparent text-smoke-gray border-smoke-lighter
        hover:text-ink-black hover:border-ink-black
        active:scale-95 active:bg-smoke-lightest
        transition-all duration-300
      `,
      
      // 幽靈按鈕 - 完全透明，hover時背景出現
      ghost: `
        bg-transparent text-smoke-gray border-transparent
        hover:text-ink-black hover:bg-smoke-lightest
        active:scale-95 active:bg-smoke-lighter
        transition-all duration-300
      `,
      
      // 連結按鈕 - 純文字，hover時變金色
      link: `
        bg-transparent text-smoke-gray border-transparent p-0
        hover:text-sand-gold underline-offset-4 hover:underline
        active:scale-95
        transition-all duration-300
      `
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
      xl: 'px-10 py-5 text-xl rounded-xl'
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* 主按鈕的金色光暈效果 */}
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-sand-gold opacity-0 hover:opacity-5 rounded-lg transition-opacity duration-300"></span>
        )}
        
        {/* 內容層 */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;