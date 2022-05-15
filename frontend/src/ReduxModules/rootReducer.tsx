import { combineReducers } from "redux";
import SearchCabinet from "./SearchCabinet";

const rootReducer = combineReducers({
  SearchCabinet,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
