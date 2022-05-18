import { combineReducers } from "redux";
import SearchType from "./SearchType";
import SearchResponse from "./SearchResponse";

const rootReducer = combineReducers({
  SearchType,
  SearchResponse,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
