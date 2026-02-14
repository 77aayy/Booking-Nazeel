@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Starting server...
start "Server" cmd /k "npx --yes serve . -l 3000"

echo Waiting for server to start...
timeout /t 4 /nobreak >nul

echo Opening browser...
start "" "http://localhost:3000"

echo Done. Server is running in the other window.
