import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusResponseDisabledData } from "../../type";

const initialState: StatusResponseDisabledData = [];

export const statusDisabledSlice = createSlice({
  name: "statusDisabled",
  initialState,
  reducers: {
    GetDisabledResponse: (
      state,
      action: PayloadAction<StatusResponseDisabledData>
    ) => {
      return action.payload;
    },
    statusDisabledInitialize: (state) => {
      return initialState;
    },
  },
});

export const { GetDisabledResponse, statusDisabledInitialize } =
  statusDisabledSlice.actions;
export default statusDisabledSlice.reducer;
