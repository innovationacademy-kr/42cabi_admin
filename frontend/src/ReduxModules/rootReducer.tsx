import { combineReducers } from "redux";
import SearchResponse from "./SearchResponse";
import StatusExpired from "./StatusExpired";
import StatusDisabled from "./StatusDisabled";
import TaskBanUser from "./TaskBanUser";
import TaskBanCabinet from "./TaskBanCabinet";

const rootReducer = combineReducers({
  SearchResponse,
  StatusExpired,
  StatusDisabled,
  TaskBanUser,
  TaskBanCabinet,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
