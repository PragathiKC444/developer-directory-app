const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const usersFile = path.join(__dirname, '..', 'users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return true;
  } catch (err) {
    console.error('writeUsers error', err);
    return false;
  }
};

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// POST /auth/signup
router.post('/signup', (req, res) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const users = readUsers();
  const existing = users.find(u => u.email.toLowerCase() === value.email.toLowerCase());
  if (existing) return res.status(409).json({ success: false, message: 'Email already registered' });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value.password, salt);

  const newUser = {
    id: Date.now().toString(),
    name: value.name.trim(),
    email: value.email.toLowerCase(),
    passwordHash: hash,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  const ok = writeUsers(users);
  if (!ok) return res.status(500).json({ success: false, message: 'Failed to store user' });

  // generate token
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, secret, { expiresIn: '7d' });

  res.status(201).json({ success: true, message: 'User created', data: { id: newUser.id, name: newUser.name, email: newUser.email }, token });
});

// POST /auth/login
router.post('/login', (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === value.email.toLowerCase());
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const match = bcrypt.compareSync(value.password, user.passwordHash);
  if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, secret, { expiresIn: '7d' });

  res.json({ success: true, message: 'Login successful', data: { id: user.id, name: user.name, email: user.email }, token });
});

module.exports = router;
