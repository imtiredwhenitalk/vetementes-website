#!/bin/bash

# VETEMENTES Quick Setup Script
# This script sets up the entire application

echo "🚀 VETEMENTES Setup Script"
echo "=========================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"
echo ""

# Create .env files if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file for frontend..."
    cp .env.example .env
    echo -e "${GREEN}✓ Frontend .env created${NC}"
else
    echo -e "${YELLOW}⚠ Frontend .env already exists, skipping${NC}"
fi

if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file for backend..."
    cp backend/.env.example backend/.env
    
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    DB_PASSWORD=$(openssl rand -base64 16)
    
    # Update backend .env with generated values
    sed -i "s/your_super_secret_jwt_key_change_this_in_production/$JWT_SECRET/g" backend/.env
    sed -i "s/your_password/$DB_PASSWORD/g" backend/.env
    
    echo -e "${GREEN}✓ Backend .env created with secure random keys${NC}"
else
    echo -e "${YELLOW}⚠ Backend .env already exists, skipping${NC}"
fi

echo ""
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for database to be ready..."
sleep 10

echo ""
echo "📊 Running database migrations..."
docker-compose exec -T backend npm run db:migrate

echo ""
echo "🌱 Seeding database with sample data..."
docker-compose exec -T backend npm run db:seed

echo ""
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:5000"
echo "   API Docs:  http://localhost:5000/health"
echo "   pgAdmin:   http://localhost:5050"
echo ""
echo "🔑 Admin credentials:"
echo "   Email:    admin@vetementes.com"
echo "   Password: admin123"
echo ""
echo "📝 Next steps:"
echo "   1. Open http://localhost:5173 in your browser"
echo "   2. Use the admin credentials to login"
echo "   3. Check backend/README.md for API documentation"
echo ""
echo "🛠 Useful commands:"
echo "   docker-compose logs -f backend   - View backend logs"
echo "   docker-compose logs -f postgres  - View database logs"
echo "   docker-compose down              - Stop all containers"
echo "   docker-compose restart backend   - Restart backend"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
