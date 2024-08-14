import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getRequest } from "../Servicies/apiServices";
import { GET_CATEGORIES } from "../Constants/routers";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addProductsToServer, updateProductQuantity } from "../Redux/productsSlice";
import { Product } from "../types";
import { AppDispatch, RootState } from "../Redux/store";

const labelStyle = {
  transformOrigin: "right !important",
  left: "inherit !important",
  right: "1.75rem !important",
  overflow: "unset",
};

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    categoryId: 1,
    qty:1
  });

  const [showError, setShowError] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoriesWithProducts = useSelector(
    (state: RootState) => state.products.categoriesWithProducts
  );
  const dispatch = useDispatch<AppDispatch>();

  const getCategories = async () => {
    getRequest(GET_CATEGORIES).then((res) => {
      setCategories(res);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newProducts: Product[] = [];
    categoriesWithProducts.forEach((category) => {
      category.productsCategory.forEach((product) => {
        if (!product.id) {
          newProducts.push(product);
        }
      });
    });
    dispatch(addProductsToServer(newProducts));
  };

  const handleAddProduct = () => {
    if (newProduct.name === "") setShowError(true);
    else {
      const category = categoriesWithProducts.find(
        (cat) => cat.id === newProduct.categoryId
      );
      if (category) {
        const existingProduct = category.productsCategory.find(
          (product) => product.name === newProduct.name
        );

        if (existingProduct) {
          dispatch(
            updateProductQuantity({
              ...existingProduct,
              qty: existingProduct.qty
                ? existingProduct.qty + 1
                : 1,
            })
          );
        } else {
          dispatch(addProduct(newProduct));
        }
      }
      setShowError(false);
    }

  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: { xs: "h4.fontSize", sm: "h3.fontSize" },
          textAlign: "center",
          color: "grey",
        }}
      >
        הוספת מוצר
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="שם המוצר"
              variant="standard"
              fullWidth
              required
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              InputLabelProps={{
                style: labelStyle,
              }}
            />
            <Typography
              visibility={showError && !newProduct.name ? "inherit" : "hidden"}
              variant="caption"
              color={"red"}
            >
              הכנס שם
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel sx={labelStyle}>קטגוריה</InputLabel>
              <Select
                value={newProduct.categoryId}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    categoryId: e.target.value as number,
                  })
                }
                variant="standard"
                label="Category"
              >
                {categories.map((cat: { id: number; name: string }) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              onClick={handleAddProduct}
              variant="outlined"
              color="primary"
              type="button"
              fullWidth
            >
              הוסף
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" color="primary" type="submit" fullWidth>
              שמירת הפריטים בסל
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProduct;
