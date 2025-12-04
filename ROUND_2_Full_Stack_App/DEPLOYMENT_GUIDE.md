# ROUND 2 Full-Stack Internship Task - Deployment Guide

## Quick Start (Local Development)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

---

## Production Deployment

### Option 1: Deploy Backend to Render.com (Recommended)

#### Step 1: Prepare your code
1. Create GitHub repository
2. Push backend code:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend initial commit"
   git push origin main
   ```

#### Step 2: Create Render account
- Go to https://render.com
- Sign up with GitHub
- Click "Authorize"

#### Step 3: Deploy
1. Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Name**: developer-directory-backend
   - **Environment**: Node
   - **Build Command**: (leave empty - npm install auto)
   - **Start Command**: `node server.js`
4. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRY=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
5. Click "Create Web Service"
6. Your backend will be live at: `https://your-app-name.onrender.com`

---

### Option 2: Deploy Frontend to Vercel.com (Recommended)

#### Step 1: Prepare your code
1. Push frontend code to GitHub:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Frontend initial commit"
   git push origin main
   ```

#### Step 2: Create Vercel account
- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub"

#### Step 3: Deploy
1. Click "New Project"
2. Import your frontend repository
3. Framework: Keep "Create React App" selected
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
5. Click "Deploy"
6. Your frontend will be live at: `https://your-app-name.vercel.app`

---

## Testing Deployment

### 1. Test Backend Health
```bash
curl https://your-backend-url.onrender.com/api/health
```
Expected response: `{"status":"API is running"}`

### 2. Test Signup
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### 3. Test Frontend
- Open your Vercel frontend URL
- Try signing up
- Try logging in
- Try creating a developer
- Try searching and filtering

---

## Optional: Alternative Deployment Options

### Backend Alternatives:
- **Railway**: https://railway.app (Similar to Render)
- **Cyclic**: https://cyclic.sh (Free tier available)
- **Heroku**: https://heroku.com (Paid)

### Frontend Alternatives:
- **Netlify**: https://netlify.com (Free, similar to Vercel)

---

## Common Issues & Fixes

### "Cannot connect to MongoDB"
- Verify MongoDB URI includes username and password
- Check IP whitelist in MongoDB Atlas (Settings → Security → Network Access)
- Add 0.0.0.0/0 to allow all IPs (for development)

### CORS Error
- Check `FRONTEND_URL` in backend environment variables
- Frontend URL must match exactly (including https://)
- Restart backend after changing env vars

### "Failed to load developers" after deployment
- Check `REACT_APP_API_URL` in frontend environment variables
- Backend URL must be correct and reachable
- Check Network tab in browser DevTools

### Deployment won't start
- Check build logs (Render/Vercel dashboard)
- Verify all dependencies in package.json
- Test locally before deploying

---

## Environment Variables Reference

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db-name
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRY=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## Monitoring & Logs

### Render Backend Logs
- Dashboard → Your Service → Logs
- Real-time logs visible here

### Vercel Frontend Logs
- Dashboard → Your Project → Deployments
- Click on deployment to see build logs

---

## Final Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Health check endpoint responding
- [ ] Signup/Login working
- [ ] Can create developers
- [ ] Can edit developers
- [ ] Can delete developers
- [ ] Search works
- [ ] Filter by role works
- [ ] Sort by experience works
- [ ] Pagination works
- [ ] Toast notifications appear
- [ ] Responsive design works on mobile
- [ ] No console errors

---

## Ready for Submission!

Once everything is working, submit:
1. **Frontend URL**: Your Vercel URL
2. **Backend URL**: Your Render URL
3. **GitHub Links**: Frontend and Backend repositories
4. **README**: With setup instructions (already created)

Send to: **k12345@talrn.com** (CC: **intern@talrn.com**)

Good luck! 🚀
