import axios from 'axios';

const fetchSkinThemes = async () => {
  const skinThemes = await axios.get('https://valorant-api.com/v1/bundles');

  return skinThemes.data.data;
};

export { fetchSkinThemes };