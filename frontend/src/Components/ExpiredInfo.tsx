import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import { RootState } from "../ReduxModules/rootReducer";
import styled from "styled-components";

const ExpiredInfo = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  if (
    SearchResponseRedux.resultFromLent === undefined ||
    SearchResponseRedux.resultFromLent.length === 0 ||
    (SearchResponseRedux.resultFromLent !== undefined &&
      SearchResponseRedux.resultFromLent[0].lent_id === null)
  ) {
    return <></>;
  } else {
    const expire_time = moment(
      SearchResponseRedux.resultFromLent[0].expire_time
    );
    const todayString = moment();
    if (todayString.isAfter(expire_time)) {
      const overDays = todayString.diff(expire_time, "days");
      return (
        <ExpiredMessage>연체 상황 : {overDays}일 째 연체 중!</ExpiredMessage>
      );
    } else {
      return <Message>연체 상황 : 해당 없음</Message>;
    }
  }
};

const ExpiredMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #bc0000;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  margin-bottom: 1rem;
`;

export default ExpiredInfo;
