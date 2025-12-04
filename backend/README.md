# Backend - Developer Directory API
# Backend - Developer Directory API

Node.js + Express backend for the Developer Directory application.

Features
--------
- JWT-based authentication (signup / login)
- Password hashing using `bcryptjs`
- Protected CRUD endpoints for developers
- Photo uploads served from `/uploads` (uses `multer`)
- Input validation with `Joi`
- File-based storage (`developers.json`, `users.json`) for demo purposes

Environment variables
---------------------
- `JWT_SECRET` (required) — secret for signing tokens
- `PORT` (optional) — default `5000`
- `CORS_ORIGIN` (optional) — frontend origin (e.g. `https://your-site.vercel.app`). If not set the server allows all origins (development mode).

Local development
-----------------
1. Install dependencies

```powershell
cd developer-directory\backend
npm install
```

2. Create a `.env` file in the backend folder:

```
JWT_SECRET=your_secret_here
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

3. Run in development

```powershell
npm run dev
```

Production / Deployment (Render example)
--------------------------------------
1. Push your branch to GitHub.
2. Create a new Web Service on Render and connect your GitHub repository.
3. Set the root directory to `developer-directory/backend` (if you deploy the monorepo branch).
4. Add environment variables in Render: `JWT_SECRET`, and optionally `CORS_ORIGIN` (set to your frontend URL).
5. Start command: `npm start` (the `start` script runs `node server.js`).

Railway / Other hosts
---------------------
- Railway: create a new Service, point to the backend folder, and add env vars.
- Vercel (serverless) is possible but requires refactor; Render or Railway recommended for full Node server with uploads.

API Quick Reference
-------------------
- POST `/auth/signup` — { name, email, password }
- POST `/auth/login`  — { email, password }
- GET `/developers`   — requires `Authorization: Bearer <token>`. Supports `q`, `role`, `sort`, `page`, `limit`.
- POST `/developers`  — create developer
- PUT `/developers/:id` — update developer
- DELETE `/developers/:id` — delete developer
- GET `/developers/:id` — get single developer
- POST `/developers/:id/photo` — upload photo (multipart form-data; field `photo`)

Notes
-----
- This demo uses JSON files for storage — move to a proper DB (MongoDB Atlas or PostgreSQL) for production.
- Secure `JWT_SECRET` and set a specific `CORS_ORIGIN` in production.
