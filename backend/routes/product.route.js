import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';
import { getProducts } from '../controller/product.controller.js';
import { createProduct } from '../controller/product.controller.js';
import { updateProduct } from '../controller/product.controller.js';
import { deleteProduct } from '../controller/product.controller.js';
const router = express.Router();
router.get("/",getProducts);
router.put("/:id",updateProduct);
  router.delete("/:id", deleteProduct)
router.post("/",createProduct);

export default router;