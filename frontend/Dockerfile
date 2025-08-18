# 使用 Node.js 18 官方映像作為基礎
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package 相關檔案
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production

# 複製專案檔案
COPY . .

# 建立 Next.js 應用
RUN npm run build

# 暴露埠號
EXPOSE 3000

# 啟動指令
CMD ["npm", "start"]