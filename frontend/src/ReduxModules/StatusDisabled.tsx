import { StatusResponseDisabledData } from "../DataTypes";

const GET_TARGET_RESPONSE = "StatusDisabled/GET_TARGET_RESPONSE";
const INITIALIZE = "StatusDisabled/INITIALIZE";

export const GetDisabledResponse = (data: StatusResponseDisabledData) => ({
  type: GET_TARGET_RESPONSE,
  payload: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: StatusResponseDisabledData = [];

type actionType = {
  type: string;
  payload: StatusResponseDisabledData;
};

const StatusDisabled = (state = initialState, action: actionType) => {
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

export default StatusDisabled;
