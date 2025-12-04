const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

const usersFile = path.join(__dirname, '..', 'users.json');

const readUsers = () => {
  try { return JSON.parse(fs.readFileSync(usersFile, 'utf8') || '[]'); } catch { return []; }
};

const writeUsers = (u) => fs.writeFileSync(usersFile, JSON.stringify(u, null, 2));

describe('Auth routes', () => {
  const email = `test+${Date.now()}@example.com`;
  let userId;

  afterAll(() => {
    // cleanup user
    const users = readUsers().filter(u => u.email !== email);
    writeUsers(users);
  });

  test('signup should create user and return token', async () => {
    const res = await request(app).post('/auth/signup').send({ name: 'Test User', email, password: 'pass1234' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.data.email).toBe(email);
    userId = res.body.data.id;
  });

  test('login should return token', async () => {
    const res = await request(app).post('/auth/login').send({ email, password: 'pass1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
