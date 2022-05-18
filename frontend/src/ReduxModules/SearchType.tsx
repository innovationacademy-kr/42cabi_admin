const GET_TARGET_TYPE = "SearchType/GET_TARGET_TYPE";
const INITIALIZE = "SearchType/INITIALIZE";

export const GetTargetType = (data: string) => ({
  type: GET_TARGET_TYPE,
  searchType: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  searchType: "",
});

type actionType = {
  type: string;
  searchType: string;
};

const SearchType = (state = "", action: actionType) => {
  switch (action.type) {
    case GET_TARGET_TYPE:
      console.log(action.searchType);
      return action.searchType;
    case INITIALIZE:
      return "";
    default:
      return state;
  }
};

export default SearchType;
