import { ApiError } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API 客戶端類別
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // 設定語言 header
  setLanguage(locale: string) {
    this.defaultHeaders['Accept-Language'] = locale;
  }

  // 處理 API 回應
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP error! status: ${response.status}` };
      }
      throw new Error(errorData.detail || errorData.message || 'API request failed');
    }

    try {
      return await response.json();
    } catch {
      // 如果沒有 JSON 回應，返回空物件
      return {} as T;
    }
  }

  // GET 請求
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}/api${endpoint}`);
    
    // 添加查詢參數
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
      cache: 'no-store', // 確保獲取最新資料
    });

    return this.handleResponse<T>(response);
  }

  // POST 請求
  async post<T, U = any>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  // PUT 請求
  async put<T, U = any>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  // DELETE 請求
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      method: 'DELETE',
      headers: this.defaultHeaders,
    });

    return this.handleResponse<T>(response);
  }
}

// 建立預設的 API 客戶端實例
export const apiClient = new ApiClient();

// 設定語言的幫助函數
export const setApiLanguage = (locale: string) => {
  apiClient.setLanguage(locale);
};