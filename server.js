import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { weaponRouter, skinThemeRouter, skinRouter } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/weapons', weaponRouter);
app.use('/skin_themes', skinThemeRouter);
app.use('/skins', skinRouter);

app.get('/', (req, res) => res.render('pages/index'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
