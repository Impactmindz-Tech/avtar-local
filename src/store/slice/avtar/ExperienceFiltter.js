import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experinceStatuss: [],
  experinceList: [],
};

const ExperinceStatusSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setExperinceStatus: (state, action) => {
      state.experinceStatuss = action.payload;
    },
    setExperinceList: (state, action) => {
      state.experinceList = action.payload;
    },
  },
});

export const { setExperinceStatus, setExperinceList } = ExperinceStatusSlice.actions;

export default ExperinceStatusSlice;
