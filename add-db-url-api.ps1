# Add DATABASE_URL using Vercel API with curl
# Simple script without syntax errors

$ProjectId = "gastric-cancer-platform-2026"
$VariableValue = "postgresql://postgres:104adm1519ssv1963@db.alfbzziprncfwkgoghgs.supabase.co:5432/postgres"

Write-Host "Adding DATABASE_URL to Vercel..." -ForegroundColor Green
Write-Host ""

# Use curl to delete old variable
Write-Host "Removing old DATABASE_URL..." -ForegroundColor Yellow
curl -X DELETE "https://api.vercel.com/v9/projects/$ProjectId/env?teamId=serg2206s-projects&key=DATABASE_URL&target=production" `
  -H "Authorization: Bearer $env:VERCEL_TOKEN"

Write-Host ""
Write-Host "Adding new DATABASE_URL..." -ForegroundColor Cyan

# Create JSON body
$body = @"
{
  "key": "DATABASE_URL",
  "value": "$VariableValue",
  "target": ["production"],
  "type": "encrypted"
}
"@

# Use curl to add variable
curl -X POST "https://api.vercel.com/v9/projects/$ProjectId/env?teamId=serg2206s-projects" `
  -H "Authorization: Bearer $env:VERCEL_TOKEN" `
  -H "Content-Type: application/json" `
  -d $body

Write-Host ""
Write-Host "✓ Done! Now deploying..." -ForegroundColor Green
Write-Host ""

vercel --prod
