import { searchUserData } from "../DataTypes";

const GET_TARGET_USER = "SearchUser/GET_TARGET_USER";
const INITIALIZE = "SearchUser/INITIALIZE";

export const GetTargetUser = (data: searchUserData) => ({
  type: GET_TARGET_USER,
  payload: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: searchUserData = {};

type actionType = {
  type: string;
  payload: searchUserData;
};

const SearchUser = (state = initialState, action: actionType) => {
  switch (action.type) {
    case GET_TARGET_USER:
      console.log(action.payload);
      return action.payload;
    case INITIALIZE:
      return initialState;
    default:
      return state;
  }
};

export default SearchUser;
