import { searchCabinetData } from "../Pages/SearchDashboard";

const GET_TARGET_CABINET = "SearchCabinetData/GET_TARGET_CABINET";
const INITIALIZE = "SearchCabinetData/INITIALIZE";

export const GetTargetCabinet = (data: searchCabinetData[]) => ({
  type: GET_TARGET_CABINET,
  payload: data,
});
export const dataInitialize = (data: searchCabinetData[]) => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: searchCabinetData = {};

type actionType = {
  type: string;
  payload: searchCabinetData[];
};

const SearchCabinet = (state = initialState, action: actionType) => {
  switch (action.type) {
    case GET_TARGET_CABINET:
      console.log(action.payload);
      return action.payload;
    case INITIALIZE:
      return initialState;
    default:
      return state;
  }
};

export default SearchCabinet;
