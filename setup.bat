@echo off
REM VETEMENTES Quick Setup Script for Windows
REM This script sets up the entire application

echo ========================================
echo VETEMENTES Setup Script
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    echo Visit: https://docs.docker.com/desktop/install/windows-install/
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker Compose is not installed.
    pause
    exit /b 1
)

echo [OK] Docker and Docker Compose are installed
echo.

REM Create .env files if they don't exist
if not exist .env (
    echo Creating .env file for frontend...
    copy .env.example .env
    echo [OK] Frontend .env created
) else (
    echo [WARNING] Frontend .env already exists, skipping
)

if not exist backend\.env (
    echo Creating .env file for backend...
    copy backend\.env.example backend\.env
    echo [OK] Backend .env created
    echo [WARNING] Please update backend\.env with your settings!
) else (
    echo [WARNING] Backend .env already exists, skipping
)

echo.
echo Starting Docker containers...
docker-compose up -d

echo.
echo Waiting for database to be ready...
timeout /t 10 /nobreak

echo.
echo Running database migrations...
docker-compose exec -T backend npm run db:migrate

echo.
echo Seeding database with sample data...
docker-compose exec -T backend npm run db:seed

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Application URLs:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:5000
echo    API Docs:  http://localhost:5000/health
echo    pgAdmin:   http://localhost:5050
echo.
echo Admin credentials:
echo    Email:    admin@vetementes.com
echo    Password: admin123
echo.
echo Next steps:
echo    1. Open http://localhost:5173 in your browser
echo    2. Use the admin credentials to login
echo    3. Check backend\README.md for API documentation
echo.
echo Useful commands:
echo    docker-compose logs -f backend   - View backend logs
echo    docker-compose logs -f postgres  - View database logs
echo    docker-compose down              - Stop all containers
echo    docker-compose restart backend   - Restart backend
echo.
echo Happy coding!
pause
