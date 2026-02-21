@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   تحديث GitHub (Vibe Coding Edition)
echo ========================================

:: التأكد من حالة المستودع
git status

:: إضافة الملفات
git add .
if errorlevel 1 (
    echo [خطأ] فشل git add
    pause
    exit /b 1
)

:: الـ Commit برسالة تلقائية
set "MSG=Update: %date% %time%"
git commit -m "%MSG%"

:: سحب التغييرات الجديدة الأول عشان نتفادى الـ Conflict
echo جاري سحب التحديثات من السيرفر...
git pull origin main

:: الرفع (تأكد لو الفرع عندك master غير main)
echo جاري الرفع إلى GitHub...
git push origin main

if errorlevel 1 (
    echo [خطأ] فشل الرفع. اتأكد من اسم الـ Branch أو الـ Permissions.
) else (
    echo تم الرفع بنجاح يا هندسة.
)

pause