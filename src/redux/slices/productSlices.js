import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
      return state;
    },
  },
});

export const { addProducts } = productSlice.actions;
export const productSelector = (state) => state.auth;
export default productSlice.reducer;