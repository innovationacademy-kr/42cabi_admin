import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusResponseExpiredData } from "../../type";

const initialState: StatusResponseExpiredData = [];

export const statusExpiredSlice = createSlice({
  name: "statusExpired",
  initialState,
  reducers: {
    GetExpiredResponse: (
      state,
      action: PayloadAction<StatusResponseExpiredData>
    ) => {
      return action.payload;
    },
    statusExpiredInitialize: (state) => {
      return initialState;
    },
  },
});

export const { GetExpiredResponse, statusExpiredInitialize } =
  statusExpiredSlice.actions;
export default statusExpiredSlice.reducer;
