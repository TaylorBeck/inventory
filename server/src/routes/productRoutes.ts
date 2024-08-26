import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productController';

const router = Router();

// INDEX
router.get('/', getProducts);

// CREATE
router.post('/', createProduct);

export default router;
