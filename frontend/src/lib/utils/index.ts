import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 用於合併 Tailwind CSS 類名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化日期
export function formatDate(dateString: string, locale: string = 'zh-TW'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 格式化相對時間
export function formatRelativeTime(dateString: string, locale: string = 'zh-TW'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return locale === 'zh-TW' ? '今天' : 'Today';
  } else if (diffDays === 1) {
    return locale === 'zh-TW' ? '昨天' : 'Yesterday';
  } else if (diffDays < 7) {
    return locale === 'zh-TW' ? `${diffDays} 天前` : `${diffDays} days ago`;
  } else {
    return formatDate(dateString, locale);
  }
}

// 獲取圖片 URL
export function getImageUrl(url: string | null): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${url}`;
}

// 生成摘要
export function generateExcerpt(content: string, maxLength: number = 150): string {
  // 移除 HTML 標籤
  const cleanContent = content.replace(/<[^>]*>/g, '');
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  return cleanContent.substring(0, maxLength).trim() + '...';
}

// 睡眠函數（用於測試）
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 錯誤處理
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

// URL slug 處理
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/[\s_-]+/g, '-') // 替換空格和下劃線為連字符
    .replace(/^-+|-+$/g, ''); // 移除開頭和結尾的連字符
}

// 深度複製物件
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 防抖函數
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 節流函數
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}