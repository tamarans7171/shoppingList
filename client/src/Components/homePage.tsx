import React, { useEffect } from "react";
import AddProduct from "./addProduct";
import TotalProdacts from "./totalProdacts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Alert, Box, Snackbar } from "@mui/material";
import { clearStatus } from "../Redux/productsSlice";

const HomePage = () => {
  const status = useSelector((state: RootState) => state.products.status);
  const dispatch = useDispatch();

  return (
    <Box mx={10}>
      <AddProduct />
      <TotalProdacts />

      {status !== "idle" && (
        <Snackbar
        open
          autoHideDuration={null} // כי נשתמש ב-setTimeout במקום
          onClose={() => dispatch(clearStatus())}
        >
          <Alert
            variant="filled"
            onClose={() => dispatch(clearStatus())}
            severity={status === "succeeded" ? "success" : "error"} // לפי סוג הסטטוס (success, error וכו')
          >
            {status === "succeeded"
              ? "המוצרים נשמרו בהצלחה!"
              : "אירעה שגיאה, נסה שנית מאוחר יותר"}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default HomePage;
