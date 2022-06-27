import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useEffect, useMemo, useCallback } from "react";
import { RootState } from "../ReduxModules/rootReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";
import { DetailBox, BigFontSize } from "./DetailStyleComponent";
import LentDisabledInfo from "./LentDisabled";
import { GetDisabledResponse } from "../ReduxModules/StatusDisabled";
import styled from "styled-components";
import * as API from "../Networks/APIType";

const CabinetDetail = () => {
  const SearchResponseRedux = useSelector(
    (state: RootState) => state.SearchResponse,
    shallowEqual
  );
  const DisableResponseRedux = useSelector(
    (state: RootState) => state.StatusDisabled
  );

  const data = useMemo(
    () => SearchResponseRedux.resultFromLent,
    [SearchResponseRedux.resultFromLent]
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        " \n" +
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

  const getDisableData = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/activation"),
        },
        token
      );
      dispatch(GetDisabledResponse(res.data));
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (CabinetActivationInfo === "사용 불가") {
      getDisableData();
    }
  }, [CabinetActivationInfo, getDisableData]);

  const cabinetFloor =
    data !== undefined && data[0] !== undefined ? data[0].floor : 0;

  const cabinetNum =
    data !== undefined && data[0] !== undefined ? data[0].cabinet_num : 0;

  const targetCabinetData = DisableResponseRedux.find(
    (key) => key.floor === cabinetFloor && key.cabinet_num === cabinetNum
  );

  const CabinetDisabledReason =
    data !== undefined &&
    data[0] !== undefined &&
    data[0].activation === 0 &&
    targetCabinetData !== undefined
      ? targetCabinetData.note
      : "";

  if (data === undefined || data.length === 0) {
    return <></>;
  } else if (data[0].activation === 2) {
    return (
      <DetailBox>
        <BigFontSize>{CabinetInfo}</BigFontSize>
        <BigRedMessage>강제 반납 처리 된 사물함입니다.</BigRedMessage>
        <BigRedMessage>
          사물함 확인 후 사용 가능할 때 활성화해주세요!
        </BigRedMessage>
      </DetailBox>
    );
  } else {
    return (
      <DetailBox>
        <LentDisabledInfo />
        <BigFontSize>{CabinetInfo}</BigFontSize>
        <p>현재 대여자 : {CabinetUserInfo}</p>
        <p>대여 기간 : {CabinetLentInfo}</p>
        <p>현재 상태 : {CabinetActivationInfo}</p>
        {CabinetActivationInfo === "사용 불가" && (
          <p>비활성화 사유 : {CabinetDisabledReason}</p>
        )}
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

export default CabinetDetail;
