# VETEMENTES Backend API

Повноцінний бекенд для сучасного інтернет-магазину на 2026 рік з PostgreSQL, TypeScript, Express.

## 🚀 Технології

- **Node.js** + **TypeScript**
- **Express.js** - швидкий веб-фреймворк
- **PostgreSQL** - потужна реляційна база даних
- **JWT** - безпечна автентифікація
- **Bcrypt** - хешування паролів
- **Joi** - валідація даних
- **Helmet** - безпека headers
- **CORS** - крос-доменні запити
- **Rate Limiting** - захист від DDoS

## 📋 Функціонал

### Аутентифікація
- ✅ Реєстрація користувачів
- ✅ Логін з JWT токенами
- ✅ Верифікація email
- ✅ Відновлення паролю
- ✅ Ролевий доступ (Customer, Manager, Admin)

### Продукти
- ✅ CRUD операції для продуктів
- ✅ Варіанти (розміри, кольори)
- ✅ Багато зображень
- ✅ Категорії та підкатегорії
- ✅ Фільтрація та пошук
- ✅ Управління стоком

### Замовлення
- ✅ Створення замовлень
- ✅ Управління статусами
- ✅ Історія замовлень
- ✅ Tracking відправлень
- ✅ Інтеграція з платіжними системами (підготовка)

### Кошик
- ✅ Додавання/видалення товарів
- ✅ Оновлення кількості
- ✅ Збереження для незареєстрованих (session)
- ✅ Синхронізація для зареєстрованих

### Додатково
- ✅ Відгуки та рейтинги
- ✅ Список бажань
- ✅ Купони та знижки
- ✅ Розсилка новин
- ✅ Логування активності

## 🛠 Встановлення

### 1. В станівка залежностей

```bash
cd backend
npm install
```

### 2. Налаштування PostgreSQL

Встановіть PostgreSQL та створіть базу даних:

```sql
CREATE DATABASE vetementes_db;
```

### 3. Налаштування змінних середовища

Створіть файл `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

Відредагуйте `.env` файл:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vetementes_db
DB_USER=postgres
DB_PASSWORD=your_secure_password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 4. Міграція бази даних

```bash
npm run build
npm run db:migrate
```

### 5. Заповнення тестовими даними

```bash
npm run db:seed
```

Це створить:
- Адмін користувача (admin@vetementes.com / admin123)
- 5 категорій товарів
- 5 зразкових продуктів з варіантами

### 6. Запуск сервера

Режим розробки:
```bash
npm run dev
```

Продакшн режим:
```bash
npm run build
npm start
```

Сервер запуститься на `http://localhost:5000`

## 📡 API Endpoints

### Аутентифікація (`/api/auth`)

```
POST   /api/auth/register     - Реєстрація
POST   /api/auth/login        - Логін
GET    /api/auth/verify       - Перевірка токену
```

### Продукти (`/api/products`)

```
GET    /api/products          - Список продуктів
GET    /api/products/:id      - Деталі продукту
POST   /api/products          - Створити продукт (Admin)
PUT    /api/products/:id      - Оновити продукт (Admin)
DELETE /api/products/:id      - Видалити продукт (Admin)
```

**Фільтри:**
- `?category=uuid` - За категорією
- `?search=text` - Пошук
- `?featured=true` - Рекомендовані
- `?limit=20&offset=0` - Пагінація

### Замовлення (`/api/orders`)

```
POST   /api/orders                    - Створити замовлення
GET    /api/orders/:id                - Деталі замовлення
GET    /api/orders/number/:number     - За номером
GET    /api/orders/user/:userId       - Замовлення користувача
PATCH  /api/orders/:id/status         - Оновити статус (Admin)
PATCH  /api/orders/:id/tracking       - Додати трекінг (Admin)
```

### Користувачі (`/api/users`)

```
GET    /api/users/me          - Профіль поточного користувача
PUT    /api/users/me          - Оновити профіль
GET    /api/users             - Всі користувачі (Admin)
DELETE /api/users/:id         - Видалити (Admin)
```

## 🔒 Аутентифікація

Для захищених endpoints використовуйте Bearer Token:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 💼 Приклади використання

### Реєстрація

```javascript
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "Іван",
  "last_name": "Петренко"
}
```

### Логін

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

// Відповідь:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

### Отримання продуктів

```javascript
GET /api/products?featured=true&limit=10
```

### Створення замовлення

```javascript
POST /api/orders
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "customer_email": "user@example.com",
  "customer_phone": "+380501234567",
  "items": [
    {
      "product_id": "uuid",
      "variant_id": "uuid",
      "quantity": 2,
      "unit_price": 890
    }
  ],
  "shipping_address": {
    "full_name": "Іван Петренко",
    "phone": "+380501234567",
    "country": "Україна",
    "city": "Київ",
    "postal_code": "01001",
    "address_line1": "вул. Хрещатик, 1"
  },
  "shipping_cost": 0,
  "payment_method": "card"
}
```

## 🔐 Безпека

- ✅ Паролі хешуються за допомогою bcrypt
- ✅ JWT токени з обмеженим терміном дії
- ✅ Rate limiting для API endpoints
- ✅ Helmet для secure headers
- ✅ CORS для контролю доступу
- ✅ SQL injection захист (параметризовані запити)
- ✅ Валідація всіх входящих даних

## 📊 Структура бази даних

- `users` - Користувачі системи
- `addresses` - Адреси доставки/оплати
- `categories` - Категорії продуктів
- `products` - Основна інформація про продукти
- `product_images` - Зображення продуктів
- `product_variants` - Варіанти (розміри, кольори)
- `orders` - Замовлення
- `order_items` - Товари в замовленнях
- `carts` - Кошики
- `cart_items` - Товари в кошиках
- `wishlists` - Списки бажань
- `reviews` - Відгуки
- `coupons` - Промокоди
- `newsletter_subscribers` - Підписники
- `activity_logs` - Логи активності

## 🚀 Розгортання

### Production чеклист:

1. ✅ Змініть `JWT_SECRET` на безпечний ключ
2. ✅ Налаштуйте PostgreSQL для production
3. ✅ Увімкніть SSL для бази даних
4. ✅ Налаштуйте CORS для вашого домену
5. ✅ Додайте моніторинг (PM2, New Relic)
6. ✅ Налаштуйте резервні копії БД
7. ✅ Використовуйте HTTPS
8. ✅ Налаштуйте логування (Winston, Morgan)

## 📝 Ліцензія

ISC

## 👨‍💻 Автор

VETEMENTES Team 2026
