# Setup Instructions

## Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account (free tier available)
- Git installed
- GitHub account
- Text editor (VS Code recommended)

---

## Step 1: Clone or Download Project

```bash
# If cloning from GitHub
git clone https://github.com/your-username/developer-directory.git
cd developer-directory
```

---

## Step 2: Setup MongoDB Atlas

### Create Free MongoDB Database:
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Create account or login
4. Create a new cluster (free tier)
5. In Cluster → "Connect"
6. Choose "Connect your application"
7. Copy connection string and note your username/password
8. Format: `mongodb+srv://username:password@cluster.mongodb.net/developer-directory`

---

## Step 3: Setup Backend

### Navigate and Install:
```bash
cd backend
npm install
```

### Create .env file:
```bash
cp .env.example .env
```

### Edit .env with your values:
```
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/developer-directory
JWT_SECRET=your-very-secure-secret-key-at-least-32-characters-long
JWT_EXPIRY=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Test Backend:
```bash
npm run dev
```

Should see: `✓ Server running on port 5000` and `✓ MongoDB connected`

---

## Step 4: Setup Frontend

### In a new terminal, navigate and install:
```bash
cd frontend
npm install
```

### Create .env file:
```bash
cp .env.example .env
```

### Edit .env:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend:
```bash
npm start
```

Should automatically open `http://localhost:3000` in browser

---

## Step 5: Test Locally

### Create Test Account:
1. Click "Sign Up"
2. Enter: 
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Sign Up"

### Test Features:
- ✓ Dashboard should show (redirects from /login after signup)
- ✓ "+ Add Developer" button visible
- ✓ Click to add a developer
- ✓ Fill form and submit
- ✓ See developer card in list
- ✓ Try search (e.g., search for added developer name)
- ✓ Try filter by role
- ✓ Try sort by experience
- ✓ Click "View Profile" to see full details
- ✓ Click edit button to modify
- ✓ Try delete with confirmation

---

## Step 6: Prepare for Deployment

### Initialize Git Repositories:

**Backend:**
```bash
cd backend
git init
git add .
git commit -m "Backend initial commit"
git remote add origin https://github.com/your-username/developer-directory-backend.git
git push -u origin main
```

**Frontend:**
```bash
cd frontend
git init
git add .
git commit -m "Frontend initial commit"
git remote add origin https://github.com/your-username/developer-directory-frontend.git
git push -u origin main
```

---

## Step 7: Deploy Backend to Render

1. Create account at https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub account and select backend repository
4. Configure:
   - **Name**: developer-directory-backend
   - **Environment**: Node
   - **Region**: Choose closest to you
   - **Build Command**: (leave empty)
   - **Start Command**: `node server.js`
   - **Instance Type**: Free
5. Click "Advanced" and add Environment Variables:
   - `MONGODB_URI`: (your MongoDB URI)
   - `JWT_SECRET`: (generate strong secret)
   - `JWT_EXPIRY`: `7d`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: (will update after frontend deployed)
6. Click "Create Web Service"
7. Wait for deployment (usually 2-3 minutes)
8. Note your backend URL from the dashboard

---

## Step 8: Deploy Frontend to Vercel

1. Create account at https://vercel.com
2. Click "New Project"
3. Import your frontend GitHub repository
4. Configure:
   - **Framework**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`
6. Click "Deploy"
7. Wait for deployment
8. Note your frontend URL

---

## Step 9: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Select your backend service
3. Settings → Environment → Edit
4. Update `FRONTEND_URL`: `https://your-frontend-url.vercel.app`
5. Save and redeploy

---

## Step 10: Test Deployed Application

1. Open your frontend Vercel URL in browser
2. Sign up with test credentials
3. Test all features (add, edit, delete, search, filter, sort)
4. Check DevTools → Network tab to verify API calls

---

## Troubleshooting

### Backend won't connect to MongoDB:
- Check MongoDB URI format
- Verify username and password are correct
- Go to MongoDB Atlas → Security → Network Access
- Add `0.0.0.0/0` to allow all IPs
- Restart backend

### Can't signup/login:
- Check backend is running (`npm run dev`)
- Check MongoDB connection
- Check browser DevTools Console for errors
- Try creating new email (might already exist in database)

### Frontend can't reach API:
- Verify `REACT_APP_API_URL` is correct
- Check backend API is running
- Ensure CORS is enabled in backend
- Test API directly: `curl http://localhost:5000/api/health`

### Deployment fails:
- Check Render/Vercel logs
- Verify all environment variables are set
- Ensure code is pushed to correct GitHub branch
- Check package.json has correct start command

---

## File Structure Reference

```
ROUND_2_Full_Stack_App/
├── backend/
│   ├── models/ → Database schemas
│   ├── controllers/ → Business logic
│   ├── routes/ → API endpoints
│   ├── middleware/ → Auth, validation, error handling
│   ├── tests/ → Unit tests
│   ├── server.js → Main server file
│   ├── package.json → Dependencies
│   └── .env → Configuration
│
└── frontend/
    ├── src/
    │   ├── pages/ → React pages (Login, Signup, etc)
    │   ├── components/ → Reusable components
    │   ├── context/ → Auth state management
    │   ├── services/ → API calls
    │   ├── App.js → Main app with routing
    │   └── index.js → React DOM render
    ├── public/ → Static files
    ├── package.json → Dependencies
    └── .env → Configuration
```

---

## Common Commands

### Development:
```bash
# Backend
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start normally
npm test           # Run tests

# Frontend
npm start          # Start development server
npm build          # Build for production
npm test           # Run tests
```

### Git:
```bash
git add .          # Stage all changes
git commit -m "message"  # Commit changes
git push           # Push to GitHub
git pull           # Pull latest changes
```

---

## Next Steps After Setup

1. ✅ Test all features locally
2. ✅ Fix any issues
3. ✅ Push code to GitHub
4. ✅ Deploy backend to Render
5. ✅ Deploy frontend to Vercel
6. ✅ Test deployed version
7. ✅ Prepare submission files:
   - Frontend URL
   - Backend API URL
   - GitHub repository links
   - README with architecture

---

## Support Resources

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

You're all set! Happy coding! 🚀
