import request from 'supertest';
import app from '../../../src/server';

describe('GET /api/merchants', () => {
  it('should return an array of merchants', async () => {
    const res = await request(app).get('/api/merchants').expect(200);

    expect(res.body.length).toEqual(4);
  });
});

describe('GET /api/merchants', () => {
  it('should return a merchant with given id', async () => {
    const res = await request(app).get('/api/merchants/1').expect(200);

    expect(res.body.name).toEqual('Merchant 1');
  });
});

describe('GET /api/merchants', () => {
  it("should return an error('Merchant not found')", async () => {
    const res = await request(app).get('/api/merchants/25').expect(404);

    expect(res.body.error).toEqual('Merchant not found');
  });
});

describe('POST /api/merchants', () => {
  it('should create a new merchant', async () => {
    const merchant = { name: 'Merchant Name 1' };
    const res = await request(app).post('/api/merchants').send(merchant).expect(201);

    expect(res.body.id).toEqual(5);
    expect(res.body.name).toEqual('Merchant Name 1');
  });
});

describe('POST /api/merchants', () => {
  it("should return an error ('Merchant name already in use')", async () => {
    const merchant = { name: 'Merchant Name 1' };
    const res = await request(app).post('/api/merchants').send(merchant).expect(400);

    expect(res.body.error).toEqual('Merchant name already in use');
  });
});

describe('POST /api/merchants', () => {
  it('should return an error (validation error)', async () => {
    const merchant = { merchant: 'Merchant Name 4' };
    const res = await request(app).post('/api/merchants').send(merchant).expect(400);

    expect(res.body.error).toEqual('"name" is required');
  });
});

describe('PATCH /api/merchants', () => {
  it('should update the merchant name', async () => {
    const merchant = { name: 'New Merchants Name 1' };
    const res = await request(app).patch('/api/merchants/1').send(merchant).expect(200);

    expect(res.body.name).toEqual('New Merchants Name 1');
  });
});

describe('PATCH /api/merchant', () => {
  it('should return an error (validation error)', async () => {
    const merchant = { merchant: 'Merchant Name 4' };
    const res = await request(app).patch('/api/merchants/1').send(merchant).expect(400);

    expect(res.body.error).toEqual('"name" is required');
  });
});

describe('PATCH /api/merchants', () => {
  it("should return an error ('Merchant not found')", async () => {
    const merchant = { name: 'Merchant Name 25' };
    const res = await request(app).patch('/api/merchants/25').send(merchant).expect(404);

    expect(res.body.error).toEqual('Merchant not found');
  });
});
