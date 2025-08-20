import { apiClient } from './client';
import { ContactInfo, SocialMedia, ContactForm, ContactFormResponse, FAQ } from '@/lib/types';

export const contactApi = {
  // 獲取聯絡資訊
  getContactInfo: (): Promise<ContactInfo> => {
    return apiClient.get('/contact/info/current/');
  },

  // 獲取社群媒體
  getSocialMedia: (): Promise<SocialMedia[]> => {
    return apiClient.get('/contact/social/');
  },

  // 提交聯絡表單
  submitContactForm: (data: ContactForm): Promise<ContactFormResponse> => {
    return apiClient.post('/contact/form/', data);
  },

  // 獲取常見問題
  getFAQ: (): Promise<FAQ[]> => {
    return apiClient.get('/contact/faq/');
  },

  // 獲取熱門問題
  getPopularFAQ: (): Promise<FAQ[]> => {
    return apiClient.get('/contact/faq/popular/');
  },

  // 獲取表單成功頁面資訊
  getFormSuccessInfo: (): Promise<{
    title: string;
    message: string;
    redirect_delay: number;
  }> => {
    return apiClient.get('/contact/form/success/');
  },
};