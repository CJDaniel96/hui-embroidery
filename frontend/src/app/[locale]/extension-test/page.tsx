'use client';

import { useEffect, useState } from 'react';

export default function ExtensionTestPage() {
  const [detectedExtensions, setDetectedExtensions] = useState<string[]>([]);
  const [formExtensions, setFormExtensions] = useState<string[]>([]);
  const [domTest, setDomTest] = useState<string>('');
  const [browserInfo, setBrowserInfo] = useState<any>({});

  useEffect(() => {
    // 確保在客戶端執行
    if (typeof window === 'undefined') return;

    // 檢測擴充功能
    const extensions: string[] = [];
    const formExt: string[] = [];
    
    try {
      // 檢測 DOM 類別名（購物比價擴充功能）
      const html = document.documentElement;
      const body = document.body;
      
      const shoppingExtensions = [
        'tc-new-price',
        'honey-extension', 
        'capital-one-extension',
        'rakuten-extension',
        'paypal-extension'
      ];
      
      shoppingExtensions.forEach(className => {
        if (html?.classList?.contains(className) || body?.classList?.contains(className)) {
          extensions.push(`購物擴充功能: ${className}`);
        }
      });

      // 檢測表單管理器擴充功能
      const testInput = document.createElement('input');
      testInput.type = 'email';
      testInput.name = 'test-email';
      testInput.style.position = 'absolute';
      testInput.style.top = '-9999px';
      document.body.appendChild(testInput);

      // 等待擴充功能處理
      setTimeout(() => {
        // 檢測是否有擴充功能屬性被添加
        const formManagerAttributes = [
          'data-sharkid',
          'data-sharklabel',
          'data-dashlane-rid',
          'data-dashlane-label',
          'data-1p-ignore',
          'data-lpignore',
          'data-form-type',
          'data-bw-ignore'
        ];

        formManagerAttributes.forEach(attr => {
          if (testInput.hasAttribute(attr)) {
            const value = testInput.getAttribute(attr);
            if (attr.includes('shark')) {
              formExt.push('Dashlane (Shark)');
            } else if (attr.includes('dashlane')) {
              formExt.push('Dashlane');
            } else if (attr.includes('1p')) {
              formExt.push('1Password');
            } else if (attr.includes('lp')) {
              formExt.push('LastPass');
            } else if (attr.includes('bw')) {
              formExt.push('Bitwarden');
            } else {
              formExt.push(`未知表單管理器: ${attr}=${value}`);
            }
          }
        });

        // 檢測是否有圖示容器被添加
        const iconContainers = document.querySelectorAll(
          'shark-icon-container, [data-sharkidcontainer], .dashlane-icon, .onepassword-icon, .bitwarden-icon, .lastpass-icon'
        );

        if (iconContainers.length > 0) {
          formExt.push(`檢測到 ${iconContainers.length} 個表單管理器圖示`);
        }

        document.body.removeChild(testInput);
        setFormExtensions([...new Set(formExt)]);
      }, 1000);
      
      // 檢測 window 物件上的擴充功能
      const windowExtensions = [
        'tcNewPrice',
        'honeyExtension',
        'capitalOneExtension',
        'dashlaneSafeFrame',
        'OnePassExtension',
        'lastpass',
        'bitwarden'
      ];
      
      windowExtensions.forEach(prop => {
        if ((window as any)[prop]) {
          extensions.push(`Window 物件: ${prop}`);
        }
      });
      
      setDetectedExtensions([...new Set(extensions)]);
      
      // DOM 操作測試
      try {
        const testDiv = document.createElement('div');
        testDiv.innerHTML = '<span>DOM test successful</span>';
        document.body.appendChild(testDiv);
        setDomTest('✅ 成功');
        document.body.removeChild(testDiv);
      } catch (error) {
        setDomTest(`❌ 失敗: ${error}`);
      }

      // 瀏覽器資訊
      setBrowserInfo({
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        extensions: (navigator as any).extensions || '不支援'
      });

    } catch (error) {
      console.error('Extension test error:', error);
      setDomTest(`❌ 測試錯誤: ${error}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">擴充功能全面診斷</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 購物擴充功能檢測 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🛒 購物比價擴充功能</h2>
            {detectedExtensions.length > 0 ? (
              <ul className="space-y-2">
                {detectedExtensions.map((ext, index) => (
                  <li key={index} className="text-red-600 font-mono text-sm">
                    ⚠️ {ext}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">✅ 未檢測到購物擴充功能干擾</p>
            )}
          </div>

          {/* 表單管理器檢測 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-900 mb-4">🔑 密碼/表單管理器</h2>
            {formExtensions.length > 0 ? (
              <ul className="space-y-2">
                {formExtensions.map((ext, index) => (
                  <li key={index} className="text-red-600 font-mono text-sm">
                    ⚠️ {ext}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">✅ 未檢測到表單管理器干擾</p>
            )}
          </div>

          {/* DOM 測試 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-900 mb-4">🔧 DOM 操作測試</h2>
            <p className="font-mono">
              {domTest || '⏳ 測試中...'}
            </p>
          </div>

          {/* 環境資訊 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🌐 瀏覽器資訊</h2>
            <div className="space-y-2 text-xs">
              <p><strong>瀏覽器:</strong> {browserInfo.userAgent?.split(' ')[0]}</p>
              <p><strong>語言:</strong> {browserInfo.language}</p>
              <p><strong>Cookie:</strong> {browserInfo.cookieEnabled ? '啟用' : '禁用'}</p>
              <p><strong>網路:</strong> {browserInfo.onLine ? '線上' : '離線'}</p>
            </div>
          </div>
        </div>

        {/* 解決建議 */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-purple-900 mb-4">💡 解決建議</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">購物擴充功能問題：</h3>
              <ol className="space-y-1 text-sm">
                <li>1. 🔒 使用無痕模式</li>
                <li>2. 🛒 暫時禁用 Honey、Capital One Shopping</li>
                <li>3. 🚫 檢查廣告攔截器設定</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">表單管理器問題：</h3>
              <ol className="space-y-1 text-sm">
                <li>1. 🔑 將網站加入管理器白名單</li>
                <li>2. 📝 禁用自動填入功能</li>
                <li>3. 🎯 使用我們的抗干擾元件</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 測試連結 */}
        <div className="mt-8 text-center space-x-4">
          <button 
            onClick={() => window.location.href = '/components-demo'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            測試抗干擾元件展示
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            重新檢測
          </button>
        </div>
      </div>
    </div>
  );
}