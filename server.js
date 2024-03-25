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

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
