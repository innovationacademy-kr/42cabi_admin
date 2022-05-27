import styled from "styled-components";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";

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

const PrevLogBox = styled.div`
  display: flex;
  // border: 0.5rem solid gray;
  padding: 16.5rem 2rem 16.5rem 2rem;
  font-size: 2rem;
  justify-content: center;
  margin: 1rem;
`;

export default NoPrevLog;
