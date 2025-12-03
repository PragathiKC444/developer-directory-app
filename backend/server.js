const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Data file path
const dataFilePath = path.join(__dirname, 'developers.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
}

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
app.get('/developers', (req, res) => {
  try {
    const developers = readDevelopers();
    res.status(200).json({
      success: true,
      data: developers,
      count: developers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch developers',
      error: error.message
    });
  }
});

// POST /developers - Add a new developer
app.post('/developers', (req, res) => {
  try {
    const { name, role, techStack, experience } = req.body;

    // Validation
    if (!name || !role || !techStack || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate experience is a number
    if (isNaN(experience) || experience < 0) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be a positive number'
      });
    }

    // Create new developer object
    const newDeveloper = {
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim(),
      techStack: techStack.trim(),
      experience: parseFloat(experience),
      createdAt: new Date().toISOString()
    };

    // Read existing developers
    const developers = readDevelopers();

    // Add new developer
    developers.push(newDeveloper);

    // Write to file
    const success = writeDevelopers(developers);

    if (success) {
      res.status(201).json({
        success: true,
        message: 'Developer added successfully',
        data: newDeveloper
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save developer'
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

// DELETE /developers/:id - Delete a developer (bonus feature)
app.delete('/developers/:id', (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
