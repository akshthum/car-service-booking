@echo off
echo Setting up Car Service Booking System...
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo Next steps:
echo 1. Set up PostgreSQL database using backend/database.sql
echo 2. Configure backend/.env with your database credentials
echo 3. Start backend: cd backend && npm run dev
echo 4. Start frontend: cd frontend && ng serve
echo.
pause