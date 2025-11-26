# URL Shortener Backend

A simple and clean URL Shortener backend built with Node.js, Express and MySQL.  
Users can register, log in, create short URLs and check click analytics.

---

## 🚀 Features

- User signup & login (JWT auth)
- Short URL generation using nanoid
- Click count tracking
- MySQL database (mysql2/promise)
- Input validation (Joi)
- Centralized error handling
- Modular folder structure (controllers, models, routes)

---

## 📁 Tech Stack

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- nanoid
- Joi

---

## ⚙️ Environment Setup

Create a `.env` file:

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=url_shortener

JWT_SECRET=
JWT_EXPIRES_IN=1d

BASE_URL=http://localhost:4000
```

---

## ▶️ Run Locally

```
npm install
npm run dev
```

---

## 📌 API Endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`

### URL

- POST `/api/url` (create short URL)
- GET `/:shortCode` (testing JSON)
- GET `/api/url/stats/:shortCode` (analytics)

---

## 📜 License

Open source project for learning purposes.
