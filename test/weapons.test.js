import { jest } from '@jest/globals';
import request from 'supertest';

const setupMockedWeapons = () => {
  const mockedWeapons = [
    { displayName: 'Vandal', displayIcon: '/random/image' },
    { displayName: 'Phantom', displayIcon: '/random/image' }
  ];

  // Jest support for ESM Modules is still experimental - https://jestjs.io/docs/ecmascript-modules
  jest.unstable_mockModule('../utils/weapons.js', () => ({
    fetchWeapons: jest.fn().mockResolvedValue(mockedWeapons)
  }));

  return mockedWeapons;
};

describe('Weapons Page', () => {
  let app;
  let mockedWeapons;

  /*
  * https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm
  *
  * "Since ESM evaluates static import statements before looking at the code,
  * the hoisting of jest.mock calls that happens in CJS won't work for ESM.
  * To mock modules in ESM, you need to use require or dynamic import() after jest.mock calls
  * to load the mocked modules - the same applies to modules which load the mocked modules."
  */
  beforeEach(async () => {
    jest.clearAllMocks();
    mockedWeapons = setupMockedWeapons();
    app = (await import('../app.js')).default;
  });

  test('it loads successfully with a status code of 200', async () => {
    const response = await request(app).get('/weapons');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Weapons Gallery');
  });

  test('it renders weapon cards based on the weapons data', async () => {
    const response = await request(app).get('/weapons');

    mockedWeapons.forEach(weapon => {
      expect(response.text).toContain(weapon.displayName);
      expect(response.text).toContain(weapon.displayIcon);
    });
  });
});
