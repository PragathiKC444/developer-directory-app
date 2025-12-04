require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Joi = require('joi');

const { ensureAuth } = require('./auth/authMiddleware');
const authRoutes = require('./auth/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS to allow frontend origin from env or default to allow all (for demo)
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Data file path
const dataFilePath = path.join(__dirname, 'developers.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Multer setup for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`);
  }
});
const upload = multer({ storage });

// Mount auth routes
app.use('/auth', authRoutes);

// Validation schema for developers
const developerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  role: Joi.string().valid('Frontend', 'Backend', 'Full-Stack').required(),
  techStack: Joi.string().required(),
  experience: Joi.number().min(0).required(),
  description: Joi.string().allow('', null),
  photo: Joi.string().allow('', null)
});

// Helper function to read developers
const readDevelopers = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading developers:', error);
    return [];
  }
};

// Helper function to write developers
const writeDevelopers = (developers) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(developers, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing developers:', error);
    return false;
  }
};

// GET /developers - Get all developers
// Protected route: get developers with basic search/filter/sort/pagination
app.get('/developers', ensureAuth, (req, res) => {
  try {
    let developers = readDevelopers();

    // query params: q (search), role, sort (exp_asc|exp_desc), page, limit
    const { q, role, sort, page = 1, limit = 10 } = req.query;

    if (q) {
      const qLower = q.toLowerCase();
      developers = developers.filter(d => d.name.toLowerCase().includes(qLower) || d.techStack.toLowerCase().includes(qLower));
    }

    if (role) {
      developers = developers.filter(d => d.role === role);
    }

    if (sort === 'exp_asc') developers = developers.sort((a, b) => a.experience - b.experience);
    if (sort === 'exp_desc') developers = developers.sort((a, b) => b.experience - a.experience);

    // pagination
    const p = parseInt(page) || 1;
    const l = parseInt(limit) || 10;
    const start = (p - 1) * l;
    const paged = developers.slice(start, start + l);

    res.status(200).json({ success: true, data: paged, total: developers.length, page: p, limit: l });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch developers',
      error: error.message
    });
  }
});

// GET /developers/:id - get single developer
app.get('/developers/:id', ensureAuth, (req, res) => {
  try {
    const developers = readDevelopers();
    const dev = developers.find(d => d.id === req.params.id);
    if (!dev) return res.status(404).json({ success: false, message: 'Developer not found' });
    res.json({ success: true, data: dev });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch developer', error: error.message });
  }
});

// POST /developers/:id/photo - upload a photo for a developer
// Supports Cloudinary if `CLOUDINARY_URL` env var is set; otherwise stores locally in /uploads
let cloudinary = null;
if (process.env.CLOUDINARY_URL) {
  cloudinary = require('cloudinary').v2;
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
}

app.post('/developers/:id/photo', ensureAuth, upload.single('photo'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const developers = readDevelopers();
    const idx = developers.findIndex(d => d.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Developer not found' });

    // If Cloudinary is configured, upload to cloud and save remote URL
    if (cloudinary) {
      cloudinary.uploader.upload(req.file.path, { folder: 'devdir' }, (err, result) => {
        if (err) {
          console.error('Cloudinary upload error', err);
          return res.status(500).json({ success: false, message: 'Cloud upload failed' });
        }
        developers[idx].photo = result.secure_url;
        writeDevelopers(developers);
        // remove local file
        try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore */ }
        res.json({ success: true, message: 'Photo uploaded', data: { photo: result.secure_url } });
      });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    developers[idx].photo = fileUrl;
    const ok = writeDevelopers(developers);
    if (!ok) return res.status(500).json({ success: false, message: 'Failed to save photo' });

    res.json({ success: true, message: 'Photo uploaded', data: { photo: fileUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
});

// POST /developers - Add a new developer
app.post('/developers', ensureAuth, (req, res) => {
  try {
    const { error, value } = developerSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const newDeveloper = {
      id: Date.now().toString(),
      name: value.name.trim(),
      role: value.role,
      techStack: value.techStack.trim(),
      experience: parseFloat(value.experience),
      description: value.description || '',
      photo: value.photo || '',
      createdAt: new Date().toISOString()
    };

    const developers = readDevelopers();
    developers.push(newDeveloper);
    const success = writeDevelopers(developers);

    if (success) {
      res.status(201).json({ success: true, message: 'Developer added successfully', data: newDeveloper });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save developer' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// DELETE /developers/:id - Delete a developer (bonus feature)
app.delete('/developers/:id', ensureAuth, (req, res) => {
  try {
    const { id } = req.params;
    const developers = readDevelopers();
    const filteredDevelopers = developers.filter(dev => dev.id !== id);

    if (developers.length === filteredDevelopers.length) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    const success = writeDevelopers(filteredDevelopers);

    if (success) {
      res.status(200).json({
        success: true,
        message: 'Developer deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete developer'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT /developers/:id - Update developer (protected)
app.put('/developers/:id', ensureAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = developerSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const developers = readDevelopers();
    const idx = developers.findIndex(d => d.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Developer not found' });

    const updated = Object.assign({}, developers[idx], {
      name: value.name.trim(),
      role: value.role,
      techStack: value.techStack.trim(),
      experience: parseFloat(value.experience),
      description: value.description || '',
      photo: value.photo || ''
    });

    developers[idx] = updated;
    const ok = writeDevelopers(developers);
    if (!ok) return res.status(500).json({ success: false, message: 'Failed to update developer' });

    res.json({ success: true, message: 'Developer updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Analytics endpoint - counts by role and popular tech stacks
app.get('/analytics', ensureAuth, (req, res) => {
  try {
    const developers = readDevelopers();
    const countsByRole = developers.reduce((acc, d) => { acc[d.role] = (acc[d.role] || 0) + 1; return acc; }, {});
    const techCounts = {};
    developers.forEach(d => {
      (d.techStack || '').split(',').map(t => t.trim()).filter(Boolean).forEach(t => { techCounts[t] = (techCounts[t] || 0) + 1; });
    });
    // get top techs
    const popularTechs = Object.entries(techCounts).sort((a,b) => b[1]-a[1]).slice(0,10).map(([tech,count]) => ({ tech, count }));
    res.json({ success: true, data: { countsByRole, popularTechs, total: developers.length } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to compute analytics', error: err.message });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Developer Directory API is running',
    endpoints: {
      getDevelopers: 'GET /developers',
      addDeveloper: 'POST /developers',
      deleteDeveloper: 'DELETE /developers/:id'
    }
  });
});

// Start server when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
