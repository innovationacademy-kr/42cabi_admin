import { configureStore } from "@reduxjs/toolkit";
import taskBanCabinetSlice from "./slices/taskBanCabinetSlice";
import taskBanUserSlice from "./slices/taskBanUserSlice";

const store = configureStore({
  reducer: {
    // reducerName: reducer
    taskBanUser: taskBanUserSlice,
    taskBanCabinet: taskBanCabinetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
