'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'seal' | 'ink';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      font-medium transition-all duration-250
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-offset-2
      border border-transparent
    `;

    const variants = {
      // 硃砂印章風格 - 主要按鈕
      primary: `
        bg-gradient-to-b from-vermillion-500 to-vermillion-600
        text-white shadow-md hover:shadow-lg
        hover:from-vermillion-600 hover:to-vermillion-700
        active:shadow-sm active:scale-95
        border border-vermillion-600
        seal-button
      `,
      
      // 墨色風格 - 次要按鈕  
      secondary: `
        bg-gradient-to-b from-gray-100 to-gray-200
        text-gray-900 shadow-sm hover:shadow-md
        hover:from-gray-200 hover:to-gray-300
        active:shadow-sm active:scale-95
        border border-gray-300
      `,
      
      // 描邊風格 - 輪廓按鈕
      outline: `
        bg-transparent border-2 border-gray-300
        text-gray-700 hover:bg-gray-50
        hover:border-vermillion-500 hover:text-vermillion-600
        active:bg-gray-100 active:scale-95
        eastern-border
      `,
      
      // 幽靈風格 - 文字按鈕
      ghost: `
        bg-transparent text-gray-600
        hover:bg-gray-100 hover:text-vermillion-600
        active:bg-gray-200 active:scale-95
        vermillion-hover
      `,
      
      // 印章風格 - 特殊按鈕
      seal: `
        bg-vermillion-600 text-white
        shadow-lg hover:shadow-xl
        hover:bg-vermillion-700 active:shadow-md
        seal-stamp eastern-border
        font-title font-medium
      `,
      
      // 墨跡風格 - 藝術按鈕
      ink: `
        bg-gray-900 text-white
        shadow-md hover:shadow-lg
        hover:bg-gray-800 active:shadow-sm
        ink-brush border border-gray-800
      `
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-lg',
      xl: 'px-8 py-4 text-xl rounded-xl'
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
        {variant === 'seal' && (
          <span className="absolute inset-0 bg-vermillion-700 opacity-0 hover:opacity-10 rounded-lg transition-opacity duration-250"></span>
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;