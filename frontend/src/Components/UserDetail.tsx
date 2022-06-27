import { useSelector, shallowEqual } from "react-redux";
import { useMemo, useEffect } from "react";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useSearchParams, useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";
import { DetailBox, BigFontSize } from "./DetailStyleComponent";
import LentDisabledInfo from "./LentDisabled";
import styled from "styled-components";

const UserDetail = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const data = useMemo(
    () => SearchResponseRedux.resultFromLent,
    [SearchResponseRedux.resultFromLent]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.length === 0) {
      navigate("/saerom/search/invalidSearchResult", {
        state: { errorType: "User" },
      });
    }
  });

  const [searchParams] = useSearchParams();
  const UserInfo = searchParams.get("intraId")?.toLowerCase();

  const UserCabinetInfo =
    data !== undefined && data.length !== 0 && data[0].cabinet_id !== null
      ? data[0].floor?.toString() +
        "F " +
        data[0].section?.toString() +
        " " +
        data[0].cabinet_num?.toString() +
        "번"
      : "없음";

  const UserLentInfo =
    data !== undefined && data.length !== 0 && data[0].lent_time !== null
      ? moment(data[0].lent_time?.toString()).format("YYYY.MM.DD") +
        " ~ " +
        moment(data[0].expire_time?.toString()).format("YYYY.MM.DD")
      : "없음";

  if (data === undefined || data.length === 0) {
    return <></>;
  } else if (data[0].auth === 2) {
    return (
      <DetailBox>
        <BigFontSize>{UserInfo}</BigFontSize>
        <BigRedMessage>BAN 유저입니다!</BigRedMessage>
      </DetailBox>
    );
  } else {
    return (
      <DetailBox>
        <LentDisabledInfo />
        <BigFontSize>{UserInfo}</BigFontSize>
        <p>현재 사물함 : {UserCabinetInfo}</p>
        <p>대여기간 : {UserLentInfo}</p>
        <ExpiredInfo />
      </DetailBox>
    );
  }
};

const BigRedMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #bc0000;
  margin-bottom: 1rem;
`;

export default UserDetail;
