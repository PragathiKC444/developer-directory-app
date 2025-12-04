const request = require('supertest');
const app = require('../server');

describe('Developer Routes', () => {
  let token;
  let developerId;

  beforeAll(async () => {
    // Create user and get token
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Developer Test',
        email: 'dev@example.com',
        password: 'password123'
      });

    token = res.body.token;
  });

  describe('POST /api/developers', () => {
    it('should create a developer with auth', async () => {
      const res = await request(app)
        .post('/api/developers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Developer',
          email: 'john@example.com',
          role: 'Full-Stack',
          techStack: ['React', 'Node.js'],
          experience: 5,
          description: 'A skilled full-stack developer with 5 years of experience'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.name).toEqual('John Developer');
      developerId = res.body.data._id;
    });

    it('should not create without auth token', async () => {
      const res = await request(app)
        .post('/api/developers')
        .send({
          name: 'No Auth Dev',
          email: 'noauth@example.com',
          role: 'Frontend',
          techStack: ['React'],
          experience: 2,
          description: 'Test without authentication'
        });

      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/developers', () => {
    it('should get all developers', async () => {
      const res = await request(app)
        .get('/api/developers')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should search developers', async () => {
      const res = await request(app)
        .get('/api/developers')
        .query({ search: 'John' })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should filter by role', async () => {
      const res = await request(app)
        .get('/api/developers')
        .query({ role: 'Frontend' })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe('PUT /api/developers/:id', () => {
    it('should update developer', async () => {
      const res = await request(app)
        .put(`/api/developers/${developerId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Updated',
          email: 'john@example.com',
          role: 'Backend',
          techStack: ['Node.js', 'Express'],
          experience: 6,
          description: 'Updated description'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.experience).toEqual(6);
    });
  });

  describe('DELETE /api/developers/:id', () => {
    it('should delete developer', async () => {
      const res = await request(app)
        .delete(`/api/developers/${developerId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
    });
  });
});
