'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 合併 refs
    React.useImperativeHandle(ref, () => inputRef.current!, []);

    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
      // 清理密碼管理器添加的屬性和元素
      const cleanup = () => {
        const input = inputRef.current;
        const container = containerRef.current;
        
        if (input) {
          // 移除密碼管理器添加的屬性
          const attributesToRemove = [
            'data-sharkid',
            'data-sharklabel', 
            'data-dashlane-rid',
            'data-dashlane-label',
            'data-1p-ignore',
            'data-lpignore',
            'data-form-type',
            'data-bw-ignore'
          ];
          
          attributesToRemove.forEach(attr => {
            if (input.hasAttribute(attr)) {
              input.removeAttribute(attr);
            }
          });
        }

        if (container) {
          // 移除密碼管理器添加的圖示容器
          const icons = container.querySelectorAll(
            'shark-icon-container, [data-sharkidcontainer], .dashlane-icon, .onepassword-icon, .bitwarden-icon'
          );
          icons.forEach(icon => {
            if (icon.parentNode) {
              icon.parentNode.removeChild(icon);
            }
          });
        }
      };

      // 立即清理一次
      cleanup();

      // 使用 MutationObserver 監控變化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' || mutation.type === 'childList') {
            setTimeout(cleanup, 0); // 延遲清理，讓擴充功能先完成操作
          }
        });
      });

      if (inputRef.current) {
        observer.observe(inputRef.current, {
          attributes: true,
          attributeFilter: ['data-sharkid', 'data-sharklabel', 'data-dashlane-rid']
        });
      }

      if (containerRef.current) {
        observer.observe(containerRef.current, {
          childList: true,
          subtree: true
        });
      }

      // 定期清理
      const interval = setInterval(cleanup, 2000);

      return () => {
        observer.disconnect();
        clearInterval(interval);
      };
    }, []);

    return (
      <div ref={containerRef} className="space-y-2" suppressHydrationWarning>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative" suppressHydrationWarning>
          <input
            ref={inputRef}
            id={inputId}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              'transition-colors duration-200',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            suppressHydrationWarning
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;