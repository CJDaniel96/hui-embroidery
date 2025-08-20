import { apiClient } from './client';
import { ApiResponse, Artwork, ArtworkDetail, QueryParams } from '@/lib/types';

export const artworksApi = {
  // 獲取作品列表
  getArtworks: (params?: QueryParams): Promise<ApiResponse<Artwork>> => {
    return apiClient.get('/artworks/artworks/', params);
  },

  // 獲取單個作品詳情
  getArtwork: (id: number): Promise<ArtworkDetail> => {
    return apiClient.get(`/artworks/artworks/${id}/`);
  },

  // 獲取精選作品
  getFeaturedArtworks: (): Promise<Artwork[]> => {
    return apiClient.get('/artworks/artworks/featured/');
  },

  // 獲取最新作品
  getLatestArtworks: (): Promise<Artwork[]> => {
    return apiClient.get('/artworks/artworks/latest/');
  },

  // 按年份分組的作品
  getArtworksByYear: (): Promise<Array<{ year: number; artworks: Artwork[] }>> => {
    return apiClient.get('/artworks/artworks/by_year/');
  },

  // 獲取相關作品
  getRelatedArtworks: (id: number): Promise<Artwork[]> => {
    return apiClient.get(`/artworks/artworks/${id}/related/`);
  },
};