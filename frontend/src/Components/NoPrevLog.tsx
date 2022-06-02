import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";
import { PrevLogBox } from "./DashboardStyleComponent";

const NoPrevLog = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );

  if (
    SearchResponseRedux.resultFromLent === undefined ||
    (SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent.length === 0)
  ) {
    return <></>;
  } else {
    return <PrevLogBox>이전 사용 기록이 없습니다.</PrevLogBox>;
  }
};

export default NoPrevLog;
