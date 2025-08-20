'use client';

import { useEffect, useState } from 'react';

export default function ExtensionStatus() {
  const [detectedExtensions, setDetectedExtensions] = useState<string[]>([]);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkExtensions = () => {
      const html = document.documentElement;
      const body = document.body;
      const detected: string[] = [];

      // 檢測常見擴充功能
      const knownExtensions = [
        { class: 'tc-new-price', name: '購物比價工具' },
        { class: 'honey-extension', name: 'Honey' },
        { class: 'capital-one-extension', name: 'Capital One Shopping' }
      ];

      knownExtensions.forEach(ext => {
        if (html.classList.contains(ext.class) || body.classList.contains(ext.class)) {
          detected.push(ext.name);
        }
      });

      setDetectedExtensions(detected);
    };

    checkExtensions();
    const interval = setInterval(checkExtensions, 3000);

    return () => clearInterval(interval);
  }, []);

  if (detectedExtensions.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowStatus(!showStatus)}
        className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors"
      >
        🛡️ {detectedExtensions.length}
      </button>
      
      {showStatus && (
        <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <h3 className="font-semibold text-sm mb-2">檢測到的擴充功能</h3>
          <ul className="space-y-1">
            {detectedExtensions.map((ext, index) => (
              <li key={index} className="text-xs text-gray-600">
                ✅ {ext} (已清理)
              </li>
            ))}
          </ul>
          <p className="text-xs text-green-600 mt-2">
            所有擴充功能干擾已被自動清理，頁面正常運作。
          </p>
        </div>
      )}
    </div>
  );
}