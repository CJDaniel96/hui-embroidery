import { artworksApi, blogApi, contactApi, commonApi, setApiLanguage } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export default async function TestPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // 設定 API 語言
  setApiLanguage(locale);

  let testResults = {
    artworks: null as any,
    posts: null as any,
    categories: null as any,
    contact: null as any,
    errors: [] as string[]
  };

  // 測試作品 API
  try {
    const featuredArtworks = await artworksApi.getFeaturedArtworks();
    testResults.artworks = featuredArtworks;
  } catch (error) {
    testResults.errors.push(`作品 API 錯誤: ${error}`);
  }

  // 測試部落格 API
  try {
    const latestPosts = await blogApi.getLatestPosts();
    testResults.posts = latestPosts;
  } catch (error) {
    testResults.errors.push(`部落格 API 錯誤: ${error}`);
  }

  // 測試分類 API
  try {
    const categories = await commonApi.getArtworkCategories();
    testResults.categories = categories;
  } catch (error) {
    testResults.errors.push(`分類 API 錯誤: ${error}`);
  }

  // 測試聯絡 API
  try {
    const contactInfo = await contactApi.getContactInfo();
    testResults.contact = contactInfo;
  } catch (error) {
    testResults.errors.push(`聯絡 API 錯誤: ${error}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API 連接測試</h1>
      
      <div className="grid gap-6">
        {/* 錯誤顯示 */}
        {testResults.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold mb-2">錯誤訊息</h2>
            <ul className="text-red-600 space-y-1">
              {testResults.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 作品測試 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-blue-800 font-semibold mb-2">精選作品 API</h2>
          {testResults.artworks ? (
            <div>
              <p className="text-green-600 mb-2">✅ 連接成功</p>
              <p>獲取到 {testResults.artworks.length} 件作品</p>
              {testResults.artworks.slice(0, 2).map((artwork: any) => (
                <div key={artwork.id} className="mt-2 p-2 bg-white rounded">
                  <p><strong>標題:</strong> {artwork.translations.title}</p>
                  <p><strong>媒材:</strong> {artwork.medium}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-600">❌ 連接失敗</p>
          )}
        </div>

        {/* 部落格測試 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-green-800 font-semibold mb-2">最新文章 API</h2>
          {testResults.posts ? (
            <div>
              <p className="text-green-600 mb-2">✅ 連接成功</p>
              <p>獲取到 {testResults.posts.length} 篇文章</p>
              {testResults.posts.slice(0, 2).map((post: any) => (
                <div key={post.id} className="mt-2 p-2 bg-white rounded">
                  <p><strong>標題:</strong> {post.translations.title}</p>
                  <p><strong>發布時間:</strong> {formatDate(post.published_at, locale)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-600">❌ 連接失敗</p>
          )}
        </div>

        {/* 分類測試 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-yellow-800 font-semibold mb-2">作品分類 API</h2>
          {testResults.categories ? (
            <div>
              <p className="text-green-600 mb-2">✅ 連接成功</p>
              <p>獲取到 {testResults.categories.length} 個分類</p>
              {testResults.categories.map((category: any) => (
                <div key={category.id} className="mt-2 p-2 bg-white rounded">
                  <p><strong>名稱:</strong> {category.translations.name}</p>
                  <p><strong>Slug:</strong> {category.slug}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-600">❌ 連接失敗</p>
          )}
        </div>

        {/* 聯絡資訊測試 */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h2 className="text-purple-800 font-semibold mb-2">聯絡資訊 API</h2>
          {testResults.contact ? (
            <div>
              <p className="text-green-600 mb-2">✅ 連接成功</p>
              <div className="mt-2 p-2 bg-white rounded">
                <p><strong>公司名稱:</strong> {testResults.contact.translations.company_name}</p>
                <p><strong>電話:</strong> {testResults.contact.phone}</p>
                <p><strong>電子郵件:</strong> {testResults.contact.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-600">❌ 連接失敗</p>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-semibold mb-2">系統資訊</h2>
        <p><strong>當前語言:</strong> {locale}</p>
        <p><strong>API 基礎 URL:</strong> {process.env.NEXT_PUBLIC_API_URL}</p>
        <p><strong>測試時間:</strong> {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}