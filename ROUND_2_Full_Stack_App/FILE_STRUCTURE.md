# File Structure & Descriptions

## 📋 Root Directory Files

### Documentation Files (Start with these!)

| File | Purpose |
|------|---------|
| **README.md** | 📖 Main documentation - complete guide to the entire application |
| **BUILD_SUMMARY.md** | ✅ Summary of what was built and current status |
| **QUICK_REFERENCE.md** | 🚀 Quick lookup guide for developers |
| **SETUP_INSTRUCTIONS.md** | 🔧 Step-by-step guide to run locally |
| **DEPLOYMENT_GUIDE.md** | 🚢 How to deploy to Render & Vercel |
| **SUBMISSION_TEMPLATE.md** | 📧 Email template for submission |

---

## 🖧 Backend Directory (`/backend`)

### Configuration Files

| File | Purpose |
|------|---------|
| **package.json** | NPM dependencies and scripts |
| **.env.example** | Template for environment variables |
| **.gitignore** | Files to exclude from Git |
| **README.md** | Backend-specific documentation |
| **server.js** | Main Express server entry point |

### Models Directory (`/backend/models`)

| File | Purpose |
|------|---------|
| **User.js** | User database schema with password hashing |
| **Developer.js** | Developer database schema with validation |

### Controllers Directory (`/backend/controllers`)

| File | Purpose |
|------|---------|
| **authController.js** | Handles signup, login, profile logic |
| **developerController.js** | Handles CRUD, search, filter, sort, analytics |

### Routes Directory (`/backend/routes`)

