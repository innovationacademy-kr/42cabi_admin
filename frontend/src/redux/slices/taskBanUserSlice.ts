import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskBanUserData } from "../../type";

// Define the initial state using that type
const initialState: TaskBanUserData = [];

export const taskBanUserSlice = createSlice({
  name: "taskBanUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    GetBanUserResponse: (state, action: PayloadAction<TaskBanUserData>) => {
      return action.payload;
    },
    taskBanUserInitialize: (state) => {
      return initialState;
    },
  },
});

export const { GetBanUserResponse, taskBanUserInitialize } =
  taskBanUserSlice.actions;
export default taskBanUserSlice.reducer;
