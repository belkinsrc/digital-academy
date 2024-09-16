import express from 'express';
import { getProducts, getProductsById } from '../controllers/products.mjs';

const router = express.Router();

router.get('/', getProducts);
router.post('/', getProductsById)

export default router;