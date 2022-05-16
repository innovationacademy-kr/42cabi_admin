import { combineReducers } from "redux";
import SearchCabinet from "./SearchCabinet";
import SearchUser from "./SearchUser";
import SearchType from "./SearchType";

const rootReducer = combineReducers({
  SearchCabinet,
  SearchUser,
  SearchType,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
