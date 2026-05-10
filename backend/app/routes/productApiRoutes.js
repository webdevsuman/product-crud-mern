import { Router } from "express";
import productController from "../controllers/productController.js";
const router = Router();

router.post("/products", productController.createProduct);
router.get("/products", productController.getProduct);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProductById);
router.delete("/products/:id", productController.deleteProduct);

export default router;
