'use client';

import { useEffect, useState, ReactNode } from 'react';

interface SmartExtensionProtectionProps {
  children: ReactNode;
}

export default function SmartExtensionProtection({ children }: SmartExtensionProtectionProps) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockingExtension, setBlockingExtension] = useState<string>('');
  const [cleanupLog, setCleanupLog] = useState<string[]>([]);

  useEffect(() => {
    // 僅在客戶端執行
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    // 分類擴充功能的威脅等級
    const extensionClassification = {
      // 低威脅 - 靜默清理，不阻止頁面
      lowThreat: [
        'tc-new-price',           // 購物比價
        'tc-price-comparison',    
        'honey-extension',        // Honey 購物助手
        'rakuten-extension',      // Rakuten
        'paypal-extension'        // PayPal
      ],
      // 中威脅 - 清理並記錄，可能影響樣式
      mediumThreat: [
        'capital-one-extension',  // Capital One Shopping
        'adblock-detected',       // 廣告攔截器
        'ublock-detected'
      ],
      // 高威脅 - 嚴重破壞頁面功能，需要警告
      highThreat: [
        'page-modifier',          // 頁面修改器
        'script-blocker',         // 腳本攔截器
        'dom-manipulation-blocker' // DOM 操作攔截器
      ]
    };

    // 檢測和分類威脅
    const detectThreats = () => {
      const detectedLow: string[] = [];
      const detectedMedium: string[] = [];
      const detectedHigh: string[] = [];

      // 檢查低威脅擴充功能
      extensionClassification.lowThreat.forEach(className => {
        if (html.classList.contains(className) || body.classList.contains(className)) {
          detectedLow.push(className);
        }
      });

      // 檢查中威脅擴充功能
      extensionClassification.mediumThreat.forEach(className => {
        if (html.classList.contains(className) || body.classList.contains(className)) {
          detectedMedium.push(className);
        }
      });

      // 檢查高威脅擴充功能
      extensionClassification.highThreat.forEach(className => {
        if (html.classList.contains(className) || body.classList.contains(className)) {
          detectedHigh.push(className);
        }
      });

      // 只有高威脅才阻止頁面
      if (detectedHigh.length > 0) {
        setBlockingExtension(detectedHigh.join(', '));
        setIsBlocked(true);
        return;
      }

      // 記錄檢測到的威脅
      const logMessages: string[] = [];
      if (detectedLow.length > 0) {
        logMessages.push(`✅ 已清理低威脅擴充功能: ${detectedLow.join(', ')}`);
      }
      if (detectedMedium.length > 0) {
        logMessages.push(`⚠️ 已清理中威脅擴充功能: ${detectedMedium.join(', ')}`);
      }
      
      setCleanupLog(logMessages);
    };

    // 智慧清理功能
    const smartCleanup = () => {
      try {
        // 移除所有已知的干擾類別名
        const allKnownClasses = [
          ...extensionClassification.lowThreat,
          ...extensionClassification.mediumThreat,
          ...extensionClassification.highThreat
        ];

        let cleaned = false;
        allKnownClasses.forEach(className => {
          if (html.classList.contains(className)) {
            html.classList.remove(className);
            cleaned = true;
          }
          if (body.classList.contains(className)) {
            body.classList.remove(className);
            cleaned = true;
          }
        });

        // 移除以特定前綴開頭的類別名
        const prefixes = ['tc-', 'honey-', 'capital-', 'rakuten-', 'paypal-'];
        
        prefixes.forEach(prefix => {
          Array.from(html.classList).forEach(className => {
            if (className.startsWith(prefix)) {
              html.classList.remove(className);
              cleaned = true;
            }
          });
          
          Array.from(body.classList).forEach(className => {
            if (className.startsWith(prefix)) {
              body.classList.remove(className);
              cleaned = true;
            }
          });
        });

        // 確保基本樣式正確
        if (cleaned) {
          if (html.style) html.style.cssText = '';
          if (body.style) {
            body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            body.style.backgroundColor = 'white';
            body.style.color = '#333';
          }
        }

      } catch (error) {
        console.log('Smart cleanup error:', error);
      }
    };

    // 檢測 DOM 是否被嚴重破壞
    const testDOMIntegrity = () => {
      try {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position:absolute;top:-9999px;left:-9999px;';
        testDiv.innerHTML = '<span>test</span>';
        body.appendChild(testDiv);
        
        const canQuery = !!testDiv.querySelector('span');
        body.removeChild(testDiv);
        
        if (!canQuery) {
          setIsBlocked(true);
          setBlockingExtension('DOM manipulation severely compromised');
        }
      } catch (error) {
        setIsBlocked(true);
        setBlockingExtension('DOM access blocked');
      }
    };

    // 執行檢測和清理
    detectThreats();
    smartCleanup();
    testDOMIntegrity();

    // 設定持續監控（頻率較低，減少性能影響）
    const observer = new MutationObserver((mutations) => {
      let needsCleanup = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          needsCleanup = true;
        }
      });
      
      if (needsCleanup) {
        setTimeout(() => {
          smartCleanup();
          detectThreats();
        }, 100);
      }
    });

    if (html) observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    if (body) observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    // 較低頻率的定期清理
    const interval = setInterval(() => {
      smartCleanup();
      detectThreats();
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // 只有高威脅才顯示阻止頁面
  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg border border-red-200">
          <div className="text-6xl mb-4">🚨</div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">嚴重擴充功能衝突</h2>
          <p className="text-gray-600 mb-6">
            檢測到擴充功能嚴重破壞了頁面功能。
          </p>
          {blockingExtension && (
            <p className="text-sm text-red-600 mb-4 font-mono">
              問題源: {blockingExtension}
            </p>
          )}
          <div className="space-y-3 text-sm text-gray-500">
            <p><strong>建議解決方法：</strong></p>
            <ol className="text-left space-y-1">
              <li>1. 🔒 使用無痕模式瀏覽</li>
              <li>2. 🔧 禁用所有擴充功能</li>
              <li>3. 🌐 嘗試其他瀏覽器</li>
            </ol>
          </div>
          <button 
            onClick={() => {
              setIsBlocked(false);
              window.location.reload();
            }}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            強制載入頁面
          </button>
        </div>
      </div>
    );
  }

  // 正常顯示內容，但在開發模式下顯示清理日誌
  return (
    <>
      {children}
      {/* 開發模式下的清理狀態顯示 */}
      {process.env.NODE_ENV === 'development' && cleanupLog.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white text-xs p-3 rounded-lg shadow-lg max-w-sm">
          <div className="font-semibold mb-2">🛡️ 擴充功能保護</div>
          {cleanupLog.map((log, index) => (
            <div key={index} className="mb-1">{log}</div>
          ))}
          <button 
            onClick={() => setCleanupLog([])}
            className="mt-2 text-xs underline"
          >
            關閉
          </button>
        </div>
      )}
    </>
  );
}