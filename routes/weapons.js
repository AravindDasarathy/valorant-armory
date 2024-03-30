import express from 'express';
import { getWeapons } from '../controllers/weapons.js';

const router = express.Router();

router.get('/', getWeapons);

export default router;
