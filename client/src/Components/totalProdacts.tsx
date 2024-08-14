import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { getRequest } from "../Servicies/apiServices";
import { GET_PRODUCTS } from "../Constants/routers";
import { setCategoriesWithProducts } from "../Redux/productsSlice";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { CategoryWithProducts } from "../types";

const CardCategory = styled(Card)(() => ({
  width: "250px",
  height: "254px",
  borderRadius: "30px",
  background: "#e0e0e0",
  boxShadow: " 15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
  marginBottom: 2,
}));

const ListContainer = styled(List)(() => ({
  overflowY: "auto",
  height: 145,
  "::-webkit-scrollbar": {
    width: 10,
  },
  "::-webkit-scrollbar-track": {
    background: "white",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#1976d2",
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "#1976ff",
  },
}));

const TotalProdacts = () => {
  const dispatch = useDispatch();
  const categoriesWithProducts = useSelector(
    (state: RootState) => state.products.categoriesWithProducts
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getRequest(GET_PRODUCTS);

        dispatch(setCategoriesWithProducts(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [dispatch]);

  return (
    <Grid
      mt={1}
      container
      spacing={1}
      rowSpacing={3}
      justifyContent={"space-evenly"}
    >
      {categoriesWithProducts.map((category: CategoryWithProducts) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          key={category.id}
          display={"flex"}
          justifyContent={"center"}
        >
          <CardCategory>
            <CardContent>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography variant="h6" component="div" gutterBottom>
                  {category.name}
                </Typography>
                {category.productsCategory.length > 0 && (
                  <Chip
                    label={`${category.productsCategory.reduce((pre,pro)=>pre+pro.qty,0)}`}
                    color="primary"
                    sx={{ marginRight: 1 }}
                  />
                )}
              </Box>
              <hr />
              <ListContainer>
                {category.productsCategory.map((product, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ textAlign: "right" }}>
                      <ListItemText primary={product.name} />
                      {product.qty > 1 && (
                        <Chip
                          label={`${product.qty}`}
                          color="primary"
                          sx={{ marginRight: 1 }}
                        />
                      )}
                    </ListItem>
                    {index < category.productsCategory.length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </ListContainer>
            </CardContent>
          </CardCategory>
        </Grid>
      ))}
    </Grid>
  );
};

export default TotalProdacts;
