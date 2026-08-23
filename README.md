# Sathuryan Ezhilarasi — Portfolio

Professional portfolio for a frontend engineer based in Dubai. Built from the latest CV, with a Next.js / React frontend and a Laravel + MongoDB API for contact messages.

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Laravel 12 API
- **Database:** MongoDB (`messages` collection), with a local JSON fallback if Mongo is offline

## Run locally

Install [Node.js](https://nodejs.org/), PHP 8.2+, Composer, and optionally [MongoDB](https://www.mongodb.com/try/download/community) or Atlas.

### 1. API

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan serve
```

The API listens on `http://127.0.0.1:8000`.

- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/contact`

To store messages in MongoDB, set `MONGODB_URI` and `MONGODB_DATABASE` in `backend/.env`, and enable the PHP `mongodb` extension.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project layout

```
frontend/   Next.js site
backend/    Laravel API
```
