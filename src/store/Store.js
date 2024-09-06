import { configureStore } from '@reduxjs/toolkit';
import ExperinceSlice from './slice/experinceS/ExperinceSlice';
import ExperinceStatusSlice from './slice/avtar/ExperienceFiltter';
import TourSlice from './slice/TourSlice';
import videoSlice from './slice/videoSlice';

const store = configureStore({
    reducer: {
        [ExperinceSlice.reducerPath]: ExperinceSlice.reducer,
        [ExperinceStatusSlice.reducerPath]: ExperinceStatusSlice.reducer,
        [TourSlice.reducerPath]: TourSlice.reducer,
        [videoSlice.reducerPath]: videoSlice.reducer,
    },

});

export default store;