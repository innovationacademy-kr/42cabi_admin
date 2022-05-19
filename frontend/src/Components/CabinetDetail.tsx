import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";

const CabinetDetail = () => {
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
      navigate("/saerom/search/invalidCabinet");
    }
  });

  const CabinetInfo =
    data !== undefined
      ? data[0].floor?.toString() +
        "F " +
        data[0].section?.toString() +
        " " +
        data[0].cabinet_num?.toString() +
        "번"
      : "";

  const CabinetLentInfo =
    data !== undefined && data[0].lent_time !== null
      ? moment(data[0].lent_time?.toString()).format("YYYY.MM.DD") +
        " ~ " +
        moment(data[0].expire_time?.toString()).format("YYYY.MM.DD")
      : "정보 없음";

  const CabinetUserInfo =
    data !== undefined && data[0].intra_id !== null
      ? data[0].intra_id
      : "정보 없음";

  return (
    <DetailBox>
      <BigFontSize>{CabinetInfo}</BigFontSize>
      <p>현재 대여자 : {CabinetUserInfo}</p>
      <p>대여 기간 : {CabinetLentInfo}</p>
      <p>고장 정보 : (상세 사유)</p>
      <ExpiredInfo />
    </DetailBox>
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

export default CabinetDetail;
