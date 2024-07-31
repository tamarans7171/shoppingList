import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface CategoryData extends Model {
  id: number;
  name: string;
}

const Category = sequelize.define<CategoryData>(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
  },
  {
    timestamps: false,
  }
);

interface CategoryInput extends Optional<CategoryData, "id"> {}

export { Category, CategoryInput, CategoryData };
