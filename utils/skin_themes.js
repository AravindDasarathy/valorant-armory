import axios from 'axios';

const fetchSkinThemes = async () => {
  const skinThemes = await axios.get('https://valorant-api.com/v1/bundles');

  const skinThemesList = skinThemes.data.data.map((skinType) => ({
    name: skinType.displayName,
    image: skinType.displayIcon,
  }));

  return skinThemesList;
};

export { fetchSkinThemes };