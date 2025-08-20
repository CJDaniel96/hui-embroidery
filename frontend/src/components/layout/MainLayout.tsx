'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 確保內容區域有適當的 z-index */}
      <main className="flex-1 relative z-1">
        {children}
      </main>
    </div>
  );
}