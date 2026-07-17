# Vercel Deployment Fix - Add DATABASE_URL

Write-Host "=== Vercel Database Configuration ===" -ForegroundColor Green
Write-Host ""

$DATABASE_URL = "postgresql://postgres:104adm1519ssv1963@db.alfbzziprncfwkgoghgs.supabase.co:5432/postgres"

Write-Host "Adding DATABASE_URL to Vercel..." -ForegroundColor Cyan
Write-Host "Database URL: postgresql://postgres:***@db.alfbzziprncfwkgoghgs.supabase.co:5432/postgres" -ForegroundColor Gray
Write-Host ""

# Step 1: Add environment variable
Write-Host "Step 1: Adding DATABASE_URL to production environment..." -ForegroundColor Yellow
vercel env add DATABASE_URL production

Write-Host ""
Write-Host "Step 2: Redeploying to production..." -ForegroundColor Yellow
vercel --prod

Write-Host ""
Write-Host "=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Check: https://ssvnauka.com/prescreening/" -ForegroundColor Cyan
