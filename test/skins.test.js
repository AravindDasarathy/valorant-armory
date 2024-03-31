import { jest } from '@jest/globals';
import request from 'supertest';

// Jest support for ESM Modules is still experimental - https://jestjs.io/docs/ecmascript-modules
jest.unstable_mockModule('axios', () => ({
  default: {
    get: jest.fn()
  }
}));

describe('Skins API', () => {
  let axios;
  let app;

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
    axios = (await import('axios')).default;
    app = (await import('../app.js')).default;
  });

  test('should filter skins by weapon name', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            displayName: 'Vandal',
            skins: [
              { displayName: 'Prime Vandal', displayIcon: '/random/image' },
              { displayName: 'Elderflame Vandal', displayIcon: 'random/image' },
              { displayName: 'Sovereign Vandal', displayIcon: '/random/image' }
            ]
          },
          {
            displayName: 'Phantom',
            skins: [
              { displayName: 'Prime Phantom', displayIcon: '/random/image' },
              { displayName: 'Sovereign Phantom', displayIcon: '/random/image' },
            ]
          }
        ]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app).get('/skins?weapon_name=Vandal');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Vandal Skins');
    expect(response.text).not.toContain('Phantom');

    mockResponse.data.data[0].skins.forEach(skin => {
      expect(response.text).toContain(skin.displayName);
    });
  });

  test('should filter skins by skin theme', async () => {
    const mockResponse = {
      data: {
        data: [
          { displayName: 'Prime Vandal', displayIcon: '/random/image' },
          { displayName: 'Prime Phantom', displayIcon: '/random/image' },
          { displayName: 'RGX 11z Pro Vandal', displayIcon: '/random/image' }
        ]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app).get('/skins?skin_theme=Prime');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Prime Skins');
    expect(response.text).not.toContain('RGX 11z Pro Vandal');

    mockResponse.data.data
      .filter((skin) => skin.displayName.includes('Prime'))
      .forEach(skin => {
        expect(response.text).toContain(skin.displayName);
      });
  });

  test('should return all skins', async () => {
    const mockResponse = {
      data: {
        data: [
          { displayName: 'Prime Vandal', displayIcon: '/random/image' },
          { displayName: 'Prime Phantom', displayIcon: '/random/image' },
          { displayName: 'RGX 11z Pro Vandal', displayIcon: '/random/image' }
        ]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app).get('/skins');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('All Skins');

    mockResponse.data.data.forEach(skin => {
      expect(response.text).toContain(skin.displayName);
    });
  });

  test('should filter skins by key', async () => {
    const mockResponse = {
      data: {
        data: [
          { displayName: 'Prime Vandal', displayIcon: '/random/image' },
          { displayName: 'Prime Phantom', displayIcon: '/random/image' },
          { displayName: 'RGX 11z Pro Vandal', displayIcon: '/random/image' }
        ]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app).get('/skins?key=Prime');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('All Skins');

    mockResponse.data.data
      .filter((skin) => skin.displayName.includes('Prime'))
      .forEach(skin => {
        expect(response.text).toContain(skin.displayName);
      });
  });

  test('should get skin by id', async () => {
    const mockResponse = {
      data: {
        data: { displayName: 'Prime Vandal', displayIcon: '/random/image' }
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app).get('/skins/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse.data.data);
  });
});
