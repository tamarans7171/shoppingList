import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
  }
);

export default sequelize;
