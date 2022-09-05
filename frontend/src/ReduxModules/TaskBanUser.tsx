import { TaskBanUserData } from "../type";

const GET_TARGET_RESPONSE = "TaskBanUser/GET_TARGET_RESPONSE";
const INITIALIZE = "TaskBanUser/INITIALIZE";

export const GetBanUserResponse = (data: TaskBanUserData) => ({
  type: GET_TARGET_RESPONSE,
  payload: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: TaskBanUserData = [];

type actionType = {
  type: string;
  payload: TaskBanUserData;
};

const TaskBanUser = (state = initialState, action: actionType) => {
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

export default TaskBanUser;
