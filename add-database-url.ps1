# Add DATABASE_URL to Vercel using API
# This script bypasses interactive prompts

$ProjectId = "gastric-cancer-platform-2026"
$TeamId = "serg2206s-projects"
$EnvironmentType = "production"
$VariableName = "DATABASE_URL"
$VariableValue = "postgresql://postgres:104adm1519ssv1963@db.alfbzziprncfwkgoghgs.supabase.co:5432/postgres"

Write-Host "=== Adding DATABASE_URL via Vercel API ===" -ForegroundColor Green
Write-Host ""

# Get Vercel token from .vercel folder
$vercelDir = "$env:USERPROFILE\.vercel"
$authFile = "$vercelDir\auth.json"

if (-not (Test-Path $authFile)) {
    Write-Host "ERROR: Vercel auth not found at $authFile" -ForegroundColor Red
    Write-Host "Make sure you are logged in: vercel login" -ForegroundColor Yellow
    exit 1
}

$authJson = Get-Content $authFile | ConvertFrom-Json
$Token = $authJson.token

if (-not $Token) {
    Write-Host "ERROR: Could not read Vercel token" -ForegroundColor Red
    exit 1
}

Write-Host "Token found ✓" -ForegroundColor Green
Write-Host ""

# First, delete existing variable if it exists
Write-Host "Removing old DATABASE_URL if exists..." -ForegroundColor Cyan
$deleteUrl = "https://api.vercel.com/v9/projects/$ProjectId/env?teamId=$TeamId&key=$VariableName&target=$EnvironmentType"
$deleteHeaders = @{
    "Authorization" = "Bearer $Token"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-WebRequest -Uri $deleteUrl -Method DELETE -Headers $deleteHeaders -ErrorAction SilentlyContinue
    Write-Host "Old variable removed ✓" -ForegroundColor Green
} catch {
    Write-Host "Variable didn't exist (OK)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Adding new DATABASE_URL as production environment variable..." -ForegroundColor Cyan

# Add new environment variable
$addUrl = "https://api.vercel.com/v9/projects/$ProjectId/env?teamId=$TeamId"
$body = @{
    key = $VariableName
    value = $VariableValue
    target = @($EnvironmentType)
    type = "encrypted"
} | ConvertTo-Json

$addHeaders = @{
    "Authorization" = "Bearer $Token"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-WebRequest -Uri $addUrl -Method POST -Headers $addHeaders -Body $body
    $result = $response.Content | ConvertFrom-Json

    Write-Host "✓ DATABASE_URL added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Variable Details:" -ForegroundColor Cyan
    Write-Host "  Key: $($result.key)" -ForegroundColor Gray
    Write-Host "  Target: $($result.target)" -ForegroundColor Gray
    Write-Host "  Type: $($result.type)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Error adding variable:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Now deploying to production ===" -ForegroundColor Green
Write-Host ""

# Deploy to production
& vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓✓✓ DEPLOYMENT SUCCESSFUL! ✓✓✓" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your site is being updated at: https://ssvnauka.com" -ForegroundColor Cyan
    Write-Host "Check: https://ssvnauka.com/prescreening/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Deployment details available at:" -ForegroundColor Gray
    Write-Host "  https://vercel.com/serg2206-projects/$ProjectId" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "✗ Deployment had issues. Check logs:" -ForegroundColor Red
    Write-Host "  vercel logs --follow" -ForegroundColor Gray
}
