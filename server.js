import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('pages/index'));

app.get('/weapons', async (req, res) => {
  const weapons = await axios.get('https://valorant-api.com/v1/weapons');
  const weaponsList = weapons.data.data.map((weapon) => ({
    name: weapon.displayName,
    image: weapon.displayIcon,
  }));

  res.render('pages/weapons', { weapons: weaponsList });
});

app.get('/skin_themes', async (req, res) => {
  const skinThemes = await axios.get('https://valorant-api.com/v1/bundles');
  const skinThemesList = skinThemes.data.data.map((skinType) => ({
    name: skinType.displayName,
    image: skinType.displayIcon,
  }));

  res.render('pages/skin_themes', { skinThemes: skinThemesList });
});

app.get('/skins', async (req, res) => {
  let filteredSkins;

  if (req.query.weapon_name) {
    const weaponName = req.query.weapon_name;
    const weapons = await axios.get('https://valorant-api.com/v1/weapons');
    const weapon = weapons.data.data.find(
      (weapon) => weapon.displayName.toLowerCase() === weaponName.toLowerCase()
    );
    const skinsToExclude = [`Standard ${weaponName}`, 'Random Favorite Skin'];
    filteredSkins = weapon.skins.filter(
      (skin) => (!skinsToExclude.includes(skin.displayName) && skin.displayIcon)
    );
  }

  if (req.query.skin_theme) {
    const skinTheme = decodeURIComponent(req.query.skin_theme);
    const allSkins = await axios.get('https://valorant-api.com/v1/weapons/skins');
    filteredSkins = allSkins.data.data.filter(
      (skin) => (skin.displayName.includes(skinTheme) && skin.displayIcon)
    );
  }

  const page = parseInt(req.query.page) || 1;
  const pageSize = 12;
  const offset = (page - 1) * pageSize;
  const paginatedSkins = filteredSkins.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(filteredSkins.length / pageSize);

  res.render('pages/skins', {
    weapon_name: req.query.weapon_name || req.query.skin_theme,
    currentPage: page,
    totalPages: totalPages,
    skins: paginatedSkins,
  });
});

app.get('/skins/:skin_id', async (req, res) => {
  const skinId = req.params.skin_id;
  const skin = await axios.get(
    `https://valorant-api.com/v1/weapons/skins/${skinId}`
  );
  const skinData = skin?.data?.data;

  if (!skinData) {
    return res.status(404).send('Skin not found');
  }

  res.status(200).json(skinData);
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
