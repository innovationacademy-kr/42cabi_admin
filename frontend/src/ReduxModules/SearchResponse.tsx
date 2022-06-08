import { SearchResponseData } from "../type";

const GET_TARGET_RESPONSE = "SearchResponse/GET_TARGET_RESPONSE";
const INITIALIZE = "SearchResponse/INITIALIZE";

export const GetTargetResponse = (data: SearchResponseData) => ({
  type: GET_TARGET_RESPONSE,
  payload: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: SearchResponseData = {};

type actionType = {
  type: string;
  payload: SearchResponseData;
};

const SearchResponse = (state = initialState, action: actionType) => {
  switch (action.type) {
    case GET_TARGET_RESPONSE:
      // console.log(action.payload);
      return action.payload;
    case INITIALIZE:
      return initialState;
    default:
      return state;
  }
};

export default SearchResponse;
