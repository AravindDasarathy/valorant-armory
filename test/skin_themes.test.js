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

  jest.unstable_mockModule('../utils/skin_themes.js', () => ({
    fetchSkinThemes: jest.fn().mockResolvedValue(mockedSkinThemes)
  }));

  return mockedSkinThemes;
};

describe('Skin Themes List', () => {
  let mockedSkinThemes;
  let app;

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
