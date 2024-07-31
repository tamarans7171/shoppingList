import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoute";
import productRoutes from "./routes/productRoute";
import sequelize from "./config/db";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
import { initializeDatabase } from "./scripts/initializeDb";

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables created successfully.");
    app.listen(process.env.PORT || 8000, () => {
      console.log("server is listening to port 8000");
      initializeDatabase();
    });
  })
  .catch((error) => {
    console.error("Error syncing tables:", error);
  });
