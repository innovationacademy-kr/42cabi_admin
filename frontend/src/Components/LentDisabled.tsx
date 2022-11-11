// import { useSelector, shallowEqual } from "react-redux";
// import { RootState } from "../ReduxModules/rootReducer";
import { useAppSelector } from "../redux/hook";
import styled from "styled-components";

const LentDisabledInfo = () => {
  // const SearchResponseRedux = useSelector(
  //   (state: RootState) => state.SearchResponse,
  //   shallowEqual
  // );
  const SearchResponseRedux = useAppSelector((state) => state.searchResponse);

  if (
    SearchResponseRedux.resultFromLent !== undefined &&
    SearchResponseRedux.resultFromLent.length !== 0 &&
    SearchResponseRedux.resultFromLent[0].lent_id !== null &&
    SearchResponseRedux.resultFromLent[0].activation === 0
  ) {
    return <AlertMessage>사용 불가인 사물함을 대여 중입니다!</AlertMessage>;
  } else {
    return <></>;
  }
};

const AlertMessage = styled.div`
  font-size: 1.9rem;
  font-weight: bold;
  color: #6667ab;
  margin-top: 1rem;
  @media screen and (max-width: 380px) {
    font-size: 5vw;
  }
`;

export default LentDisabledInfo;
