import express from "express";
import {
  getAllCategories,
  addCategory,
  getCategoriesWithProducts
} from "../controllers/categoryController";
const router = express.Router();

router.get("/getCategories", getAllCategories);
router.get("/getCategoriesWithProducts", getCategoriesWithProducts);
router.post("/addCategory", addCategory);

export default router;
