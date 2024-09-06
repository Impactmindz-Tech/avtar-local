import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsList: [],
  experinceStatus: [],
};

const ExperinceSlice = createSlice({
  name: "ExperinceProduct",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductList: (state, action) => {
      state.productsList = action.payload;
    },
    setExperinceStatus: (state, action) => {
      state.experinceStatus = action.payload;
    },
  },
});

export const { setProducts, setProductList, setExperinceStatus } = ExperinceSlice.actions;

export default ExperinceSlice;
