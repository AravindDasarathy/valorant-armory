import { fetchSkinThemes } from '../utils/index.js';

const getSkinThemes = async (req, res) => {
  let skinThemes = await fetchSkinThemes();
  const { originalUrl, query: { key } } = req;

  if (key) {
    const plainKey = decodeURIComponent(key);

    skinThemes = skinThemes.filter(skinTheme =>
      skinTheme.name.toLowerCase().includes(plainKey.toLowerCase()));
  }

  res.render('pages/skin_themes', {
    current_path: originalUrl,
    skinThemes
  });
};

export { getSkinThemes };