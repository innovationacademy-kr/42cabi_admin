import CabiButton from "./CabiButton";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";

const ButtonSet = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const isLent: boolean = SearchResponseRedux.resultFromLent?.length !== 0;
  return (
    <div>
      <CabiButton Color="#6667ab" isActive={isLent}>
        반납하기
      </CabiButton>
      <CabiButton Color="#6667ab" isActive={isLent}>
        연장처리
      </CabiButton>
      <CabiButton Color="#6667ab" isActive={isLent}>
        상태관리
      </CabiButton>
      <CabiButton Color="#6667ab" isActive={true}>
        슬랙 메시지 전송
      </CabiButton>
    </div>
  );
};

export default ButtonSet;
