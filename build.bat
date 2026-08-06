@echo off
REM Hero Studios website — build static site into dist/
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call pnpm install
)
echo Building...
node node_modules/astro/astro.js build
echo.
echo Build complete. Output: dist/
pause
