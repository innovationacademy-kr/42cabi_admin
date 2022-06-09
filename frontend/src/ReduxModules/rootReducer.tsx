import { combineReducers } from "redux";
import SearchResponse from "./SearchResponse";
import StatusExpired from "./StatusExpired";
import StatusDisabled from "./StatusDisabled";

const rootReducer = combineReducers({
  SearchResponse,
  StatusExpired,
  StatusDisabled,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
