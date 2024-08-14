import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryWithProducts, Product } from "../types";
import { getRequest, postRequest } from "../Servicies/apiServices";
import { ADD_PRODUCTS } from "../Constants/routers";

interface CategoriesWithProductsState {
  categoriesWithProducts: CategoryWithProducts[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoriesWithProductsState = {
  categoriesWithProducts: [],
  status: "idle",
  error: null,
};

export const addProductsToServer = createAsyncThunk(
  "categoriesWithProducts/addProductsToServer",
  async (products: Product[], thunkAPI) => {
    try {
      const response = await postRequest(ADD_PRODUCTS, products);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const productsSlice = createSlice({
  name: "categoriesWithProducts",
  initialState,
  reducers: {
    setCategoriesWithProducts(
      state,
      action: PayloadAction<CategoryWithProducts[]>
    ) {
      state.categoriesWithProducts = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.categoriesWithProducts = state.categoriesWithProducts.map(
        (category) => {
          if (category.id === action.payload.categoryId) {
            return {
              ...category,
              productsCategory: [...category.productsCategory, action.payload],
            };
          }
          return category;
        }
      );
    },
    updateProductQuantity(state, action: PayloadAction<Product>) {
      state.categoriesWithProducts = state.categoriesWithProducts.map(
        (category) => {
          if (category.id === action.payload.categoryId) {
            return {
              ...category,
              productsCategory: category.productsCategory.map((pro) => {
                if (pro.id === action.payload.id) {
                  return action.payload;
                } else return pro;
              }),
            };
          }
          return category;
        }
      );
    },
    clearStatus(state) {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductsToServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductsToServer.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addProductsToServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  setCategoriesWithProducts,
  addProduct,
  clearStatus,
  updateProductQuantity,
} = productsSlice.actions;
export default productsSlice.reducer;
