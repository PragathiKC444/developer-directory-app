const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

const usersFile = path.join(__dirname, '..', 'users.json');
const devFile = path.join(__dirname, '..', 'developers.json');

const readUsers = () => { try { return JSON.parse(fs.readFileSync(usersFile, 'utf8') || '[]'); } catch { return []; } };
const writeUsers = (u) => fs.writeFileSync(usersFile, JSON.stringify(u, null, 2));
const readDevs = () => { try { return JSON.parse(fs.readFileSync(devFile, 'utf8') || '[]'); } catch { return []; } };
const writeDevs = (d) => fs.writeFileSync(devFile, JSON.stringify(d, null, 2));

describe('Developers CRUD', () => {
  const email = `test+${Date.now()}@example.com`;
  let token;
  let devId;

  beforeAll(async () => {
    // create user
    await request(app).post('/auth/signup').send({ name: 'Dev Tester', email, password: 'pass1234' });
    const res = await request(app).post('/auth/login').send({ email, password: 'pass1234' });
    token = res.body.token;
  });

  afterAll(() => {
    // cleanup user and developer
    const users = readUsers().filter(u => u.email !== email);
    writeUsers(users);
    const devs = readDevs().filter(d => d.id !== devId);
    writeDevs(devs);
  });

  test('create developer', async () => {
    const res = await request(app).post('/developers').set('Authorization', `Bearer ${token}`).send({ name: 'Alice', role: 'Frontend', techStack: 'React,Node', experience: 3 });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    devId = res.body.data.id;
  });

  test('get developers requires auth and returns list', async () => {
    const res = await request(app).get('/developers').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  test('update developer', async () => {
    const res = await request(app).put(`/developers/${devId}`).set('Authorization', `Bearer ${token}`).send({ name: 'Alice Updated', role: 'Frontend', techStack: 'React', experience: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Alice Updated');
  });

  test('delete developer', async () => {
    const res = await request(app).delete(`/developers/${devId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
