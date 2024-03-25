import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('pages/index'));

app.get('/weapons', async (req, res) => {
  const weapons = await axios.get('https://valorant-api.com/v1/weapons');
  const weaponsList = weapons.data.data.map(weapon => ({
    name: weapon.displayName,
    image: weapon.displayIcon
  }));

  res.render('pages/weapons', { weapons: weaponsList })
});

app.get('/skins', async (req, res) => {
  const weaponName = req.query.weapon_name;
  const weapons = await axios.get('https://valorant-api.com/v1/weapons');
  const weapon = weapons.data.data.find(weapon => weapon.displayName.toLowerCase() === weaponName.toLowerCase());
  const skinsToExclude = [`Standard ${weaponName}`, 'Random Favorite Skin'];
  const filteredSkins = weapon.skins.filter(skin => !skinsToExclude.includes(skin.displayName));

  const page = parseInt(req.query.page) || 1;
  const pageSize = 12;
  const offset = (page - 1) * pageSize;
  const paginatedSkins = filteredSkins.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(filteredSkins.length / pageSize);

  res.render('pages/skins', {
    weapon_name: weaponName,
    currentPage: page,
    totalPages: totalPages,
    skins: paginatedSkins
  });
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
