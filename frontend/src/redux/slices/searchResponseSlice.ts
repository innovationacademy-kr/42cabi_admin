import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResponseData } from "../../type";

const initialState: SearchResponseData = {};

export const searchResponseSlice = createSlice({
  name: "searchResponse",
  initialState,
  reducers: {
    GetTargetResponse: (state, action: PayloadAction<SearchResponseData>) => {
      return action.payload;
    },
    searchResponseInitialize: (state) => {
      return initialState;
    },
  },
});

export const { GetTargetResponse, searchResponseInitialize } =
  searchResponseSlice.actions;
export default searchResponseSlice.reducer;
