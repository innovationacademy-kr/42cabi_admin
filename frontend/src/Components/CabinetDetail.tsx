import { useSelector, shallowEqual } from "react-redux";
import { useMemo } from "react";
import styled from "styled-components";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";

const CabinetDetail = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const data = useMemo(
    () => SearchResponseRedux.resultFromLent,
    [SearchResponseRedux.resultFromLent]
  );

  const CabinetInfo =
    data !== undefined && data.length !== 0
      ? data[0].floor?.toString() +
        "F " +
        data[0].section?.toString() +
        " " +
        data[0].cabinet_num?.toString() +
        "번"
      : "정보 없음";

  const CabinetLentInfo =
    data !== undefined && data.length !== 0
      ? moment(data[0].lent_time?.toString()).format("YYYY.MM.DD") +
        " ~ " +
        moment(data[0].expire_time?.toString()).format("YYYY.MM.DD")
      : "정보 없음";

  const CabinetUserInfo =
    data !== undefined && data.length !== 0 ? data[0].intra_id : "정보 없음";

  return (
    <div>
      <DetailBox>
        <BigFontSize>{CabinetInfo}</BigFontSize>
        <p>현재 대여자 : {CabinetUserInfo}</p>
        <p>대여 기간 : {CabinetLentInfo}</p>
        <p>고장 정보 : (상세 사유)</p>
      </DetailBox>
    </div>
  );
};

const DetailBox = styled.div`
  display: inline-block;
  text-align: center;
  width: 85%;
  border: 0.5rem solid black;
  margin: 1rem;
  padding: 1rem;
`;

const BigFontSize = styled.p`
  margin-top: 2rem;
  font-size: 3rem;
`;

export default CabinetDetail;
