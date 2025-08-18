# 使用 Python 3.12 官方映像作為基礎
FROM python:3.12-slim

# 設定工作目錄
WORKDIR /app

# 設定環境變數
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 安裝系統依賴（PostgreSQL 客戶端庫等）
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 複製需求檔案
COPY requirements.txt /app/

# 安裝 Python 依賴
RUN pip install --no-cache-dir -r requirements.txt

# 複製專案檔案
COPY . /app/

# 暴露埠號
EXPOSE 8000

# 啟動指令
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]