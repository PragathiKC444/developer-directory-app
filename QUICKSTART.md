# Developer Directory - Quick Start Guide

## 🚀 Fastest Way to Run the Project

### Option 1: Using the Start Script (Recommended)

Open PowerShell in the `developer-directory` folder and run:

```powershell
.\start.ps1
```

This will:
- Check if Node.js is installed
- Install dependencies for both backend and frontend (if needed)
- Start both servers automatically in separate windows
- Open the app in your browser

### Option 2: Manual Setup

#### Terminal 1 - Backend:
```powershell
cd backend
npm install
npm start
```

#### Terminal 2 - Frontend:
```powershell
cd frontend
npm install
npm start
```

## 📱 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🛠 First Time Setup

The script will automatically:
1. Install all dependencies
2. Create `.env` file in frontend
3. Initialize `developers.json` in backend
4. Start both servers

## 📝 Usage Tips

1. **Add a Developer**: Fill the form on the left and click "Add Developer"
2. **Search**: Type in the search box to filter by name or tech stack
3. **Filter by Role**: Use the dropdown to filter developers by their role
4. **Delete**: Click the trash icon to remove a developer

## ⚠️ Troubleshooting

**Port already in use:**
- Backend: Change PORT in `backend/.env`
- Frontend: It will prompt you to use a different port

**Dependencies issue:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**CORS error:**
- Make sure backend is running
- Check `REACT_APP_API_URL` in frontend `.env`

## 📚 Documentation

- **Main README**: See `README.md` for full documentation
- **Deployment Guide**: See `DEPLOYMENT.md` for hosting instructions
- **Backend README**: See `backend/README.md`
- **Frontend README**: See `frontend/README.md`

## 💡 Features to Test

- ✅ Form validation (try submitting empty fields)
- ✅ Add multiple developers
- ✅ Search by name or technology
- ✅ Filter by role (Frontend/Backend/Full-Stack)
- ✅ Toast notifications
- ✅ Responsive design (try on mobile)
- ✅ Delete developers

---

Need help? Check the full README.md or DEPLOYMENT.md for more details!
