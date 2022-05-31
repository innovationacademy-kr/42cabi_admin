import { StatusResponseExpiredData } from "../type";

const GET_TARGET_RESPONSE = "StatusExpired/GET_TARGET_RESPONSE";
const INITIALIZE = "StatusExpired/INITIALIZE";

export const GetExpiredResponse = (data: StatusResponseExpiredData) => ({
  type: GET_TARGET_RESPONSE,
  payload: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: StatusResponseExpiredData = [];

type actionType = {
  type: string;
  payload: StatusResponseExpiredData;
};

const StatusExpired = (state = initialState, action: actionType) => {
  switch (action.type) {
    case GET_TARGET_RESPONSE:
      console.log(action.payload);
      return action.payload;
    case INITIALIZE:
      return initialState;
    default:
      return state;
  }
};

export default StatusExpired;
