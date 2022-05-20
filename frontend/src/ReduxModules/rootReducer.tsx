import { combineReducers } from "redux";
import SearchType from "./SearchType";
import SearchResponse from "./SearchResponse";
import StatusExpired from "./StatusExpired";
import StatusDisabled from "./StatusDisabled";

const rootReducer = combineReducers({
  SearchType,
  SearchResponse,
  StatusExpired,
  StatusDisabled,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
