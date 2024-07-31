import sequelize from "../config/db";
import { Category } from "../models/category";

export const initializeDatabase = async () => {
  if ((await Category.findAll()).length === 0)
    try {
      await sequelize.sync({ force: true });

      await Category.bulkCreate([
        { name: "מוצרי חלב" },
        { name: "לחמים" },
        { name: "ניקיון" },
        { name: "פירות וירקות" },
        { name: "מיני מתיקה" },
      ]);

      console.log("Database initialized with default categories.");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
};

