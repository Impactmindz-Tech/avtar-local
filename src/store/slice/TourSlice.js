import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourDetails: [],
};

const TourSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setTourDetails: (state, action) => {
      state.tourDetails = action.payload;
    },
  },
});

export const { setTourDetails } = TourSlice.actions;

export default TourSlice;
