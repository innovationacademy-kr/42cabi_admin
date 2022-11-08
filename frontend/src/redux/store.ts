import { configureStore } from "@reduxjs/toolkit";
import taskBanCabinetSlice from "./slices/taskBanCabinetSlice";
import taskBanUserSlice from "./slices/taskBanUserSlice";
import statusExpiredSlice from "./slices/statusExpiredSlice";
import statusDisabledSlice from "./slices/statusDisabledSlice";
import searchResponseSlice from "./slices/searchResponseSlice";

const store = configureStore({
  reducer: {
    // reducerName: reducer
    taskBanUser: taskBanUserSlice,
    taskBanCabinet: taskBanCabinetSlice,
    statusExpired: statusExpiredSlice,
    statusDisable: statusDisabledSlice,
    searchResponse: searchResponseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
