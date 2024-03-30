import axios from 'axios';
import { get, set } from './cache.js';

const CACHE_KEY = {
  WEAPONS: 'weapons',
  ALL_SKINS: 'allSkins'
};

const getSkinsForWeapon = async (weaponName) => {
  const cachedWeapons = get(CACHE_KEY.WEAPONS);

  if (cachedWeapons) {
    const weapon = cachedWeapons.find(weapon => weapon.displayName.toLowerCase() === weaponName.toLowerCase());

    return weapon.skins;
  }

  const weapons = await axios.get('https://valorant-api.com/v1/weapons');
  const weapon = weapons.data.data.find(weapon => weapon.displayName.toLowerCase() === weaponName.toLowerCase());

  set(CACHE_KEY.WEAPONS, weapons.data.data);

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

  const cachedAllSkins = get(CACHE_KEY.ALL_SKINS);

  if (cachedAllSkins) {
    const filteredSkins = cachedAllSkins.filter(
      (skin) => (skin.displayName.includes(plainSkinTheme) && skin.displayIcon)
    );

    return filteredSkins;
  }

  const allSkins = await axios.get('https://valorant-api.com/v1/weapons/skins');
  const filteredSkins = allSkins.data.data.filter(
    (skin) => (skin.displayName.includes(plainSkinTheme) && skin.displayIcon)
  );

  set(CACHE_KEY.ALL_SKINS, allSkins.data.data);

  return filteredSkins;
};

const getAllSkins = async () => {
  const cachedAllSkins = get(CACHE_KEY.ALL_SKINS);

  if (cachedAllSkins) {
    return cachedAllSkins;
  }

  const allSkins = await axios.get('https://valorant-api.com/v1/weapons/skins');

  set(CACHE_KEY.ALL_SKINS, allSkins.data.data);

  return allSkins.data.data;
};

const fetchSkinById = async (skinId) => {
  const cacheSkin = get(`skin-${skinId}`);

  if (cacheSkin) {
    return cacheSkin;
  }

  const skin = await axios.get(`https://valorant-api.com/v1/weapons/skins/${skinId}`);

  set(`skin-${skinId}`, skin?.data?.data);

  return skin?.data?.data;
};

export {
  getSkinsForWeapon,
  excludeUnwantedSkins,
  filterSkinsBySkinTheme,
  getAllSkins,
  fetchSkinById
};