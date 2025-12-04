const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should not create user with duplicate email', async () => {
      const userData = {
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123'
      };

      await request(app).post('/api/auth/signup').send(userData);

      const res = await request(app)
        .post('/api/auth/signup')
        .send(userData);

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with correct credentials', async () => {
      await request(app).post('/api/auth/signup').send({
        name: 'Login Test',
        email: 'login@example.com',
        password: 'password123'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toEqual(401);
    });
  });
});
