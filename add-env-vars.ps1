# Vercel Environment Variables Setup Script
# Для добавления DATABASE_URL в Vercel

Write-Host "=== Vercel Environment Variables Setup ===" -ForegroundColor Green
Write-Host ""

# Проверка что в папке есть .vercel конфиг
if (-not (Test-Path ".vercel")) {
    Write-Host "ERROR: .vercel папка не найдена. Запустите 'vercel link' сначала." -ForegroundColor Red
    exit 1
}

Write-Host "Выберите вариант базы данных:" -ForegroundColor Yellow
Write-Host "1. Supabase (рекомендуется, бесплатно) - https://supabase.com"
Write-Host "2. Railway - https://railway.app"
Write-Host "3. Neon - https://neon.tech"
Write-Host "4. Своя PostgreSQL база"
Write-Host ""

$choice = Read-Host "Выберите номер (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "=== Supabase Setup ===" -ForegroundColor Cyan
        Write-Host "1. Перейдите на https://supabase.com и создайте новый проект"
        Write-Host "2. В Project Settings -> Database, найдите Connection String"
        Write-Host "3. Скопируйте URI (выглядит как: postgresql://...)"
        Write-Host ""
        $dbUrl = Read-Host "Вставьте Database URL"

        if ($dbUrl -eq "") {
            Write-Host "DATABASE_URL не может быть пустой!" -ForegroundColor Red
            exit 1
        }

        Write-Host ""
        Write-Host "Добавляем DATABASE_URL в Vercel..." -ForegroundColor Green
        vercel env add DATABASE_URL production
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ SUCCESS: DATABASE_URL добавлена!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Теперь перезапустите deployment:" -ForegroundColor Yellow
            Write-Host "  vercel --prod"
        }
    }
    "2" {
        Write-Host ""
        Write-Host "=== Railway Setup ===" -ForegroundColor Cyan
        Write-Host "1. Перейдите на https://railway.app"
        Write-Host "2. Создайте новый PostgreSQL сервис"
        Write-Host "3. Откройте Connect и скопируйте Database URL"
        Write-Host ""
        $dbUrl = Read-Host "Вставьте Database URL"

        if ($dbUrl -eq "") {
            Write-Host "DATABASE_URL не может быть пустой!" -ForegroundColor Red
            exit 1
        }

        Write-Host ""
        Write-Host "Добавляем DATABASE_URL в Vercel..." -ForegroundColor Green
        vercel env add DATABASE_URL production
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ SUCCESS: DATABASE_URL добавлена!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Перезапустите deployment:" -ForegroundColor Yellow
            Write-Host "  vercel --prod"
        }
    }
    "3" {
        Write-Host ""
        Write-Host "=== Neon Setup ===" -ForegroundColor Cyan
        Write-Host "1. Перейдите на https://neon.tech"
        Write-Host "2. Создайте новый проект и базу данных"
        Write-Host "3. Скопируйте Connection String (PostgreSQL)"
        Write-Host ""
        $dbUrl = Read-Host "Вставьте Database URL"

        if ($dbUrl -eq "") {
            Write-Host "DATABASE_URL не может быть пустой!" -ForegroundColor Red
            exit 1
        }

        Write-Host ""
        Write-Host "Добавляем DATABASE_URL в Vercel..." -ForegroundColor Green
        vercel env add DATABASE_URL production
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ SUCCESS: DATABASE_URL добавлена!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Перезапустите deployment:" -ForegroundColor Yellow
            Write-Host "  vercel --prod"
        }
    }
    "4" {
        Write-Host ""
        Write-Host "=== Custom PostgreSQL Setup ===" -ForegroundColor Cyan
        Write-Host "Введите полную Database URL (PostgreSQL connection string)"
        Write-Host "Формат: postgresql://username:password@host:5432/database"
        Write-Host ""
        $dbUrl = Read-Host "Вставьте Database URL"

        if ($dbUrl -eq "") {
            Write-Host "DATABASE_URL не может быть пустой!" -ForegroundColor Red
            exit 1
        }

        Write-Host ""
        Write-Host "Добавляем DATABASE_URL в Vercel..." -ForegroundColor Green
        vercel env add DATABASE_URL production
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ SUCCESS: DATABASE_URL добавлена!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Перезапустите deployment:" -ForegroundColor Yellow
            Write-Host "  vercel --prod"
        }
    }
    default {
        Write-Host "Неверный выбор!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=== Следующие шаги ===" -ForegroundColor Green
Write-Host "1. Проверьте переменные: vercel env list"
Write-Host "2. Перезапустите deployment: vercel --prod"
Write-Host "3. Проверьте logs: vercel logs --follow"
