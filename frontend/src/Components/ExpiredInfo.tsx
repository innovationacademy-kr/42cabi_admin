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
    const expire_time = new Date(
      moment(SearchResponseRedux.resultFromLent[0].expire_time).format(
        "YYYY-MM-DD"
      )
    );
    const todayString = new Date(moment().format("YYYY-MM-DD"));
    if (moment(todayString).isAfter(expire_time)) {
      const overDays = moment
        .duration(moment(todayString).diff(expire_time))
        .asDays()
        .toLocaleString();
      return <ExpiredMessage>{overDays}일 째 연체 중입니다!</ExpiredMessage>;
    } else {
      return <Message>연체 중이 아닙니다.</Message>;
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
