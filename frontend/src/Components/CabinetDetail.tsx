import { useSelector, shallowEqual } from "react-redux";
import { useEffect, useMemo, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (data?.length === 0) {
      navigate("/saerom/search/invalidSearchResult", {
        state: { errorType: "Cabinet" },
      });
    } else if (isLoading !== false) {
      setIsLoading(false);
    }
  }, [data, navigate, isLoading]);

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

  if (isLoading) {
    return <></>;
  } else {
    return (
      <DetailBox>
        <BigFontSize>{CabinetInfo}</BigFontSize>
        <p>현재 대여자 : {CabinetUserInfo}</p>
        <p>대여 기간 : {CabinetLentInfo}</p>
        <p>고장 정보 : (상세 사유)</p>
        <ExpiredInfo />
      </DetailBox>
    );
  }
};

export default CabinetDetail;
