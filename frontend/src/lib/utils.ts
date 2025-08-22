import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API 基礎 URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 圖片 URL 處理
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/placeholder-image.jpg';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}

// 格式化日期
export function formatDate(date: string | Date, locale: string = 'zh-TW'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}