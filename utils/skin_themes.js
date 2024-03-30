import axios from 'axios';
import { get, set } from './cache.js';

const CACHE_KEY = 'skinThemes';

const fetchSkinThemes = async () => {
  const cachedSkinThemes = get(CACHE_KEY);

  if (cachedSkinThemes) {
    return cachedSkinThemes;
  }

  const skinThemes = await axios.get('https://valorant-api.com/v1/bundles');

  const skinThemesList = skinThemes.data.data.map((skinType) => ({
    name: skinType.displayName,
    image: skinType.displayIcon,
  }));

  set(CACHE_KEY, skinThemesList);

  return skinThemesList;
};

export { fetchSkinThemes };