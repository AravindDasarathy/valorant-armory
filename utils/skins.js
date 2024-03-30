import axios from 'axios';

const getSkinsForWeapon = async (weaponName) => {
  const weapons = await axios.get('https://valorant-api.com/v1/weapons');
  const weapon = weapons.data.data.find(weapon => weapon.displayName.toLowerCase() === weaponName.toLowerCase());

  return weapon.skins;
};

const excludeUnwantedSkins = (skins, weaponName) => {
  const skinsToExclude = [`Standard ${weaponName}`, 'Random Favorite Skin'];
  const filteredSkins = skins.filter(
    (skin) => (!skinsToExclude.includes(skin.displayName) && skin.displayIcon)
  );

  return filteredSkins;
};

const filterSkinsBySkinTheme = async (skinTheme) => {
  const plainSkinTheme = decodeURIComponent(skinTheme);
  const allSkins = await axios.get('https://valorant-api.com/v1/weapons/skins');
  const filteredSkins = allSkins.data.data.filter(
    (skin) => (skin.displayName.includes(plainSkinTheme) && skin.displayIcon)
  );

  return filteredSkins;
};

const getAllSkins = async () => {
  const allSkins = await axios.get('https://valorant-api.com/v1/weapons/skins');

  return allSkins.data.data;
};

const fetchSkinById = async (skinId) => {
  const skin = await axios.get(`https://valorant-api.com/v1/weapons/skins/${skinId}`);

  return skin?.data?.data;
};

export {
  getSkinsForWeapon,
  excludeUnwantedSkins,
  filterSkinsBySkinTheme,
  getAllSkins,
  fetchSkinById
};