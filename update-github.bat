@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo     Booking Nazeel - GitHub Update Script
echo ============================================
echo.

:: Step 1: Stage all changes
echo [1/3] Adding all changes...
git add -A

:: Step 2: Commit
set "MSG=Update: %date% %time%"
echo [2/3] Committing changes...
git commit -m "%MSG%"

if %errorlevel% NEQ 0 (
    echo.
    echo [!] مفيش تعديلات جديدة... هيتم رفع آخر commit موجود.
    echo.
)

:: Step 3: Force push to ensure local version overwrites remote
echo [3/3] Pushing to GitHub (force)...
git push --force https://github.com/77aayy/Booking-Nazeel.git main

if %errorlevel% NEQ 0 (
    echo.
    echo [X] فشل الرفع! تأكد من:
    echo     - الاتصال بالإنترنت
    echo     - إن الـ GitHub credentials شغالة
    echo     - جرب: git config --global credential.helper manager
) else (
    echo.
    echo [OK] تم رفع النسخة المحلية بنجاح على GitHub!
    echo     https://github.com/77aayy/Booking-Nazeel
)

echo.
pause