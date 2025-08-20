'use client';

import { useEffect, ReactNode } from 'react';

interface NoExtensionWrapperProps {
  children: ReactNode;
}

export default function NoExtensionWrapper({ children }: NoExtensionWrapperProps) {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as Element;
          
          if (target === document.documentElement || target === document.body) {
            // 移除擴充功能添加的類名
            const classes = Array.from(target.classList);
            const extensionClasses = classes.filter(className => 
              className.includes('tc-') ||
              className.includes('honey-') ||
              className.includes('capital-') ||
              className.includes('rakuten-') ||
              className.includes('paypal-') ||
              className.includes('extension')
            );
            
            if (extensionClasses.length > 0) {
              extensionClasses.forEach(className => {
                target.classList.remove(className);
              });
              console.log('Removed extension classes:', extensionClasses);
            }
          }
        }
      });
    });

    // 觀察 html 和 body 元素的類名變化
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}