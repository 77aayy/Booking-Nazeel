@echo off
chcp 65001 >nul
cd /d "%~dp0"

:: إضافة كل التعديلات اللي عملتها
git add . 

:: الـ Commit بالتوقيت الحالي عشان تتابع شغلك
set "MSG=Update: %date% %time%" 
git commit -m "%MSG%" 

:: الرفع مباشرة للـ GitHub (تأكد إن الفرع main)
git push origin main 

echo.
echo عاش يا هندسة.. التعديلات ارفعت.
pause [cite: 4]