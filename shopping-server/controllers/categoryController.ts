import { Request, Response } from "express";
// import dbDao from "../dao/dbDao";
import { CategoryInput } from "../models/category";
import { Product } from "../models/product";
import { Category } from "../models/category";
import sequelize from "../config/db";

const addCategory = async (req: Request, res: Response) => {
  try {
    const categoryInput = req.body;
    const category = await Category.create(categoryInput as CategoryInput);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoriesWithProducts = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: "productsCategory",
        },
      ],
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { addCategory, getAllCategories, getCategoriesWithProducts };
