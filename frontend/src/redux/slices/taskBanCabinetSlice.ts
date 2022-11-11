import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskBanCabinetData } from "../../type";

const initialState: TaskBanCabinetData = [];

export const taskBanCabinetSlice = createSlice({
  name: "taskBanCabinet",
  initialState,
  reducers: {
    GetBanCabinetResponse: (
      state,
      action: PayloadAction<TaskBanCabinetData>
    ) => {
      return action.payload;
    },
    taskBanCabinetInitialize: (state) => {
      return initialState;
    },
  },
});

export const { GetBanCabinetResponse, taskBanCabinetInitialize } =
  taskBanCabinetSlice.actions;
export default taskBanCabinetSlice.reducer;
