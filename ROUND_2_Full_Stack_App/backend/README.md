# Developer Directory Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example` and fill in:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. Run development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Developers
- `GET /api/developers` - Get all developers (protected)
  - Query: `search`, `role`, `sortBy`, `page`, `limit`
- `GET /api/developers/:id` - Get single developer (protected)
- `POST /api/developers` - Create developer (protected)
- `PUT /api/developers/:id` - Update developer (protected)
- `DELETE /api/developers/:id` - Delete developer (protected)
- `GET /api/developers/analytics` - Get analytics (public)
