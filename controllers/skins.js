import {
  getAllSkins,
  getSkinsForWeapon,
  filterSkinsBySkinTheme,
  paginateSkins,
  fetchSkinById,
  excludeUnwantedSkins
} from '../utils/index.js';

const getSkins = async (req, res) => {
  let title;
  let queryName = '';
  let skins;
  const { weapon_name, skin_theme, key } = req.query;


  if (weapon_name) {
    title = `${weapon_name} Skins`;
    skins = await getSkinsForWeapon(weapon_name);
    skins = excludeUnwantedSkins(skins, weapon_name);
  } else if (skin_theme) {
    title = `${skin_theme} Skins`;
    skins = await filterSkinsBySkinTheme(skin_theme);
  } else {
    title = 'All Skins';
    skins = await getAllSkins();
  }

  if (key) {
    skins = skins.filter(skin => skin.displayName.toLowerCase().includes(key.toLowerCase()));
  }

  const { currentPage, totalPages, paginatedSkins } = paginateSkins(skins, req.query.page);

  res.render('pages/skins', {
    title,
    name: weapon_name || skin_theme,
    query_name: queryName,
    current_path: req.originalUrl,
    currentPage,
    totalPages,
    skins: paginatedSkins,
  });
};

const getSkinById = async (req, res) => {
  const { skin_id: skinId } = req.params;
  const skin = await fetchSkinById(skinId);

  if (!skin) {
    return res.status(404).send('Skin not found');
  }

  res.status(200).json(skin);
};

export {
  getSkins,
  getSkinById
};