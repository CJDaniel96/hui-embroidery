'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ExtensionProtectionProps {
  children: ReactNode;
}

export default function ExtensionProtection({ children }: ExtensionProtectionProps) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockingExtension, setBlockingExtension] = useState<string>('');

  useEffect(() => {
    // 確保在客戶端執行
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    // 檢測常見的干擾擴充功能
    const detectInterference = () => {
      // 檢測已知會造成問題的擴充功能類別名
      const problematicClasses = [
        'tc-new-price',
        'honey-extension',
        'capital-one-extension',
        'rakuten-extension',
        'paypal-extension',
        'adblock-detected',
        'ublock-detected'
      ];

      let detected = '';
      problematicClasses.forEach(className => {
        if (html.classList.contains(className) || body.classList.contains(className)) {
          detected = className;
          setBlockingExtension(className);
          setIsBlocked(true);
        }
      });

      // 檢測是否有擴充功能阻止了正常的 DOM 操作
      try {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position:absolute;top:-9999px;left:-9999px;';
        testDiv.innerHTML = '<span>test</span>';
        body.appendChild(testDiv);
        
        // 如果無法正常操作 DOM，可能被擴充功能干擾
        if (!testDiv.querySelector('span')) {
          setIsBlocked(true);
          setBlockingExtension('DOM manipulation blocked');
        }
        
        body.removeChild(testDiv);
      } catch (error) {
        console.log('DOM test failed:', error);
        setIsBlocked(true);
        setBlockingExtension('DOM access blocked');
      }
    };

    // 強制清理擴充功能干擾
    const forceCleanup = () => {
      // 移除所有可能的干擾類別名
      const classesToRemove = Array.from(html.classList)
        .concat(Array.from(body.classList))
        .filter(className => 
          className.includes('tc-') ||
          className.includes('honey-') ||
          className.includes('capital-') ||
          className.includes('rakuten-') ||
          className.includes('paypal-') ||
          className.includes('adblock-') ||
          className.includes('extension-')
        );

      classesToRemove.forEach(className => {
        html.classList.remove(className);
        body.classList.remove(className);
      });

      // 強制重設基本樣式
      if (html.style) {
        html.style.cssText = '';
      }
      if (body.style) {
        body.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;';
      }
    };

    // 立即執行檢測和清理
    detectInterference();
    forceCleanup();

    // 設定持續監控
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          forceCleanup();
        }
      });
    });

    // 觀察 html 和 body 元素
    if (html) {
      observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    }
    if (body) {
      observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    }

    // 每秒檢查一次
    const interval = setInterval(() => {
      detectInterference();
      forceCleanup();
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // 如果檢測到干擾，顯示警告訊息
  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">擴充功能衝突偵測</h2>
          <p className="text-gray-600 mb-6">
            檢測到瀏覽器擴充功能可能正在干擾頁面顯示。
          </p>
          {blockingExtension && (
            <p className="text-sm text-red-600 mb-4">
              偵測到：{blockingExtension}
            </p>
          )}
          <div className="space-y-3 text-sm text-gray-500">
            <p><strong>建議解決方法：</strong></p>
            <ol className="text-left space-y-1">
              <li>1. 使用無痕模式瀏覽</li>
              <li>2. 暫時禁用購物比價擴充功能</li>
              <li>3. 檢查廣告攔截器設定</li>
            </ol>
          </div>
          <button 
            onClick={() => {
              setIsBlocked(false);
              window.location.reload();
            }}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            強制載入頁面
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}