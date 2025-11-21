@echo off
echo ========================================
echo Energy Platform Installation
echo ========================================
echo.

cd /d %~dp0

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo Installation failed! Please check Node.js and npm.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation completed!
echo.
echo Run the development server:
echo npm run dev
echo ========================================
echo.
pause
