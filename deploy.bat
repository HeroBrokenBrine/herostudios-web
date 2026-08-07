@echo off
REM Hero Studios — deploy dist/ to Cloudflare Pages.
REM Requirements: a Cloudflare API token with Cloudflare Pages:Edit permission.
REM   Put the token in .cf-token (gitignored), the account id in .cf-account,
REM   or set CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID env vars.
cd /d "%~dp0"

if not exist dist (
  echo Building site first...
  call node node_modules/astro/astro.js build
  if errorlevel 1 goto :fail
)

if exist ".cf-token" set /p CLOUDFLARE_API_TOKEN=<.cf-token
if exist ".cf-account" set /p CLOUDFLARE_ACCOUNT_ID=<.cf-account

if "%CLOUDFLARE_API_TOKEN%"=="" (
  echo [ERROR] Missing CLOUDFLARE_API_TOKEN. Create .cf-token or set the env var.
  goto :fail
)
if "%CLOUDFLARE_ACCOUNT_ID%"=="" (
  echo [ERROR] Missing CLOUDFLARE_ACCOUNT_ID. Create .cf-account or set the env var.
  goto :fail
)

echo Deploying to Cloudflare Pages...
call npx -y wrangler pages deploy dist --project-name herostudios-web --branch main --commit-dirty=true
if errorlevel 1 goto :fail

echo.
echo Deploy complete.
pause
exit /b 0

:fail
echo.
echo Deploy failed.
pause
exit /b 1
