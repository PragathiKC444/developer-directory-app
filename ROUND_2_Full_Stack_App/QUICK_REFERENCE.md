# ROUND 2 - Quick Reference Guide

## 🎯 What You Have Built

A complete production-ready full-stack application with:
- ✅ User authentication (JWT + Password hashing)
- ✅ Developer directory with CRUD operations
- ✅ Search, Filter, Sort, and Pagination
- ✅ Profile pages for each developer
- ✅ Responsive UI with Tailwind CSS
- ✅ Toast notifications and loading indicators

---

## 📂 Project Files Overview

### Backend Structure
```
backend/
├── server.js              → Main Express server
├── models/
│   ├── User.js           → User schema with password hashing
│   └── Developer.js      → Developer schema with validation
├── controllers/
│   ├── authController.js → Signup, Login, Profile logic
│   └── developerController.js → CRUD, Search, Filter, Sort
├── routes/
│   ├── authRoutes.js     → Auth endpoints
│   └── developerRoutes.js → Developer endpoints
├── middleware/
│   ├── authenticate.js   → JWT verification
│   ├── validateRequest.js → Request validation
│   └── errorHandler.js   → Error handling
├── tests/                → Unit tests
├── package.json          → Dependencies
├── .env.example          → Environment template
└── README.md             → Backend documentation
```

### Frontend Structure
```
frontend/
├── src/
│   ├── App.js                    → Main app with routing
│   ├── pages/
│   │   ├── Login.js             → Login page
│   │   ├── Signup.js            → Signup page
│   │   ├── DeveloperDirectory.js → Directory with search/filter
│   │   ├── DeveloperProfile.js  → Individual profile page
│   │   └── DeveloperForm.js     → Add/Edit developer form
│   ├── components/
│   │   ├── Navbar.js            → Navigation bar
│   │   └── Loading.js           → Loading spinners
│   ├── context/
│   │   └── AuthContext.js       → Auth state management
│   ├── services/
│   │   ├── api.js               → API calls with axios
│   │   └── toastService.js      → Notification service
│   └── index.css                → Global styles
├── public/index.html            → HTML entry point
├── package.json                 → Dependencies
├── tailwind.config.js           → Tailwind configuration
├── postcss.config.js            → PostCSS configuration
├── .env.example                 → Environment template
└── README.md                    → Frontend documentation
```

---

## 🚀 Running Locally (Development)

### Terminal 1 - Backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with MongoDB URI
npm run dev
# Should see: ✓ Server running on port 5000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
cp .env.example .env
npm start
# Should open http://localhost:3000 automatically
```

### Test Account:
```
Email: test@example.com
Password: password123
```

---

## 🔑 Key Features Explained

### 1. Authentication Flow
```
User inputs email/password
        ↓
Backend validates and hashes password
        ↓
JWT token generated (valid for 7 days)
        ↓
Token stored in browser localStorage
        ↓
All API requests include token in header
        ↓
Backend validates token before processing
```

### 2. Search & Filter
```
User types in search box → Frontend sends query to API
API searches name and techStack fields (case-insensitive)
        ↓
Results filtered by selected role (if any)
        ↓
Results sorted by selected option
        ↓
Results paginated (10 per page)
```

### 3. CRUD Operations
- **Create**: `/developers` POST endpoint (protected)
- **Read**: `/developers` GET endpoint (with filters/search/sort)
- **Update**: `/developers/:id` PUT endpoint (owner only)
- **Delete**: `/developers/:id` DELETE endpoint (owner only)

---

## 📱 URL Mapping

### Frontend Routes
- `/login` → Login page
- `/signup` → Signup page
- `/` → Developer directory (protected)
- `/developer/:id` → Developer profile (protected)
- `/add-developer` → Add form (protected)
- `/edit-developer/:id` → Edit form (protected)

### API Endpoints
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/profile (protected)

GET    /api/developers (protected, has search/filter)
GET    /api/developers/:id (protected)
POST   /api/developers (protected)
PUT    /api/developers/:id (protected)
DELETE /api/developers/:id (protected)
GET    /api/developers/analytics
```

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Example | Purpose |
|----------|---------|---------|
| PORT | 5000 | Server port |
| MONGODB_URI | mongodb+srv://... | Database connection |
| JWT_SECRET | your-secret-key | Token encryption key |
| JWT_EXPIRY | 7d | Token expiration time |
| NODE_ENV | production | Environment (dev/prod) |
| FRONTEND_URL | https://... | Frontend domain for CORS |

