# Developer Directory - Full-Stack Application

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern, secure web application for managing and discovering developer profiles with authentication, advanced filtering, and comprehensive CRUD operations.

## 🌟 Features

### Core Features (Mandatory)
✅ **Secure Authentication**
- JWT-based authentication
- Bcrypt password hashing
- Secure login and signup
- Protected routes and endpoints

✅ **Developer Profiles**
- Dedicated profile pages
- Role-based categorization (Frontend, Backend, Full-Stack)
- Tech stack display as tags
- Experience level tracking
- Profile photos (local or cloud)
- About/Description section

✅ **Advanced Directory**
- **Search**: By name or technology
- **Filter**: By developer role
- **Sort**: By experience (ascending/descending)
- **Pagination**: Efficient data loading

✅ **CRUD Operations**
- Create new developer entries
- Read/View developer details
- Update developer information
- Delete entries with confirmation

✅ **UI/UX Excellence**
- Toast notifications (success/error/info)
- Loading indicators for all operations
- Responsive mobile-first design
- Tailwind CSS styling
- Error handling with fallbacks

### Bonus Features
🚀 **Developer Analytics**
- Count developers by role
- Popular technology stacks
- Total developer count

🚀 **Photo Uploads**
- Local file storage
- Optional Cloudinary integration for cloud storage

🚀 **Comprehensive Testing**
- Backend API tests (Jest + Supertest)
- Authentication tests
- CRUD operation tests

🚀 **CI/CD Pipeline**
- GitHub Actions workflows
- Automated testing on push
- One-click deployment triggers

---

## 🏗️ Architecture

```
developer-directory/
├── backend/
│   ├── auth/
│   │   ├── authMiddleware.js    - JWT verification
│   │   └── authRoutes.js        - Signup/Login endpoints
│   ├── tests/
│   │   ├── auth.test.js         - Authentication tests
│   │   └── developers.test.js   - CRUD tests
│   ├── server.js                - Express server & all endpoints
│   ├── developers.json          - Developer data storage
│   ├── users.json               - User credentials storage
│   ├── uploads/                 - Local photo storage
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AuthForm.js           - Login/Signup UI
    │   │   ├── DeveloperForm.js      - Add/Edit developer
    │   │   ├── DeveloperList.js      - List with edit/delete
    │   │   ├── DeveloperProfile.js   - Individual profile page
    │   │   └── SearchFilter.js       - Search/filter/sort UI
    │   ├── App.js                    - Main app routing & state
    │   ├── index.js                  - React entry point
    │   └── index.css                 - Styling
    └── public/
        └── index.html
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

### Backend Setup
```bash
cd developer-directory/backend
npm install
```

Create `.env` file:
```env
PORT=5000
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd developer-directory/frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm start
```

### Testing
```bash
cd developer-directory/backend
npm test
```

---

## 📋 Technology Stack

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Router v6** - Navigation
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Joi** - Input validation
- **Multer** - File uploads
- **Cloudinary** - Cloud storage (optional)

### Testing & CI/CD
- **Jest** - Test framework
- **Supertest** - API testing
- **GitHub Actions** - CI/CD

### Deployment
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

---

## 📚 API Documentation

### Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://your-backend-url.onrender.com`

### Authentication Endpoints
```
POST /auth/signup
- Register new user
- Body: { name, email, password }
- Returns: { token, data: user }

POST /auth/login
- Login existing user
- Body: { email, password }
- Returns: { token, data: user }
```

### Developer Endpoints (All Protected)
```
GET /developers
- Fetch all developers with optional filtering
- Query params: q (search), role (filter), sort (exp_asc/exp_desc), page, limit
- Returns: { data: [], total, page, limit }

POST /developers
- Create new developer
- Body: { name, role, techStack, experience, description, photo }
- Returns: { data: newDeveloper }

GET /developers/:id
- Get single developer
- Returns: { data: developer }

PUT /developers/:id
- Update developer
- Body: { name, role, techStack, experience, description }
- Returns: { data: updatedDeveloper }

DELETE /developers/:id
- Delete developer
- Returns: { success: true }

POST /developers/:id/photo
- Upload developer photo
- Form-data: { photo: file }
- Returns: { data: { photo: url } }

GET /analytics
- Get developer statistics
- Returns: { data: { countsByRole, popularTechs, total } }
```

---

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ Protected API endpoints with middleware
- ✅ CORS configuration for production
- ✅ Input validation with Joi
- ✅ Error handling without exposing sensitive data
- ✅ Secure environment variable management

---

## 📦 Deployment Guide

### Deploy Backend (Render)

1. **Create Render Account**: [render.com](https://render.com)

2. **Create Web Service**:
   - Select GitHub repository
   - Set root directory: `developer-directory/backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Set Environment Variables**:
   ```
   JWT_SECRET=<strong_random_string>
   CORS_ORIGIN=<frontend_url>
   PORT=5000
   NODE_ENV=production
   ```

4. **Deploy**: Service will auto-deploy and provide URL

### Deploy Frontend (Vercel)

1. **Create Vercel Account**: [vercel.com](https://vercel.com)

2. **Import Project**:
   - Select GitHub repository
   - Root directory: `developer-directory/frontend`

3. **Set Environment Variables**:
   ```
   REACT_APP_API_URL=<backend_url>
   ```

4. **Deploy**: Vercel auto-deploys on push

---

## 🧪 Testing

### Run All Tests
```bash
cd developer-directory/backend
npm test
```

### Test Coverage
- Authentication (signup/login)
- CRUD operations (create/read/update/delete)
- Input validation
- Protected routes

### Continuous Integration
Tests run automatically on:
- Git push
- Pull requests

---

## 🎯 Use Cases

### For Developers
- Create and manage professional profiles
- Showcase tech skills and experience
- Search for peers with similar stack
- Build professional network

### For Companies
- Discover available developers
- Filter by role and expertise
- Access detailed candidate profiles
- View analytics on developer pool

---

## 🔄 Data Persistence

### Current (Development)
- File-based JSON storage (developers.json, users.json)
- Local file uploads (/uploads directory)

### Recommended (Production)
- MongoDB Atlas or PostgreSQL
- AWS S3 or Cloudinary for file storage

---

## 📈 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Admin dashboard
- [ ] User profile customization
- [ ] Advanced analytics
- [ ] Email verification
- [ ] Password reset
- [ ] Two-factor authentication
- [ ] Database migration
- [ ] Real-time notifications
- [ ] Developer portfolio links

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Pragathi KC**
- GitHub: [@PragathiKC444](https://github.com/PragathiKC444)
- Email: [Contact Email]

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section in SETUP_AND_DEPLOYMENT_GUIDE.md
2. Review API documentation above
3. Check GitHub Issues
4. Contact maintainer

---

## 🙏 Acknowledgments

- [Render](https://render.com) - Backend hosting
- [Vercel](https://vercel.com) - Frontend hosting
- [Express.js](https://expressjs.com/) - Web framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: 🟢 Production Ready
