import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { Category } from "./category";

interface ProductData extends Model {
  id?: string;
  name: string;
  qty: number;
  categoryId: number;
}

const Product = sequelize.define<ProductData>(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // אם אתה רוצה שה-UUID ייווצר אוטומטית
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "qty",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id",
    },
  },
  {
    timestamps: false,
  }
);

Product.belongsTo(Category, { foreignKey: "categoryId", as: "categoryObject" });

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "productsCategory",
});
interface ProductInput extends Optional<ProductData, "id"> {}

export { Product, ProductInput, ProductData };
