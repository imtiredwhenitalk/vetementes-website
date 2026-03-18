# Навіщо кожен файл у репозиторії

Цей файл пояснює **для чого потрібен кожен файл/папка**, які потрапляють у Git.

> Примітка: `node_modules/`, `dist/`, `.env` та інші артефакти збірки **не комітяться** (див. `.gitignore`).

## Корінь проєкту (frontend)

- `.env.example` — приклад змінних середовища для фронтенду (Vite), без секретів.
- `.gitignore` — правила, які файли не додавати в Git (збірки, залежності, `.env`, логи).
- `Dockerfile.frontend` — Docker-збірка фронтенду (Vite build → статична роздача через nginx).
- `README.md` — короткий опис, як запустити/збілдити проєкт.
- `docker-compose.yml` — dev/prod-стек: Postgres + backend API + frontend + (опційно) Redis + pgAdmin.
- `index.html` — HTML-шаблон Vite (кореневий контейнер для React).
- `package.json` — залежності та скрипти фронтенду.
- `package-lock.json` — зафіксовані версії npm-залежностей (відтворювані інсталяції).
- `setup.bat` — швидкий сетап/запуск на Windows.
- `setup.sh` — швидкий сетап/запуск у shell (Git Bash/Linux/macOS).
- `tsconfig.json` — TypeScript-конфіг фронтенду.
- `vite-env.d.ts` — типи для Vite (`import.meta.env`).
- `vite.config.ts` — конфіг Vite (build/dev server/плагіни).

## Frontend source (`src/`)

- `src/main.tsx` — точка входу React (маунт в `#root`).
- `src/App.tsx` — головний shell: навігація між сторінками (home/checkout), анімації переходів.
- `src/index.css` — глобальні стилі + Tailwind базові директиви/теми.

### Компоненти (`src/components/`)

- `src/components/About.tsx` — секція “Про нас”.
- `src/components/AccountModal.tsx` — модалка акаунта/профілю.
- `src/components/AuthModal.tsx` — модалка логіну/реєстрації.
- `src/components/CartSidebar.tsx` — висувний сайдбар кошика.
- `src/components/Checkout.tsx` — сторінка оформлення замовлення (форма + підсумок справа).
- `src/components/Collections.tsx` — блок/сторінка колекцій.
- `src/components/CustomCursor.tsx` — кастомний курсор/hover-ефекти.
- `src/components/Footer.tsx` — футер (посилання/контакти/соцмережі), адаптивна сітка.
- `src/components/Hero.tsx` — головний hero-блок.
- `src/components/Loader.tsx` — loader/завантаження.
- `src/components/Marquee.tsx` — бігучий рядок/маркі.
- `src/components/Navbar.tsx` — верхня навігація.
- `src/components/Newsletter.tsx` — підписка на розсилку.
- `src/components/ProductCard.tsx` — картка товару в каталозі.
- `src/components/ProductModal.tsx` — модалка товару: фото, опис, колір/розмір, кількість, додати в кошик.
- `src/components/Products.tsx` — каталог товарів (грид, фільтри/категорії).
- `src/components/SmartSearch.tsx` — пошук по товарах.

### Контекст/стан (`src/context/`)

- `src/context/AuthContext.tsx` — глобальний стан авторизації.
- `src/context/CartContext.tsx` — глобальний стан кошика (додавання/видалення/сума).
- `src/context/LangContext.tsx` — стан мови/локалізації.

### Дані (`src/data/`)

- `src/data/products.ts` — статичний список товарів/мок дані каталогу.
- `src/data/translations.ts` — словник перекладів.

### API (`src/services/`)

- `src/services/api.ts` — клієнт для звернень до backend API (базовий URL, запити).

## Backend (`backend/`)

- `backend/.env.example` — приклад змінних середовища для бекенду (DB/JWT/CORS), без реальних секретів.
- `backend/.gitignore` — ігнор для бекенду (node_modules, dist, `.env`, логи).
- `backend/Dockerfile` — Docker-збірка бекенду (Node API).
- `backend/README.md` — як підняти бекенд локально.
- `backend/package.json` — залежності та скрипти бекенду.
- `backend/package-lock.json` — lockfile для бекенду.
- `backend/tsconfig.json` — TypeScript-конфіг бекенду.

### Backend source (`backend/src/`)

- `backend/src/server.ts` — entrypoint API сервера (роути, middleware, старт).

#### Роути (`backend/src/routes/`)

- `backend/src/routes/auth.ts` — логін/реєстрація/JWT.
- `backend/src/routes/orders.ts` — створення/перегляд замовлень.
- `backend/src/routes/products.ts` — API для товарів.
- `backend/src/routes/users.ts` — API для користувачів.

#### Middleware (`backend/src/middleware/`)

- `backend/src/middleware/auth.ts` — перевірка токена/доступів.
- `backend/src/middleware/validation.ts` — валідація запитів.

#### Моделі (`backend/src/models/`)

- `backend/src/models/Order.ts` — модель/типи замовлення.
- `backend/src/models/Product.ts` — модель/типи товару.
- `backend/src/models/User.ts` — модель/типи користувача.

#### База даних (`backend/src/database/`)

- `backend/src/database/connection.ts` — підключення до Postgres + fallback на mock у dev.
- `backend/src/database/mock.ts` — мок-база для розробки без Postgres.
- `backend/src/database/schema.sql` — SQL-схема (ініціалізація контейнера Postgres).
- `backend/src/database/migrate.ts` — міграції/створення структури (якщо використовується).
- `backend/src/database/seed.ts` — наповнення тестовими даними.
