const GET_TARGET_TEXT = "SearchText/GET_TARGET_TEXT";
const INITIALIZE = "SearchText/INITIALIZE";

export const GetTargetText = (data: string) => ({
  type: GET_TARGET_TEXT,
  searchText: data,
});
export const dataInitialize = () => ({
  type: INITIALIZE,
  searchText: "",
});

type actionType = {
  type: string;
  searchText: string;
};

const SearchText = (state = "", action: actionType) => {
  switch (action.type) {
    case GET_TARGET_TEXT:
      console.log(action.searchText);
      return action.searchText;
    case INITIALIZE:
      return "";
    default:
      return state;
  }
};

export default SearchText;
