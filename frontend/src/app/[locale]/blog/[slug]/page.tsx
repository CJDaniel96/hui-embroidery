'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import ExtensionStatus from '@/components/common/ExtensionStatus';
import ArticleHeader from '@/components/blog/detail/ArticleHeader';
import ArticleContent from '@/components/blog/detail/ArticleContent';
import AuthorInfo from '@/components/blog/detail/AuthorInfo';
import RelatedArticles from '@/components/blog/detail/RelatedArticles';
import ArticleNavigation from '@/components/blog/detail/ArticleNavigation';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { blogApi, type Post, setApiLanguage } from '@/lib/api';

export default function BlogPostPage() {
  const params = useParams();
  const locale = useLocale();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 設定 API 語言
  useEffect(() => {
    setApiLanguage(locale);
  }, [locale]);

  // 監聽滾動以顯示返回頂部按鈕
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 載入文章
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPost = await blogApi.getPost(slug);
        setPost(fetchedPost);
        
        // 更新頁面標題
        document.title = `${fetchedPost.translations.title || '文章'} - 慧繡雅集`;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // 返回頂部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigation = {
    home: locale === 'zh-tw' ? '首頁' : 'Home',
    gallery: locale === 'zh-tw' ? '作品集' : 'Gallery',
    about: locale === 'zh-tw' ? '關於我們' : 'About',
    blog: locale === 'zh-tw' ? '部落格' : 'Blog',
    contact: locale === 'zh-tw' ? '聯絡我們' : 'Contact',
  };

  const footerText = {
    copyright: locale === 'zh-tw' ? '版權所有' : 'Copyright',
    allRightsReserved: locale === 'zh-tw' ? '保留所有權利' : 'All Rights Reserved',
    quickLinks: locale === 'zh-tw' ? '快速連結' : 'Quick Links',
    contact: locale === 'zh-tw' ? '聯絡資訊' : 'Contact Info',
    followUs: locale === 'zh-tw' ? '關注我們' : 'Follow Us',
  };

  // 載入狀態
  if (loading) {
    return (
      <div className="min-h-screen paper-texture">
        <ExtensionStatus />
        <Header navigation={navigation} />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <LoadingSpinner size="lg" />
              <p className="font-body text-gray-600 mt-4">
                {locale === 'zh-tw' ? '載入文章中...' : 'Loading article...'}
              </p>
            </div>
          </div>
        </main>

        <Footer text={footerText} navigation={navigation} />
      </div>
    );
  }

  // 錯誤狀態
  if (error || !post) {
    return (
      <div className="min-h-screen paper-texture">
        <ExtensionStatus />
        <Header navigation={navigation} />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 eastern-border flex items-center justify-center">
                <span className="text-3xl text-gray-400">📄</span>
              </div>
              <h1 className="font-title text-3xl font-medium text-gray-400 mb-4">
                {locale === 'zh-tw' ? '文章不存在' : 'Article Not Found'}
              </h1>
              <p className="font-body text-gray-500 mb-8">
                {locale === 'zh-tw' 
                  ? '抱歉，您要找的文章不存在或已被移除。' 
                  : 'Sorry, the article you are looking for does not exist or has been removed.'}
              </p>
              {error && (
                <p className="font-body text-red-500 text-sm mb-8">
                  {locale === 'zh-tw' ? '錯誤詳情:' : 'Error details:'} {error}
                </p>
              )}
              <div className="space-x-4">
                <Button onClick={() => window.history.back()} variant="outline">
                  {locale === 'zh-tw' ? '返回上頁' : 'Go Back'}
                </Button>
                <Button onClick={() => window.location.href = `/${locale}/blog`} variant="seal">
                  {locale === 'zh-tw' ? '瀏覽文章' : 'Browse Articles'}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer text={footerText} navigation={navigation} />
      </div>
    );
  }

  return (
    <div className="min-h-screen paper-texture">
      <ExtensionStatus />
      <Header navigation={navigation} />
      
      <main className="pt-20">
        {/* 文章標題區域 */}
        <ArticleHeader post={post} />

        {/* 主要內容區域 */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* 文章內容 */}
          <div className="lg:col-span-3">
            <ArticleContent post={post} />
            <AuthorInfo post={post} />
            <ArticleNavigation currentPost={post} />
          </div>

          {/* 側邊欄 */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <div className="py-16">
              <BlogSidebar currentPostId={post.id} />
            </div>
          </div>
        </div>

        {/* 相關文章 */}
        <RelatedArticles currentPost={post} />
      </main>

      {/* 返回頂部按鈕 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-vermillion-500 hover:bg-vermillion-600 text-white eastern-border shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
        >
          <span className="block transform group-hover:-translate-y-1 transition-transform duration-200">
            ↑
          </span>
        </button>
      )}

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}