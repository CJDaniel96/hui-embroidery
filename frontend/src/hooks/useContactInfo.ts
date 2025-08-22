import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '@/lib/utils';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  business_hours: string;
  translations: {
    company_name: string;
    description: string;
  };
}

interface SocialMedia {
  id: number;
  platform: string;
  platform_display: string;
  url: string;
  username: string;
  is_active: boolean;
  order: number;
}

const fetchContactInfo = async (): Promise<ContactInfo> => {
  const response = await fetch(`${API_BASE_URL}/api/contact/info/current/`, {
    headers: {
      'Accept-Language': 'zh-tw',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contact info');
  }

  return response.json();
};

const fetchSocialMedia = async (): Promise<SocialMedia[]> => {
  const response = await fetch(`${API_BASE_URL}/api/contact/social/`, {
    headers: {
      'Accept-Language': 'zh-tw',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch social media');
  }

  return response.json();
};

export function useContactInfo() {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: fetchContactInfo,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });
}

export function useSocialMedia() {
  return useQuery({
    queryKey: ['social-media'],
    queryFn: fetchSocialMedia,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });
}