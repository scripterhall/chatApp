const mongoose = require('mongoose');
const app = require('../index');
const request = require('supertest');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/messages', () => {
    it('should return a list of messages', async () => {
        const response = await request(app).get('/api/messages');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('messages');
    });
});
