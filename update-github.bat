@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo [1/2] Adding and Committing changes...
git add .
set "MSG=Update: %date% %time%"
git commit -m "%MSG%"

:: التأكد إن فيه تعديلات اتعملت
if errorlevel 1 (
    echo.
    echo [!] مفيش أي تعديلات جديدة للرفع.
    pause
    exit /b
)

echo [2/2] Pushing to GitHub (Branch: main)...
:: السطر ده دلوقتي هيرفع لـ main وأنت مطمن
git push origin main

if errorlevel 1 (
    echo.
    echo [X] فشل الرفع! اتأكد إنك عملت الخطوات اللي قولتلك عليها في التيرمينال.
) else (
    echo.
    echo [OK] ارفعت بنجاح والـ GitHub Pages هتحدث دلوقتي.
)

pause