import {jest} from '@jest/globals'
import request from 'supertest';

describe('Weapons Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it loads successfully with a status code of 200', async () => {
    const mockedWeapons = [
      { displayName: 'Vandal', displayIcon: '/random/image' },
      { displayName: 'Phantom', displayIcon: '/random/image' }
    ];

    jest.unstable_mockModule('../utils/weapons.js', () => ({
      fetchWeapons: jest.fn().mockResolvedValue(mockedWeapons)
    }));

    const { default: app } = await import('../app.js');

    const response = await request(app).get('/weapons');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Weapons Gallery');
  });

  test('it renders weapon cards based on the weapons data', async () => {
    const mockedWeapons = [
      { displayName: 'Vandal', displayIcon: '/random/image' },
      { displayName: 'Phantom', displayIcon: '/random/image' }
    ];

    jest.unstable_mockModule('../utils/weapons.js', () => ({
      fetchWeapons: jest.fn().mockResolvedValue(mockedWeapons)
    }));

    const { default: app } = await import('../app.js');

    const response = await request(app).get('/weapons');

    mockedWeapons.forEach(weapon => {
      expect(response.text).toContain(weapon.displayName);
      expect(response.text).toContain(weapon.displayIcon);
    });
  });
});