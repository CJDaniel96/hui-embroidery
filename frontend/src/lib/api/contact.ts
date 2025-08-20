import type { ContactInfo, ContactForm } from './types';

// 基礎 API 請求函數
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

export const contactApi = {
  // 獲取聯絡資訊
  getContactInfo: async (): Promise<ContactInfo> => {
    try {
      return await apiRequest<ContactInfo>('/contact/info/');
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      // 返回預設聯絡資訊
      return {
        phone: '+886-2-1234-5678',
        email: 'info@hui-embroidery.com',
        address: '台北市中正區...',
        business_hours: '週一至週五 9:00-18:00',
        translations: {
          company_name: '慧繡雅集'
        }
      };
    }
  },

  // 提交聯絡表單
  submitContactForm: async (data: ContactForm): Promise<{ success: boolean; message: string }> => {
    try {
      return await apiRequest<{ success: boolean; message: string }>('/contact/submit/', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  }
};