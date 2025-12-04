# Developer Directory - Full Stack Application (ROUND 2)

A production-ready full-stack application for managing and discovering developers with authentication, CRUD operations, search, filtering, and sorting capabilities.

## 📋 Features Implemented

### ✅ Authentication (Mandatory)
- JWT-based login and signup
- Secure password hashing with bcryptjs
- Protected routes and API endpoints
- Token-based authorization

### ✅ Developer Profile Page (Mandatory)
- Dedicated profile page for each developer
- Display: Name, Role, Tech Stack (as tags), Experience, Description, Joining Date
- Optional photo upload support
- Responsive design

### ✅ Enhanced Developer Directory (Mandatory)
- **Search**: By name or tech stack
- **Filters**: By developer role (Frontend/Backend/Full-Stack)
- **Sorting**: By experience (ascending/descending)
- **Pagination**: 10 developers per page with navigation

### ✅ CRUD Improvements (Mandatory)
- Backend: GET, POST, PUT, DELETE endpoints with auth middleware
- Frontend: Add, Edit, Delete developers with confirmation prompts
- Input validation using Joi on backend

### ✅ UI/UX Enhancements (Mandatory)
- Toast notifications for success/error messages
- Loading indicators for API calls
- Fully responsive Tailwind CSS design
- Clean, modern interface
- Error handling and fallback states

### ✅ Bonus Features
- Developer analytics endpoint (counts by role, popular tech stacks)
- Clean code architecture with separation of concerns

## 🛠 Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcryptjs
- **Validation**: Joi
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: Lucide React

## 📂 Project Structure

```
ROUND_2_Full_Stack_App/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Developer.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── developerController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── developerRoutes.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── validateRequest.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── Loading.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── DeveloperDirectory.js
    │   │   ├── DeveloperProfile.js
    │   │   └── DeveloperForm.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── toastService.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    └── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/developer-directory
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRY=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. **Run development server**
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```
REACT_APP_API_URL=http://localhost:5000/api
```

5. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `GET /api/auth/profile` - Get user profile (Protected)

### Developers
- `GET /api/developers` - Get all developers (Protected)
  - Query: `search`, `role`, `sortBy`, `page`, `limit`
- `GET /api/developers/:id` - Get single developer (Protected)
- `POST /api/developers` - Create developer (Protected)
- `PUT /api/developers/:id` - Update developer (Protected)
- `DELETE /api/developers/:id` - Delete developer (Protected)
- `GET /api/developers/analytics` - Get analytics (Public)

## 🔐 Authentication Flow

1. User signs up → Password hashed with bcryptjs → User stored in MongoDB
2. User logs in → Password verified → JWT token generated
3. Token stored in localStorage on frontend
4. All API requests include token in Authorization header
5. Backend validates token before processing request

## 🧪 Testing the Application

### Sample Test Data for Login
```
Email: test@example.com
Password: password123
```

### Test API with cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create Developer (requires token):**
```bash
curl -X POST http://localhost:5000/api/developers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Developer",
    "email":"jane@example.com",
    "role":"Full-Stack",
    "techStack":["React","Node.js","MongoDB"],
    "experience":5,
    "description":"Full-stack developer with 5 years of experience",
    "joiningDate":"2024-01-01"
  }'
```

## 📱 Key Features Walkthrough

### User Authentication
- Sign up with name, email, password
- Passwords are securely hashed
- Login with email and password
- JWT tokens stored in localStorage

### Developer Directory
- View all developers (paginated, 10 per page)
- Search developers by name or tech stack (real-time)
- Filter by role (Frontend/Backend/Full-Stack)
- Sort by experience (ascending/descending)
- Pagination controls at bottom

### Developer Profile
- Click "View Profile" to see complete details
- View all information including tech stack as tags
- Edit or delete from profile page

### Add/Edit Developer
- Form validation on frontend and backend
- Tech stack added as tags
- Can upload photo URL
- Character limit on description (10-1000 chars)

## 🚢 Deployment Guide

### Deploy Backend to Render

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create Render account** at render.com

3. **Connect GitHub repository**
   - Dashboard → New → Web Service
   - Connect your GitHub account
   - Select the repository

4. **Configure environment variables in Render**
   - Settings → Environment
   - Add all variables from `.env`:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `JWT_EXPIRY`
     - `NODE_ENV=production`
     - `FRONTEND_URL=https://your-frontend-domain.com`

5. **Set build and start commands**
   - Build: Leave empty (npm install runs automatically)
   - Start: `node server.js`

6. **Deploy**
   - Render will automatically deploy on push to main

### Deploy Frontend to Vercel

1. **Push code to GitHub** (if not already done)

2. **Create Vercel account** at vercel.com

3. **Connect GitHub repository**
   - New Project → Import Git Repository
   - Select your frontend repository

4. **Configure environment variables**
   - Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`

5. **Configure build settings**
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

6. **Deploy**
   - Vercel will automatically deploy on push to main

### Verify Deployment

1. **Test API connectivity**
   - Try signup/login with your deployed frontend
   - Check browser DevTools Network tab for API calls

2. **Test CORS**
   - Ensure backend allows requests from frontend domain
   - Check backend `.env` has correct `FRONTEND_URL`

3. **Test all features**
   - Login/Signup
   - Create, Read, Update, Delete developers
   - Search, Filter, Sort
   - Pagination

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure `MONGODB_URI` is set in `.env`

### "Invalid token" error
- Clear localStorage and login again
- Check token not expired (JWT_EXPIRY)
- Verify JWT_SECRET is same on backend

### CORS errors
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS middleware is configured in server.js
- Test API directly with cURL/Postman

### Deployment fails
- Check build logs for errors
- Verify all environment variables are set
- Ensure code is pushed to GitHub
- Check Node version compatibility

## 📧 Submission Checklist

- [ ] Hosted frontend URL (Vercel/Netlify)
- [ ] Hosted backend API URL (Render/Railway)
- [ ] GitHub repository links
- [ ] README with setup and architecture overview
- [ ] Test login credentials in README
- [ ] All features working end-to-end
- [ ] Environment variables properly configured
- [ ] CORS enabled and tested
- [ ] Responsive design verified
- [ ] Email submitted to k12345@talrn.com with CC to intern@talrn.com

## 📝 Additional Notes

- All routes except `/api/auth/signup`, `/api/auth/login`, and `/api/developers/analytics` require authentication
- Developers can only edit/delete their own entries (owned by `createdBy` field)
- Tech stack is stored as an array for flexible querying
- Pagination starts at page 1
- Search is case-insensitive
- Photo URL must be a valid URL string

## 🤝 Support

For issues or questions, check the console logs and DevTools Network tab for debugging information.

---

**Status**: Production Ready ✅  
**Last Updated**: December 2024
