import express from 'express';
import { getSkins, getSkinById } from '../controllers/skins.js';

const router = express.Router();

router.get('/', getSkins);
router.get('/:skin_id', getSkinById);

export default router;
