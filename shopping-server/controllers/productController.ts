import { Request, Response } from "express";
// import dbDao from "../dao/dbDao";
import { ProductInput } from "../models/product";
import { Product } from "../models/product";
import sequelize from "../config/db";

const addProduct = async (req: Request, res: Response) => {
  try {
    const productInput = req.body;
    const product = await Product.create(productInput as ProductInput);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProducts = async (req: Request, res: Response) => {
  try {
    const productsInput = req.body;
    const products = await Product.bulkCreate(productsInput as ProductInput[]);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addProduct, getAllProducts, addProducts };
