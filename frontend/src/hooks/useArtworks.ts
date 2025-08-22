import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { artworksApi, categoriesApi, Artwork, Category, ApiResponse } from '@/lib/api';

// 取得所有作品
export function useArtworks(
  params?: {
    page?: number;
    category?: string;
    search?: string;
  },
  options?: UseQueryOptions<ApiResponse<Artwork>>
) {
  return useQuery({
    queryKey: ['artworks', params],
    queryFn: () => artworksApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

// 取得精選作品
export function useFeaturedArtworks(
  options?: UseQueryOptions<Artwork[]>
) {
  return useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: artworksApi.getFeatured,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

// 取得最新作品
export function useLatestArtworks(
  options?: UseQueryOptions<Artwork[]>
) {
  return useQuery({
    queryKey: ['artworks', 'latest'],
    queryFn: artworksApi.getLatest,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

// 取得單個作品
export function useArtwork(
  id: number,
  options?: UseQueryOptions<Artwork>
) {
  return useQuery({
    queryKey: ['artwork', id],
    queryFn: () => artworksApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
}

// 取得作品分類
export function useArtworkCategories(
  options?: UseQueryOptions<Category[]>
) {
  return useQuery({
    queryKey: ['categories', 'artwork'],
    queryFn: categoriesApi.getArtworkCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
}