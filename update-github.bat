@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   تحديث GitHub
echo ========================================
echo.

git add .
if errorlevel 1 (
    echo [خطأ] فشل git add
    pause
    exit /b 1
)

git status
echo.

set "MSG=تحديث المشروع %date% %time%"
git commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo لا توجد تغييرات جديدة للرفع.
) else (
    echo.
    echo جاري الرفع إلى GitHub...
    git push origin master
    if errorlevel 1 (
        echo [خطأ] فشل git push
    ) else (
        echo تم الرفع بنجاح.
    )
)

echo.
pause
