import { combineReducers } from "redux";
import SearchCabinet from "./SearchCabinet";
import SearchUser from "./SearchUser";
import SearchType from "./SearchType";
import SearchText from "./SearchText";

const rootReducer = combineReducers({
  SearchCabinet,
  SearchUser,
  SearchType,
  SearchText,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
