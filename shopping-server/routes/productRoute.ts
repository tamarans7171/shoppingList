import express from "express";
import {
  getAllProducts,
  addProduct,
  addProducts
} from "../controllers/productController";
const router = express.Router();

router.get("/getProducts", getAllProducts);
router.post("/addProduct", addProduct);
router.post("/addProducts", addProducts);

export default router;
