import { fetchWeapons } from '../utils/index.js';

const getWeapons = async (req, res) => {
  const weapons = await fetchWeapons();
  let weaponsList = weapons.map((weapon) => ({
    name: weapon.displayName,
    image: weapon.displayIcon,
  }));

  if (req.query.key) {
    weaponsList = weaponsList.filter(weapon =>
      weapon.name.toLowerCase().includes(req.query.key.toLowerCase()));
  }

  res.render('pages/weapons', {
    current_path: req.originalUrl,
    weapons: weaponsList
  });
};

export { getWeapons };