import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct } from "../controllers/products.controller.js";
const router = express.Router();
// console.log("router = ", router);
router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
