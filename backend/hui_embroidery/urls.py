"""
URL configuration for hui_embroidery project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# API 根路由視圖
@api_view(['GET'])
def api_root(request):
    """API 根路由 - 提供所有可用端點的概覽"""
    return Response({
        'message': '歡迎使用慧繡雅集 API',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'api': {
                'artworks': '/api/artworks/',
                'blog': '/api/blog/',
                'contact': '/api/contact/',
                'common': '/api/common/',
            },
            'specific_endpoints': {
                'featured_artworks': '/api/artworks/artworks/featured/',
                'latest_artworks': '/api/artworks/artworks/latest/',
                'artwork_categories': '/api/common/categories/artwork_categories/',
                'featured_posts': '/api/blog/posts/featured/',
                'latest_posts': '/api/blog/posts/latest/',
                'popular_posts': '/api/blog/posts/popular/',
                'blog_categories': '/api/common/categories/blog_categories/',
                'contact_info': '/api/contact/info/current/',
                'social_media': '/api/contact/social/',
                'contact_form': '/api/contact/form/',
                'faq': '/api/contact/faq/',
                'popular_faq': '/api/contact/faq/popular/',
            }
        },
        'documentation': {
            'browsable_api': '在瀏覽器中直接存取各個端點以查看詳細文檔',
            'filtering': '大部分列表端點支援 ?search=關鍵字 進行搜尋',
            'pagination': '列表結果會自動分頁，使用 ?page=2 來存取其他頁面',
            'language': '使用 Accept-Language header 來獲取特定語言的內容'
        }
    })

urlpatterns = [
    # 管理後台
    path('admin/', admin.site.urls),
    
    # API 根路由
    path('api/', api_root, name='api-root'),
    
    # 各模組的 API 路由
    path('api/artworks/', include('artworks.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/common/', include('common.urls')),
]

# 開發環境下提供媒體檔案服務
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)