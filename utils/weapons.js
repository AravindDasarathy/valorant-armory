import axios from 'axios';

const fetchWeapons = async () => {
  const skinThemes = await axios.get('https://valorant-api.com/v1/weapons');

  return skinThemes.data.data;
};

export { fetchWeapons };