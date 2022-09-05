import { TaskBanCabinetData } from "../type";

const GET_TARGET_RESPONSE = "TaskBanCabinet/GET_TARGET_RESPONSE";
const INITIALIZE = "TaskBanCabinet/INITIALIZE";

export const GetBanCabinetResponse = (data: TaskBanCabinetData) => ({
  type: GET_TARGET_RESPONSE,
  payload: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  payload: {},
});

const initialState: TaskBanCabinetData = [];

type actionType = {
  type: string;
  payload: TaskBanCabinetData;
};

const TaskBanCabinet = (state = initialState, action: actionType) => {
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

export default TaskBanCabinet;
