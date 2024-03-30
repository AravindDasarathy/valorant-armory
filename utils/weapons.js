import axios from 'axios';
import { get, set } from './cache.js';

const CACHE_KEY = 'weapons';

const fetchWeapons = async () => {
  const cachedWeapons = get(CACHE_KEY);

  if (cachedWeapons) {
    return cachedWeapons;
  }

  const skinThemes = await axios.get('https://valorant-api.com/v1/weapons');

  set(CACHE_KEY, skinThemes.data.data);

  return skinThemes.data.data;
};

export { fetchWeapons };