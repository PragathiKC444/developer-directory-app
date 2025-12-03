# Deployment Guide

Complete guide to deploy the Developer Directory App on free hosting platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Alternative Platforms](#alternative-platforms)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

- GitHub account
- Git installed locally
- Project pushed to GitHub repository

### Push to GitHub

If you haven't already:

```bash
# Initialize git repository
cd developer-directory
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Developer Directory App"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/developer-directory.git

# Push to GitHub
git push -u origin main
```

## Backend Deployment (Render)

### Step 1: Sign Up
1. Go to [render.com](https://render.com)
2. Sign up using GitHub

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select `developer-directory` repository

### Step 3: Configure Service

**Basic Settings:**
- **Name**: `developer-directory-backend`
- **Root Directory**: `backend`
- **Environment**: Node
- **Region**: Choose closest to you
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** tier

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://developer-directory-backend.onrender.com`

### Step 5: Test Backend
Visit: `https://your-backend-url.onrender.com/`

You should see:
```json
{
  "success": true,
  "message": "Developer Directory API is running"
}
```

## Frontend Deployment (Vercel)

### Step 1: Sign Up
1. Go to [vercel.com](https://vercel.com)
2. Sign up using GitHub

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select `developer-directory`

### Step 3: Configure Project

**Framework Preset:**
- Vercel will auto-detect React

**Root Directory:**
- Click **"Edit"**
- Set to `frontend`

**Build Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

**Environment Variables:**
1. Click **"Environment Variables"**
2. Add variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (from Render)

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Get your frontend URL: `https://your-app.vercel.app`

### Step 5: Test Application
1. Visit your Vercel URL
2. Try adding a developer
3. Test search and filter features

## Alternative Platforms

### Backend Alternatives

#### Railway
1. Sign up at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository and `backend` folder
4. Add environment variables if needed
5. Deploy

#### Cyclic
1. Sign up at [cyclic.sh](https://cyclic.sh)
2. Link GitHub repository
3. Deploy backend
4. Similar configuration to Render

### Frontend Alternatives

#### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. New site from Git
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `build`
6. Add environment variable: `REACT_APP_API_URL`

#### GitHub Pages
Requires additional configuration for client-side routing.

## Important Notes

### CORS Configuration
The backend already has CORS enabled for all origins. If you face CORS issues:

```javascript
// In backend/server.js
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

### Environment Variables

**Frontend (.env)**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

**Backend (if needed)**
```
PORT=5000
NODE_ENV=production
```

### Data Persistence

The current setup uses JSON file storage. For production:
- On Render free tier, data persists but may reset on service restart
- Consider upgrading to persistent storage or using MongoDB Atlas (free tier available)

## Troubleshooting

### Backend Issues

**Service won't start:**
- Check build logs on Render
- Ensure `package.json` has correct start script
- Verify Node.js version compatibility

**API not responding:**
- Check if service is running (green status on Render)
- Test health endpoint: `https://your-backend-url.onrender.com/`
- Check for errors in logs

### Frontend Issues

**Build fails:**
- Check build logs on Vercel
- Ensure all dependencies are in `package.json`
- Verify Tailwind CSS configuration

**Cannot connect to backend:**
- Verify `REACT_APP_API_URL` environment variable
- Check browser console for CORS errors
- Test backend URL directly in browser

**Environment variable not working:**
- Redeploy after adding environment variables
- Variables must start with `REACT_APP_`
- Clear browser cache

### Data Loss

**Render free tier limitations:**
- Services sleep after 15 minutes of inactivity
- Data in `developers.json` persists but may reset on rebuild

**Solutions:**
1. Upgrade to paid tier for persistent disk
2. Use external database (MongoDB Atlas free tier)
3. Implement periodic backups

## MongoDB Integration (Optional Upgrade)

For persistent data storage:

### 1. Set up MongoDB Atlas
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string

### 2. Update Backend

Install mongoose:
```bash
npm install mongoose
```

Update `server.js`:
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### 3. Add Environment Variable on Render
```
MONGODB_URI=your_mongodb_connection_string
```

## Final Checklist

Before submitting:
- ✅ Backend deployed and accessible
- ✅ Frontend deployed and accessible  
- ✅ Test adding a developer
- ✅ Test search functionality
- ✅ Test filter by role
- ✅ Check responsive design on mobile
- ✅ Verify toast notifications work
- ✅ No console errors in browser
- ✅ All forms validate properly

## Submission

Send email to **intern@talrn.com** with:

**Subject:** Full Stack Developer Internship - Application

**Body:**
```
Name: [Your Full Name]
Email: [Your Email]
Phone: [Your Phone Number]
GitHub Repository: [Repository URL]
Live Demo: [Your Vercel Frontend URL]
Joining Date Availability: [Your availability]

Additional Notes:
- Backend: [Render URL]
- Frontend: [Vercel URL]
- Tech Stack: React, Node.js, Express, Tailwind CSS
```

---

Good luck with your deployment! 🚀
