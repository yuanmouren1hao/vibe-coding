@echo off
echo ========================================
echo 新能源虚拟电厂管理平台
echo 启动开发服务器...
echo ========================================
echo.

cd /d %~dp0

if not exist "node_modules\" (
    echo 检测到未安装依赖，正在安装...
    call npm install
    if %errorlevel% neq 0 (
        echo 安装失败！
        pause
        exit /b 1
    )
)

echo 启动开发服务器...
call npm run dev

pause
