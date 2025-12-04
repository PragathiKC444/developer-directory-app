const Developer = require('../models/Developer');
const Joi = require('joi');

// Validation schemas
const developerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('Frontend', 'Backend', 'Full-Stack').required(),
  techStack: Joi.array().items(Joi.string()).min(1).required(),
  experience: Joi.number().min(0).max(70).required(),
  description: Joi.string().min(10).max(1000).required(),
  joiningDate: Joi.date(),
  photo: Joi.string().allow(null)
});

// GET all developers with filters, search, and sort
exports.getAllDevelopers = async (req, res, next) => {
  try {
    const { search, role, sortBy, page = 1, limit = 10 } = req.query;
    let query = {};

    // Search by name or tech stack
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { techStack: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Execute query
    let queryBuilder = Developer.find(query);

    // Sort
    if (sortBy === 'experience-asc') {
      queryBuilder = queryBuilder.sort({ experience: 1 });
    } else if (sortBy === 'experience-desc') {
      queryBuilder = queryBuilder.sort({ experience: -1 });
    } else {
      queryBuilder = queryBuilder.sort({ createdAt: -1 });
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Developer.countDocuments(query);
    const developers = await queryBuilder.skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      data: developers,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET single developer
exports.getDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: developer
    });
  } catch (error) {
    next(error);
  }
};

// CREATE developer
exports.createDeveloper = async (req, res, next) => {
  try {
    const { error, value } = developerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Check if email already exists
    const existingDeveloper = await Developer.findOne({ email: value.email });
    if (existingDeveloper) {
      return res.status(400).json({
        success: false,
        message: 'Developer email already exists'
      });
    }

    const developer = new Developer({
      ...value,
      createdBy: req.userId
    });

    await developer.save();

    res.status(201).json({
      success: true,
      message: 'Developer created successfully',
      data: developer
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE developer
exports.updateDeveloper = async (req, res, next) => {
  try {
    const { error, value } = developerSchema.validate(req.body, { allowUnknown: true });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const developer = await Developer.findById(req.params.id);
    
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    // Check if user owns this developer
    if (developer.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this developer'
      });
    }

    // Update fields
    Object.assign(developer, value);
    await developer.save();

    res.status(200).json({
      success: true,
      message: 'Developer updated successfully',
      data: developer
    });
  } catch (error) {
    next(error);
  }
};

// DELETE developer
exports.deleteDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id);
    
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    // Check if user owns this developer
    if (developer.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this developer'
      });
    }

    await Developer.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Developer deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// GET analytics (optional bonus)
exports.getAnalytics = async (req, res, next) => {
  try {
    const totalDevelopers = await Developer.countDocuments();
    
    const byRole = await Developer.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const techStacks = await Developer.aggregate([
      {
        $unwind: '$techStack'
      },
      {
        $group: {
          _id: '$techStack',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDevelopers,
        byRole,
        popularTechStacks: techStacks
      }
    });
  } catch (error) {
    next(error);
  }
};
