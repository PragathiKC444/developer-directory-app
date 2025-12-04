const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full-Stack'],
    required: [true, 'Role is required']
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Tech stack must have at least one technology'
    }
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: 0,
    max: 70
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: 10,
    maxlength: 1000
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
developerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Developer', developerSchema);
