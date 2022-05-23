import { useSelector, shallowEqual } from "react-redux";
import { useMemo, useEffect } from "react";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useSearchParams, useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";
import { DetailBox, BigFontSize } from "./DetailStyleComponent";

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
  } else {
    return (
      <DetailBox>
        <BigFontSize>{UserInfo}</BigFontSize>
        <p>대여 중인 사물함 : {UserCabinetInfo}</p>
        <p>대여기간 : {UserLentInfo}</p>
        <ExpiredInfo />
      </DetailBox>
    );
  }
};

export default UserDetail;
