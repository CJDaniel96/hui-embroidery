import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'chinese';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'bg-white transition-all duration-200';
    
    const variants = {
      default: 'border border-gray-200 rounded-lg',
      outlined: 'border-2 border-gray-300 rounded-lg',
      elevated: 'shadow-lg rounded-lg border border-gray-100',
      chinese: 'chinese-border bg-gradient-to-br from-white to-gray-50'
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;