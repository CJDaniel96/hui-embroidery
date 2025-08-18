# 慧繡雅集 API 使用指南

## 基本資訊

- **基礎 URL**: `http://localhost:8000/api/`
- **認證**: 目前無需認證（開發階段）
- **回應格式**: JSON
- **多語言**: 透過 `Accept-Language` header 指定語言（`zh-tw` 或 `en`）

## 主要端點

### 🎨 作品相關 `/api/artworks/`

- `GET /artworks/` - 獲取作品列表
- `GET /artworks/{id}/` - 獲取單個作品詳情
- `GET /artworks/featured/` - 獲取精選作品
- `GET /artworks/latest/` - 獲取最新作品
- `GET /artworks/by_year/` - 按年份分組的作品
- `GET /artworks/{id}/related/` - 獲取相關作品

**查詢參數**:
- `category` - 按分類過濾
- `year_from`, `year_to` - 按年份範圍過濾
- `search` - 關鍵字搜尋
- `ordering` - 排序（如 `-created_at`）

### 📝 部落格相關 `/api/blog/`

- `GET /posts/` - 獲取文章列表
- `GET /posts/{slug}/` - 獲取單篇文章（會增加瀏覽次數）
- `GET /posts/featured/` - 獲取精選文章
- `GET /posts/latest/` - 獲取最新文章
- `GET /posts/popular/` - 獲取熱門文章
- `GET /posts/archive/` - 文章歸檔
- `GET /settings/current/` - 獲取部落格設定

**查詢參數**:
- `category` - 按分類過濾
- `year`, `month` - 按年月過濾
- `search` - 關鍵字搜尋

### 🏷️ 分類相關 `/api/common/`

- `GET /categories/` - 獲取所有分類
- `GET /categories/artwork_categories/` - 獲取作品分類
- `GET /categories/blog_categories/` - 獲取部落格分類

### 📞 聯絡相關 `/api/contact/`

- `GET /info/current/` - 獲取聯絡資訊
- `GET /social/` - 獲取社群媒體連結
- `POST /form/` - 提交聯絡表單
- `GET /faq/` - 獲取常見問題
- `GET /faq/popular/` - 獲取熱門問題

## 使用範例

### 獲取精選作品（繁體中文）
```bash
curl -H "Accept-Language: zh-tw" http://localhost:8000/api/artworks/artworks/featured/
```

### 搜尋作品
```bash
curl "http://localhost:8000/api/artworks/artworks/?search=刺繡"
```

### 提交聯絡表單
```bash
curl -X POST http://localhost:8000/api/contact/form/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "張三",
    "email": "zhang@example.com",
    "subject": "詢問課程",
    "message": "請問有提供刺繡課程嗎？"
  }'
```

## 回應格式
### 成功回應
```json
{
  "count": 10,
  "next": "http://localhost:8000/api/artworks/artworks/?page=2",
  "previous": null,
  "results": [...]
}
```

### 錯誤回應
```json
{
  "detail": "Not found."
}
```

### 注意事項

1. 所有列表端點都支援分頁，預設每頁 20 筆資料
2. 使用 `Accept-Language` header 獲取特定語言內容
3. 圖片 URL 是完整的絕對路徑
4. 聯絡表單提交會記錄 IP 位址和瀏覽器資訊
5. 部分端點有速率限制（匿名用戶每小時 100 次請求）