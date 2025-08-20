import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// 輕量級的 Next.js 導航 API 包裝器
// 會考慮路由配置
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);