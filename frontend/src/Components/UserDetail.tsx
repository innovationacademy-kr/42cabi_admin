import { useSelector, shallowEqual } from "react-redux";
import { useMemo, useEffect } from "react";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";
import { DetailBox, BigFontSize } from "./DetailStyleComponent";
// import LentDisabledInfo from "./LentDisabled";
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
  const currentPage = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (currentPage === "search" && data?.length === 0) {
      navigate("/saerom/search/invalidSearchResult", {
        state: { errorType: "User" },
      });
    }
  });

  const UserInfo =
    data !== undefined && data.length !== 0
      ? data[0].intra_id?.toLowerCase()
      : "";

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
    return (
      <DetailBox>
        <NoneUser>목록에서 유저를 선택해주세요!</NoneUser>
      </DetailBox>
    );
  }
  return (
    <DetailBox>
      {/* <LentDisabledInfo /> */}
      <BigFontSize>{UserInfo}</BigFontSize>
      {data[0].auth === 1 && (
        <BigRedMessage>페널티가 남아있는 사용자입니다.</BigRedMessage>
      )}
      <p>현재 사물함 : {UserCabinetInfo}</p>
      <p>대여기간 : {UserLentInfo}</p>
      <ExpiredInfo />
    </DetailBox>
  );
};

const BigRedMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #bc0000;
  margin-bottom: 1rem;
`;

const NoneUser = styled.div`
  font-size: 2rem;
  color: black;
  padding-top: 10rem;
  padding-bottom: 10rem;
`;

export default UserDetail;
