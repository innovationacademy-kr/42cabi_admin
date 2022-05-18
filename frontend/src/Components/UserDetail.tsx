import { useSelector, shallowEqual } from "react-redux";
import { useMemo } from "react";
import styled from "styled-components";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

const UserDetail = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const data = useMemo(
    () => SearchResponseRedux.resultFromLent,
    [SearchResponseRedux.resultFromLent]
  );

  const [searchParams] = useSearchParams();
  const UserInfo = searchParams.get("intraId");

  const UserCabinetInfo =
    data !== undefined && data.length !== 0
      ? data[0].floor?.toString() +
        "F " +
        data[0].section?.toString() +
        " " +
        data[0].cabinet_num?.toString() +
        "번"
      : "정보 없음";

  const UserLentInfo =
    data !== undefined && data.length !== 0
      ? moment(data[0].lent_time?.toString()).format("YYYY.MM.DD") +
        " ~ " +
        moment(data[0].expire_time?.toString()).format("YYYY.MM.DD")
      : "정보 없음";

  return (
    <div>
      <DetailBox>
        <BigFontSize>{UserInfo}</BigFontSize>
        <p>대여 중인 사물함 : {UserCabinetInfo}</p>
        <p>대여기간 : {UserLentInfo}</p>
      </DetailBox>
    </div>
  );
};

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 0.5rem solid black;
  margin: 1rem;
  padding: 1rem;
`;

const BigFontSize = styled.p`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: bold;
`;

export default UserDetail;
