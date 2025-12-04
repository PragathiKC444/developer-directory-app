const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');
const authenticate = require('../middleware/authenticate');

// Public route
router.get('/analytics', developerController.getAnalytics);

// Protected routes
router.get('/', authenticate, developerController.getAllDevelopers);
router.get('/:id', authenticate, developerController.getDeveloper);
router.post('/', authenticate, developerController.createDeveloper);
router.put('/:id', authenticate, developerController.updateDeveloper);
router.delete('/:id', authenticate, developerController.deleteDeveloper);

module.exports = router;
