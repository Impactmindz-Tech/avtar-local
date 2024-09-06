// redux/slices/videoSlice.js
import { getLocalStorage, setLocalStorage } from '@/utills/LocalStorageUtills';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stream: getLocalStorage("roomId") || null,
  roomId: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setStream(state, action) {
      state.stream = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = setLocalStorage("roomId" , action.payload);
    },
    clearStream(state) {
      state.stream = null;
    },
  },
});

export const { setStream, clearStream, setRoomId } = videoSlice.actions;
export default videoSlice;