### Frontend (.env)
| Variable | Example | Purpose |
|----------|---------|---------|
| REACT_APP_API_URL | http://localhost:5000/api | Backend API base URL |

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Developer Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  role: String (Frontend/Backend/Full-Stack),
  techStack: Array of Strings,
  experience: Number (0-70),
  description: String (10-1000 chars),
  joiningDate: Date,
  photo: String (URL, optional),
  createdBy: ObjectId (ref to User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing Endpoints with cURL

### Signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
# Returns: {"token":"jwt_token_here",...}
```

### Create Developer (replace TOKEN):
```bash
curl -X POST http://localhost:5000/api/developers \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Developer",
    "email":"jane@example.com",
    "role":"Full-Stack",
    "techStack":["React","Node.js"],
    "experience":5,
    "description":"Full-stack developer"
  }'
```

### Get All Developers:
```bash
curl http://localhost:5000/api/developers \
  -H "Authorization: Bearer TOKEN"
```

### Search Developers:
```bash
curl "http://localhost:5000/api/developers?search=React" \
  -H "Authorization: Bearer TOKEN"
```

---

## 🚢 Deployment Checklist

- [ ] Backend code pushed to GitHub
- [ ] Frontend code pushed to GitHub
- [ ] Created Render account and deployed backend
- [ ] Created Vercel account and deployed frontend
- [ ] Backend URL noted (e.g., https://xyz.onrender.com)
- [ ] Frontend URL noted (e.g., https://abc.vercel.app)
- [ ] Updated backend .env with FRONTEND_URL
- [ ] Updated frontend .env with REACT_APP_API_URL
- [ ] Tested signup/login on deployed site
- [ ] Tested CRUD operations on deployed site
- [ ] All features working end-to-end

---

## 🐛 Debug Tips

### Check Backend Logs:
```bash
npm run dev   # Watch logs in terminal
```

### Check Frontend Errors:
```
Browser → F12 → Console tab
Look for red error messages
Check Network tab to see API responses
```

### Test API Health:
```bash
curl http://localhost:5000/api/health
```

### Check MongoDB Connection:
```bash
# In backend server.js output:
✓ MongoDB connected    # Good
✗ MongoDB connection error    # Bad - check URI
```

### Clear Browser Cache:
```
DevTools → Application → Local Storage
Delete all entries and logout
Then try signup again
```

---

## 📧 Submission Files Needed

1. **Frontend URL** - Vercel deployment
2. **Backend API URL** - Render deployment
3. **GitHub Frontend Link** - Your repository
4. **GitHub Backend Link** - Your repository
5. **README.md** - Already provided in project

---

## 🎓 Architecture Overview

### Frontend (React)
- **React Router** - Page navigation
- **Context API** - Auth state management
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

### Backend (Node.js/Express)
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation

### Data Flow
```
User (Browser)
     ↓
React Frontend (React Router, Context)
     ↓
Axios HTTP Request
     ↓
Express Backend (Routes, Controllers)
     ↓
Middleware (Auth, Validation)
     ↓
MongoDB (Store/Retrieve Data)
```

---

## 💡 Tips for Success

1. **Before deployment**: Test everything locally
2. **Environment variables**: Keep them secure, never commit `.env`
3. **Error messages**: Read them carefully, they help debug
4. **CORS issues**: Usually fixed by correct `FRONTEND_URL`
5. **Token expiry**: Users must re-login after 7 days
6. **Pagination**: Page 1 shows first 10 developers
7. **Search**: Case-insensitive across name and tech stack
8. **Delete**: Shows confirmation dialog, cannot be undone
9. **Edit**: Only works for developers you created

---

## 📞 Getting Help

If stuck:
1. Check the error message in console
2. Review the README.md files
3. Check DEPLOYMENT_GUIDE.md
4. Look at test files for API examples
5. Review the code comments
6. Check browser DevTools Network tab
7. Test API directly with cURL

---

## ✨ Bonus Features Implemented

- Analytics endpoint (developer counts by role, popular tech stacks)
- Password visibility toggle on login/signup
- Responsive mobile design
- Confirmation dialogs for destructive actions
- Input validation (frontend and backend)
- Loading indicators for all API calls
- Error handling with user-friendly messages

---

**Good luck with your internship! You've built a complete full-stack application! 🎉**
