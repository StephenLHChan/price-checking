import request from 'supertest';
import app from '../../../src/server';

describe('GET /api/brands', () => {
  it('should return an array of brands', async () => {
    const res = await request(app).get('/api/brands').expect(200);

    expect(res.body.length).toEqual(4);
  });
});

describe('GET /api/brands', () => {
  it('should return a brand with given id', async () => {
    const res = await request(app).get('/api/brands/1').expect(200);

    expect(res.body.name).toEqual('Brand 1');
  });
});

describe('GET /api/brands', () => {
  it("should return an error('Brand not found')", async () => {
    const res = await request(app).get('/api/brands/25').expect(404);

    expect(res.body.error).toEqual('Brand not found');
  });
});

describe('POST /api/brands', () => {
  it('should create a new brand', async () => {
    const brand = { name: 'Brand Name 1' };
    const res = await request(app).post('/api/brands').send(brand).expect(201);

    expect(res.body.id).toEqual(5);
    expect(res.body.name).toEqual('Brand Name 1');
  });
});

describe('POST /api/brands', () => {
  it("should return an error ('Brand name already in use')", async () => {
    const brand = { name: 'Brand Name 1' };
    const res = await request(app).post('/api/brands').send(brand).expect(400);

    expect(res.body.error).toEqual('Brand name already in use');
  });
});

describe('POST /api/brands', () => {
  it('should return an error (validation error)', async () => {
    const brand = { brand: 'Brand Name 4' };
    const res = await request(app).post('/api/brands').send(brand).expect(400);

    expect(res.body.error).toEqual('"name" is required');
  });
});

describe('POST /api/brands', () => {
  it('should return an error (validation error)', async () => {
    const brand = {
      name: 'Brand Name 4',
      description: 123,
    };
    const res = await request(app).post('/api/brands').send(brand).expect(400);

    expect(res.body.error).toEqual('"description" must be a string');
  });
});

describe('PATCH /api/brands', () => {
  it('should update the brand name', async () => {
    const brand = { name: 'New Brand Name 1' };
    const res = await request(app).patch('/api/brands/1').send(brand).expect(200);

    expect(res.body.name).toEqual('New Brand Name 1');
  });
});

describe('PATCH /api/brands', () => {
  it('should return an error (validation error)', async () => {
    const brand = { brand: 'Brand Name 4' };
    const res = await request(app).patch('/api/brands/1').send(brand).expect(400);

    expect(res.body.error).toEqual('"name" is required');
  });
});

describe('PATCH /api/brands', () => {
  it("should return an error ('Brand not found')", async () => {
    const brand = { name: 'Brand Name 25' };
    const res = await request(app).patch('/api/brands/25').send(brand).expect(404);

    expect(res.body.error).toEqual('Brand not found');
  });
});
