import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskBanCabinetData } from "../../type";

// Define the initial state using that type
const initialState: TaskBanCabinetData = [];

export const taskBanCabinetSlice = createSlice({
  name: "taskBanCabinet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
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
