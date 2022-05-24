import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";
import { DetailBox, BigFontSize } from "./DetailStyleComponent";

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
      navigate("/saerom/search/invalidSearchResult", {
        state: { errorType: "Cabinet" },
      });
    }
  }, [data, navigate]);

  const CabinetInfo =
    data !== undefined && data[0] !== undefined
      ? data[0].floor?.toString() +
        "F " +
        data[0].section?.toString() +
        " " +
        data[0].cabinet_num?.toString() +
        "번"
      : "";

  const CabinetLentInfo =
    data !== undefined && data[0] !== undefined && data[0].lent_time !== null
      ? moment(data[0].lent_time?.toString()).format("YYYY.MM.DD") +
        " ~ " +
        moment(data[0].expire_time?.toString()).format("YYYY.MM.DD")
      : "없음";

  const CabinetUserInfo =
    data !== undefined && data[0] !== undefined && data[0].intra_id !== null
      ? data[0].intra_id
      : "없음";

  const CabinetActivationInfo =
    data !== undefined && data[0] !== undefined && data[0].activation === 1
      ? "사용 가능"
      : "사용 불가";

  const CabinetDisabledReason =
    data !== undefined && data[0] !== undefined && data[0].activation === 0
      ? "(추후 받아올 비활성화 사유)"
      : "";

  if (data === undefined || data.length === 0) {
    return <></>;
  } else {
    return (
      <DetailBox>
        <BigFontSize>{CabinetInfo}</BigFontSize>
        <p>현재 대여자 : {CabinetUserInfo}</p>
        <p>대여 기간 : {CabinetLentInfo}</p>
        <p>현재 상태 : {CabinetActivationInfo}</p>
        {CabinetDisabledReason}
        <ExpiredInfo />
      </DetailBox>
    );
  }
};

export default CabinetDetail;
