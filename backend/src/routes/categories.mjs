import express from 'express';
import { getCategories } from '../controllers/categories.mjs';

const router = express.Router();

router.get('/', getCategories);

export default router;