| File | Purpose |
|------|---------|
| **authRoutes.js** | Routes for /api/auth/* endpoints |
| **developerRoutes.js** | Routes for /api/developers/* endpoints |

### Middleware Directory (`/backend/middleware`)

| File | Purpose |
|------|---------|
| **authenticate.js** | JWT token verification middleware |
| **validateRequest.js** | Input validation using Joi |
| **errorHandler.js** | Centralized error handling |

### Tests Directory (`/backend/tests`)

| File | Purpose |
|------|---------|
| **auth.test.js** | Unit tests for authentication |
| **developers.test.js** | Unit tests for developer CRUD |

---

## ⚛️ Frontend Directory (`/frontend`)

### Configuration Files

| File | Purpose |
|------|---------|
| **package.json** | NPM dependencies and scripts |
| **.env.example** | Template for environment variables |
| **.gitignore** | Files to exclude from Git |
| **tailwind.config.js** | Tailwind CSS configuration |
| **postcss.config.js** | PostCSS configuration |
| **README.md** | Frontend-specific documentation |

### Public Directory (`/frontend/public`)

| File | Purpose |
|------|---------|
| **index.html** | Main HTML entry point |

### Source Directory (`/frontend/src`)

#### Main Application Files

| File | Purpose |
|------|---------|
| **App.js** | Main React component with routing |
| **index.js** | React DOM render entry point |
| **index.css** | Global styles + Tailwind imports |

#### Pages Directory (`/frontend/src/pages`)

| File | Purpose |
|------|---------|
| **Login.js** | User login page with form |
| **Signup.js** | User registration page with form |
| **DeveloperDirectory.js** | List view with search, filter, sort, pagination |
| **DeveloperProfile.js** | Individual developer profile page |
| **DeveloperForm.js** | Form for adding/editing developers |

#### Components Directory (`/frontend/src/components`)

| File | Purpose |
|------|---------|
| **Navbar.js** | Navigation bar with user info and logout |
| **Loading.js** | Loading spinners and loading page |

#### Context Directory (`/frontend/src/context`)

| File | Purpose |
|------|---------|
| **AuthContext.js** | Authentication state management |

#### Services Directory (`/frontend/src/services`)

| File | Purpose |
|------|---------|
| **api.js** | Axios API client with auth headers |
| **toastService.js** | Toast notification service |

---

## 🔄 File Relationships

### Backend Flow
```
Request → Routes → Controller → Middleware → Model → Database
Response ← Controller ← Validation ← Middleware
```

### Frontend Flow
```
User → Component → Service (api.js) → Backend
Component ← Context (Auth) ← Toast Service
```

---

## 📝 What Each File Does

### Backend Files Detailed

#### server.js
- Initializes Express app
- Connects to MongoDB
- Configures CORS
- Registers routes
- Starts HTTP server on port 5000

#### models/User.js
- Defines user schema
- Email unique validation
- Password hashing before save
- Password comparison method

#### models/Developer.js
- Defines developer schema
- Role validation (enum)
- Tech stack array validation
- Experience range validation
- Reference to User (createdBy)

#### controllers/authController.js
- `signup()` - Create new user with validation
- `login()` - Verify credentials and generate JWT
- `getProfile()` - Return authenticated user info

#### controllers/developerController.js
- `getAllDevelopers()` - List with search/filter/sort/pagination
- `getDeveloper()` - Single developer by ID
- `createDeveloper()` - Add new developer
- `updateDeveloper()` - Edit existing developer
- `deleteDeveloper()` - Remove developer
- `getAnalytics()` - Dev stats (counts, tech stacks)

#### middleware/authenticate.js
- Extracts token from Authorization header
- Verifies JWT signature
- Checks token expiration
- Adds userId to request object

#### middleware/validateRequest.js
- Validates incoming request body
- Uses Joi schema validation
- Returns detailed error messages

#### middleware/errorHandler.js
- Catches all errors
- Formats error responses
- Handles specific error types
- Returns appropriate HTTP status codes

---

### Frontend Files Detailed

#### App.js
- React Router configuration
- Route definitions
- ProtectedRoute wrapper
- PublicRoute wrapper
- AuthProvider wrapping

#### pages/Login.js
- Email and password form
- Password visibility toggle
- Form submission handling
- Error toast on failure
- Redirect on success

#### pages/Signup.js
- Name, email, password form
- Password visibility toggle
- Duplicate email check
- Success redirect to home
- Link to login page

#### pages/DeveloperDirectory.js
- Search input field
- Role filter dropdown
- Sort dropdown
- Pagination controls
- Developer card grid
- Edit/Delete buttons

#### pages/DeveloperProfile.js
- Full developer information
- Tech stack tags
- Experience display
- Joining date display
- Photo display
- Edit button

#### pages/DeveloperForm.js
- Add/Edit dual-purpose form
- Tech stack tag management
- Form validation
- Character limits
- Photo URL input
- Submit button

#### components/Navbar.js
- Logo/title
- User name display
- Logout button
- Navigation styling

#### components/Loading.js
- Full-page loading spinner
- Inline loading spinner
- Lucide spinner animation

#### context/AuthContext.js
- Global auth state
- User data storage
- Token management
- Signup function
- Login function
- Logout function
- useAuth hook

#### services/api.js
- Axios instance creation
- Base URL configuration
- Auth header interceptor
- Error response handling
- API method wrappers

---

## 🚀 Execution Flow

### Signup Flow
1. User fills signup form in `Signup.js`
2. Clicks submit → calls `authAPI.signup(data)` in `api.js`
3. POST request to `/api/auth/signup`
4. Backend `authController.signup()` validates and hashes password
5. User stored in MongoDB
6. JWT token returned
7. Token stored in localStorage
8. Auth context updated
9. Redirect to home page

### Add Developer Flow
1. User navigates to `/add-developer`
2. Sees form in `DeveloperForm.js`
3. Fills in details, adds tech stack tags
4. Clicks submit
5. Calls `developerAPI.create(data)` with auth token
6. POST to `/api/developers`
7. Backend validates with Joi
8. Check user is authenticated
9. Developer saved to MongoDB
10. Toast success notification
11. Redirect to home page

### Search/Filter/Sort Flow
1. User types in search box
2. onChange triggers API call with search parameter
3. Backend searches name and techStack fields
4. Results filtered by role if selected
5. Results sorted by experience if selected
6. Results paginated (10 per page)
7. Frontend displays updated list

---

## 📊 File Sizes (Approximate)

```
Backend:
  server.js                  ~150 lines
  models/User.js             ~50 lines
  models/Developer.js        ~70 lines
  controllers/authController.js    ~120 lines
  controllers/developerController.js ~200 lines
  middleware/*.js            ~100 lines combined
  
Frontend:
  App.js                     ~60 lines
  pages/Login.js             ~110 lines
  pages/Signup.js            ~110 lines
  pages/DeveloperDirectory.js ~200 lines
  pages/DeveloperProfile.js  ~140 lines
  pages/DeveloperForm.js     ~250 lines
  components/*.js            ~80 lines combined
  services/*.js              ~100 lines combined
  context/AuthContext.js     ~60 lines
```

---

## 🔑 Key Dependencies

### Backend
```
express - Web framework
mongodb - Database driver
mongoose - ODM
jsonwebtoken - JWT auth
bcryptjs - Password hashing
joi - Input validation
cors - Cross-origin requests
```

### Frontend
```
react - UI framework
react-router-dom - Navigation
axios - HTTP requests
react-toastify - Notifications
tailwindcss - Styling
lucide-react - Icons
```

---

## 📌 Which Files to Modify?

### Adding a new feature:
1. Backend: Add route in `routes/`
2. Backend: Add logic in `controllers/`
3. Backend: Add validation in middleware
4. Frontend: Add page/component in `pages/`
5. Frontend: Update API calls in `services/api.js`
6. Frontend: Update routing in `App.js`

### Changing authentication:
1. Edit `middleware/authenticate.js`
2. Edit `controllers/authController.js`
3. Update `context/AuthContext.js`
4. Update login/signup pages

### Changing database schema:
1. Edit models in `models/`
2. Update controller validation
3. Update frontend forms

---

## ✅ Complete File Checklist

### Backend - All files present? ✅
- [ ] package.json
- [ ] .env.example
- [ ] .gitignore
- [ ] server.js
- [ ] models/User.js
- [ ] models/Developer.js
- [ ] controllers/authController.js
- [ ] controllers/developerController.js
- [ ] middleware/authenticate.js
- [ ] middleware/validateRequest.js
- [ ] middleware/errorHandler.js
- [ ] routes/authRoutes.js
- [ ] routes/developerRoutes.js
- [ ] tests/auth.test.js
- [ ] tests/developers.test.js
- [ ] README.md

### Frontend - All files present? ✅
- [ ] package.json
- [ ] .env.example
- [ ] .gitignore
- [ ] tailwind.config.js
- [ ] postcss.config.js
- [ ] public/index.html
- [ ] src/App.js
- [ ] src/index.js
- [ ] src/index.css
- [ ] src/pages/Login.js
- [ ] src/pages/Signup.js
- [ ] src/pages/DeveloperDirectory.js
- [ ] src/pages/DeveloperProfile.js
- [ ] src/pages/DeveloperForm.js
- [ ] src/components/Navbar.js
- [ ] src/components/Loading.js
- [ ] src/context/AuthContext.js
- [ ] src/services/api.js
- [ ] src/services/toastService.js
- [ ] README.md

### Root Documentation - All present? ✅
- [ ] README.md
- [ ] BUILD_SUMMARY.md
- [ ] QUICK_REFERENCE.md
- [ ] SETUP_INSTRUCTIONS.md
- [ ] DEPLOYMENT_GUIDE.md
- [ ] SUBMISSION_TEMPLATE.md
- [ ] FILE_STRUCTURE.md (this file)

---

## 🎯 Next Steps

1. Read README.md for overview
2. Follow SETUP_INSTRUCTIONS.md to run locally
3. Test all features
4. Make any customizations
5. Follow DEPLOYMENT_GUIDE.md to deploy
6. Use SUBMISSION_TEMPLATE.md for email
7. Submit before deadline!

---

**All files are present and ready to use! ✅**
