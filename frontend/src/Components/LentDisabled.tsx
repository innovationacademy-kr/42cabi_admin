import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import { RootState } from "../ReduxModules/rootReducer";
import styled from "styled-components";

const LentDisabledInfo = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  if (
    SearchResponseRedux.resultFromLent === undefined ||
    SearchResponseRedux.resultFromLent.length === 0 ||
    (SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent.length !== 0 &&
      SearchResponseRedux.resultFromLent[0].activation === 0 &&
      SearchResponseRedux.resultFromLent[0].lent_id !== null)
  ) {
    return <AlertMessage>비활성화 된 사물함이 대여 중입니다!</AlertMessage>;
  } else {
    return <></>;
  }
};

const AlertMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #6667ab;
  margin-top: 1rem;
`;

export default LentDisabledInfo;
