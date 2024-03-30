import express from 'express';
import { getSkinThemes } from '../controllers/skin_themes.js';

const router = express.Router();

router.get('/', getSkinThemes);

export default router;
