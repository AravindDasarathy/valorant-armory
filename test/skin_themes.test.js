import { jest } from '@jest/globals';
import request from 'supertest';

const setupMockedSkinThemes = () => {
  const mockedSkinThemes = [
    {
      name: 'Glitchpop',
      image: '/images/glitchpop.png',
    },
    {
      name: 'Elderflame',
      image: '/images/elderflame.png',
    },
  ];

  // Jest support for ESM Modules is still experimental - https://jestjs.io/docs/ecmascript-modules

  jest.unstable_mockModule('../utils/skin_themes.js', () => ({
    fetchSkinThemes: jest.fn().mockResolvedValue(mockedSkinThemes)
  }));

  return mockedSkinThemes;
};

describe('Skin Themes List', () => {
  let mockedSkinThemes;
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
    mockedSkinThemes = setupMockedSkinThemes();
    app = (await import('../app.js')).default;
  });

  test('it loads successfully with a status code of 200', async () => {
    const response = await request(app).get('/skin_themes');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Skin Theme Gallery');
  });

  test('it renders skin theme cards based on the skin themes data', async () => {
    const response = await request(app).get('/skin_themes');

    mockedSkinThemes.forEach(skinTheme => {
      expect(response.text).toContain(skinTheme.name);
      expect(response.text).toContain(skinTheme.image);
    });
  });
});
