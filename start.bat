@echo off
REM Hero Studios website — preview the built site at http://localhost:4321
cd /d "%~dp0"
if not exist dist call build.bat
echo Previewing at http://localhost:4321  (press Ctrl+C to stop)
node node_modules/astro/astro.js preview --port 4321
