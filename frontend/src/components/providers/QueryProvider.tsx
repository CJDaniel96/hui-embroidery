'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // 避免在 SSR 期間立即重新取得資料
          staleTime: 60 * 1000, // 1 minute
          // 重試設定
          retry: (failureCount, error) => {
            // 對於 4xx 錯誤不重試
            if (error instanceof Error && error.message.includes('4')) {
              return false;
            }
            // 最多重試 2 次
            return failureCount < 2;
          },
          retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
        mutations: {
          // 突變失敗時重試一次
          retry: 1,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 只在開發環境顯示 React Query DevTools */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}