import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { siteContentApi, achievementsApi, SiteContent, Achievement } from '@/lib/api';

// 使用 Hero Section 內容
export function useHeroContent(
  options?: UseQueryOptions<SiteContent>
) {
  return useQuery({
    queryKey: ['site-content', 'hero'],
    queryFn: siteContentApi.getHeroContent,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    // 提供 fallback 數據，當 API 失敗時使用
    placeholderData: {
      id: 0,
      section: 'hero',
      is_active: true,
      hero_image_url: '/images/hero-embroidery.jpg',
      master_image_url: null,
      updated_at: '',
      translations: {
        hero_title: '',
        hero_subtitle: '',
        hero_description: '',
        hero_cta_text: '',
        master_title: '',
        master_subtitle: '',
        master_description: '',
        master_description2: '',
        master_achievements_title: '',
        master_technique_title: '',
        master_technique_desc: '',
        footer_description: '',
        copyright_text: '',
      }
    },
    ...options,
  });
}

// 使用 Master Section 內容
export function useMasterContent(
  options?: UseQueryOptions<SiteContent>
) {
  return useQuery({
    queryKey: ['site-content', 'master'],
    queryFn: siteContentApi.getMasterContent,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    // 提供 fallback 數據
    placeholderData: {
      id: 0,
      section: 'master',
      is_active: true,
      hero_image_url: null,
      master_image_url: '/images/master-hands.jpg',
      updated_at: '',
      translations: {
        hero_title: '',
        hero_subtitle: '',
        hero_description: '',
        hero_cta_text: '',
        master_title: '',
        master_subtitle: '',
        master_description: '',
        master_description2: '',
        master_achievements_title: '',
        master_technique_title: '',
        master_technique_desc: '',
        footer_description: '',
        copyright_text: '',
      }
    },
    ...options,
  });
}

// 使用 Footer 內容
export function useFooterContent(
  options?: UseQueryOptions<SiteContent>
) {
  return useQuery({
    queryKey: ['site-content', 'footer'],
    queryFn: siteContentApi.getFooterContent,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    // 提供 fallback 數據
    placeholderData: {
      id: 0,
      section: 'footer',
      is_active: true,
      hero_image_url: null,
      master_image_url: null,
      updated_at: '',
      translations: {
        hero_title: '',
        hero_subtitle: '',
        hero_description: '',
        hero_cta_text: '',
        master_title: '',
        master_subtitle: '',
        master_description: '',
        master_description2: '',
        master_achievements_title: '',
        master_technique_title: '',
        master_technique_desc: '',
        footer_description: '',
        copyright_text: '',
      }
    },
    ...options,
  });
}

// 使用成就獎項
export function useAchievements(
  options?: UseQueryOptions<Achievement[]>
) {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: achievementsApi.getAll,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    // 提供 fallback 數據
    placeholderData: [],
    ...options,
  });
}