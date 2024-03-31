import request from 'supertest';
import app from '../app.js';

describe('Index Page', () => {
  test('it renders correctly with HTTP 200 status', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Valorant Armory');
  });

  test('it should render categories correctly', async () => {
    const response = await request(app).get('/');

    expect(response.text).toMatch(/Weapons/);
    expect(response.text).toMatch(/Skin Themes/);
    expect(response.text).toMatch(/Skins/);
  });

  test('it should have its cards bound to the correct links', async () => {
    const response = await request(app).get('/');

    expect(response.text).toMatch(/href="\/weapons"/);
    expect(response.text).toMatch(/href="\/skin_themes"/);
    expect(response.text).toMatch(/href="\/skins"/);
  });
});