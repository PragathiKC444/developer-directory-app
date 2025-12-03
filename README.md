# Developer Directory App

A full-stack web application for managing and discovering talented developers with search and filter capabilities.

## 🚀 Live Demo

[Your hosted link here after deployment]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## ✨ Features

### Frontend
- ✅ Clean and modern UI with Tailwind CSS
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Add developer details through a form
  - Name (text input)
  - Role (dropdown: Frontend/Backend/Full-Stack)
  - Tech Stack (comma-separated input)
  - Experience (number in years)
- ✅ Real-time form validation
- ✅ Display list of developers in card layout
- ✅ Search developers by name or tech stack
- ✅ Filter developers by role
- ✅ Toast notifications for success/error messages
- ✅ Delete developer functionality

### Backend
- ✅ RESTful API with Express.js
- ✅ CORS enabled for cross-origin requests
- ✅ JSON file-based data storage
- ✅ Input validation
- ✅ Error handling

## 🛠 Tech Stack

### Frontend
- **React** (v18.2.0) - UI library with functional components and hooks
- **Tailwind CSS** (v3.3.5) - Utility-first CSS framework
- **Axios** (v1.6.0) - HTTP client for API calls
- **React Hot Toast** (v2.4.1) - Toast notifications
- **React Scripts** (v5.0.1) - Build tooling

### Backend
- **Node.js** - JavaScript runtime
- **Express** (v4.18.2) - Web framework
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **Body Parser** (v1.20.2) - Request body parsing
- **File System (fs)** - JSON file storage

## 📁 Project Structure

```
developer-directory/
├── backend/
│   ├── server.js              # Express server and API routes
│   ├── developers.json        # Data storage file
│   ├── package.json           # Backend dependencies
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeveloperForm.js      # Form component
│   │   │   ├── DeveloperList.js      # List display component
│   │   │   └── SearchFilter.js       # Search and filter component
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles with Tailwind
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── .gitignore
└── README.md                  # This file
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd developer-directory/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

For development with auto-restart:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd developer-directory/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:5000):
```bash
REACT_APP_API_URL=http://localhost:5000
```

4. Start the React app:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and open in your browser automatically.

### Running Both Servers

You need to run both backend and frontend servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000`

#### 1. Get All Developers
```http
GET /developers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "name": "John Doe",
      "role": "Full-Stack",
      "techStack": "React, Node.js, MongoDB",
      "experience": 5,
      "createdAt": "2025-12-03T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2. Add New Developer
```http
POST /developers
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "role": "Frontend",
  "techStack": "React, TypeScript, Tailwind",
  "experience": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Developer added successfully",
  "data": {
    "id": "1234567891",
    "name": "Jane Smith",
    "role": "Frontend",
    "techStack": "React, TypeScript, Tailwind",
    "experience": 3,
    "createdAt": "2025-12-03T10:05:00.000Z"
  }
}
```

#### 3. Delete Developer
```http
DELETE /developers/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Developer deleted successfully"
}
```

## 🌐 Deployment

### Deployment Options

This app can be deployed on various free platforms:

#### Backend Deployment
- **Render** (recommended for Node.js)
- **Railway**
- **Heroku**
- **Cyclic**

#### Frontend Deployment
- **Vercel** (recommended for React)
- **Netlify**
- **GitHub Pages**
- **Render**

### Deployment Steps (Vercel + Render)

#### Deploy Backend on Render:

1. Create a new account on [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click "Create Web Service"
6. Copy your backend URL (e.g., `https://your-app.onrender.com`)

#### Deploy Frontend on Vercel:

1. Create a new account on [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Environment Variables**: 
     - `REACT_APP_API_URL` = Your Render backend URL
5. Click "Deploy"

### Post-Deployment

After deployment, update your submission email to intern@talrn.com with:
- Your name
- Contact details
- Hosted link (frontend URL)
- Joining date availability

## 📸 Screenshots

[Add screenshots of your application here after deployment]

## 🎯 Requirements Checklist

- ✅ React functional components + Hooks (useState, useEffect)
- ✅ Form with validation (name, role dropdown, tech stack, experience)
- ✅ Display list of developers in clean UI
- ✅ Node.js + Express backend
- ✅ API endpoints (POST /developers, GET /developers)
- ✅ Data storage (JSON file)
- ✅ Search/filter by role and tech stack
- ✅ Tailwind CSS styling
- ✅ Toast messages (success/error)
- ✅ Clean, readable code
- ✅ Responsive design
- ✅ README with setup instructions

## 🤝 About This Project

This project was created as part of the Talrn.com Full Stack Internship selection task.

### Contact Information
- **Email**: [Your email]
- **GitHub**: [Your GitHub profile]
- **Availability**: [Your joining date availability]

## 📝 License

MIT License - feel free to use this project for learning purposes.

---

Built with ❤️ for the Talrn.com internship application
