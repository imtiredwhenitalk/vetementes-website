# 🛍️ VETEMENTES - Luxury E-Commerce Platform 2026

Повноцінний сучасний інтернет-магазин з React фронтендом та Node.js + PostgreSQL бекендом.

![Tech Stack](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?style=for-the-badge&logo=postgresql)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)

## 📋 Зміст

- [Особливості](#особливості)
- [Технології](#технології)
- [Швидкий старт](#швидкий-старт)
- [Структура проекту](#структура-проекту)
- [API Документація](#api-документація)
- [Розгортання](#розгортання)

## ✨ Особливості

### Frontend
- 🎨 Сучасний дизайн з Framer Motion анімаціями
- 🛒 Повнофункціональний кошик
- 🔍 Пошук та фільтрація продуктів
- 💳 Процес оформлення замовлення
- 👤 Автентифікація користувачів
- 📱 Повністю адаптивний дизайн
- 🌙 Темна тема з градієнтами
- ⚡ Оптимізована продуктивність

### Backend
- 🔐 JWT автентифікація
- 🗄️ PostgreSQL база даних
- 📊 RESTful API
- ✅ Валідація даних (Joi)
- 🛡️ Безпека (Helmet, CORS, Rate Limiting)
- 📝 TypeScript для type safety
- 🔄 Управління транзакціями
- 📧 Готовність до email інтеграції

## 🚀 Технології

### Frontend
- **React 18** - UI бібліотека
- **TypeScript** - Типізація
- **Vite** - Швидкий збірник
- **Tailwind CSS** - Стилізація
- **Framer Motion** - Анімації
- **React Router** - Маршрутизація

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - База даних
- **TypeScript** - Типізація
- **JWT** - Автентифікація
- **Bcrypt** - Хешування паролів
- **Joi** - Валідація

### DevOps
- **Docker** - Контейнеризація
- **Docker Compose** - Оркестрація
- **pgAdmin** - Управління БД
- **Redis** - Кешування (опціонально)

## 🏁 Швидкий старт

### Варіант 1: Docker (Рекомендовано)

```bash
# 1. Клонуйте репозиторій
git clone <repository-url>
cd web/market

# 2. Створіть .env файл
cp .env.example .env

# 3. Запустіть всі сервіси
docker-compose up -d

# 4. Запустіть міграції
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed
```

Готово! 🎉
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- pgAdmin: http://localhost:5050

### Варіант 2: Локальне встановлення

#### 1. PostgreSQL

Встановіть PostgreSQL та створіть БД:

```sql
CREATE DATABASE vetementes_db;
```

#### 2. Backend

```bash
cd backend

# Встановіть залежності
npm install

# Налаштуйте .env
cp .env.example .env
# Відредагуйте .env з вашими параметрами БД

# Запустіть міграції
npm run build
npm run db:migrate
npm run db:seed

# Запустіть сервер
npm run dev
```

Backend запуститься на `http://localhost:5000`

#### 3. Frontend

```bash
# В кореневій папці проекту
npm install

# Створіть .env
cp .env.example .env

# Запустіть dev сервер
npm run dev
```

Frontend запуститься на `http://localhost:5173`

## 📁 Структура проекту

```
market/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── database/          # БД конфігурація та міграції
│   │   │   ├── connection.ts
│   │   │   ├── schema.sql
│   │   │   ├── migrate.ts
│   │   │   └── seed.ts
│   │   ├── models/            # Моделі даних
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   └── Order.ts
│   │   ├── routes/            # API маршрути
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── users.ts
│   │   ├── middleware/        # Middleware
│   │   │   ├── auth.ts
│   │   │   └── validation.ts
│   │   └── server.ts          # Головний файл сервера
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── src/                       # Frontend
│   ├── components/           # React компоненти
│   ├── context/              # Context провайдери
│   │   ├── CartContext.tsx
│   │   └── AuthContext.tsx
│   ├── data/                 # Статичні дані
│   ├── services/             # API сервіси
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── docker-compose.yml        # Docker композиція
├── package.json
└── README.md
```

## 📡 API Документація

Детальна документація API доступна в [backend/README.md](backend/README.md)

### Основні endpoints:

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/verify

Products:
GET    /api/products
GET    /api/products/:id
POST   /api/products (Admin)
PUT    /api/products/:id (Admin)
DELETE /api/products/:id (Admin)

Orders:
POST   /api/orders
GET    /api/orders/:id
GET    /api/orders/user/:userId
PATCH  /api/orders/:id/status (Admin)

Users:
GET    /api/users/me
PUT    /api/users/me
```

## 🔑 Тестовий доступ

Після seed команди створюється адмін акаунт:

```
Email: admin@vetementes.com
Password: admin123
```

## 🛠️ Розробка

### Backend

```bash
cd backend
npm run dev     # Development сервер з hot reload
npm run build  # Збірка для production
npm start       # Production сервер
```

### Frontend

```bash
npm run dev     # Development сервер
npm run build  # Production збірка
npm run preview # Попередній перегляд prod збірки
```

## 🐳 Docker команди

```bash
# Запуск всіх сервісів
docker-compose up -d

# Перегляд логів
docker-compose logs -f backend

# Зупинка
docker-compose down

# Зупинка з видаленням volumes
docker-compose down -v

# Пересборка
docker-compose up -d --build
```

## 📊 База даних

### Міграції

```bash
# Запуск міграцій
npm run db:migrate

# Seed даних
npm run db:seed
```

### pgAdmin доступ

Коли використовується Docker Compose:
- URL: http://localhost:5050
- Email: admin@vetementes.com
- Password: admin123

Підключення до БД:
- Host: postgres
- Port: 5432
- Database: vetementes_db
- Username: postgres
- Password: (з вашого .env)

## 🔒 Безпека

- ✅ JWT токени з обмеженим терміном дії
- ✅ Паролі хешуються за допомогою bcrypt
- ✅ Rate limiting для API
- ✅ CORS налаштування
- ✅ Helmet для безпечних headers
- ✅ SQL injection захист
- ✅ XSS захист
- ✅ Валідація всіх вхідних даних

## 🚀 Розгортання на Production

### Backend

1. Налаштуйте production БД (AWS RDS, DigitalOcean, тощо)
2. Встановіть змінні середовища:
   - `NODE_ENV=production`
   - `DATABASE_URL` або окремі DB змінні
   - `JWT_SECRET` (надійний випадковий ключ)
   - `CORS_ORIGIN` (домен вашого frontend)

3. Розгорніть на Heroku, AWS, DigitalOcean або інший хостинг

### Frontend

```bash
# 1. Збудуйте проект
npm run build

# 2. Розгорніть dist/ папку на:
#    - Vercel
#    - Netlify
#    - AWS S3 + CloudFront
#    - DigitalOcean Spaces
```

Не забудьте встановити `VITE_API_URL` на ваш production API URL.

## 📝 Ліцензія

ISC

## 👥 Автори

VETEMENTES Development Team 2026

---

**Створено з ❤️ використовуючи сучасні технології**
