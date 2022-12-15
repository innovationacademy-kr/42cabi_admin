// import { useSelector, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
// import { RootState } from "../ReduxModules/rootReducer";
import { useAppSelector } from "../redux/hook";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ExpiredInfo from "./ExpiredInfo";
import { DetailBox, BigFontSize } from "./DetailStyleComponent";
import LentDisabledInfo from "./LentDisabled";
// import { GetDisabledResponse } from "../ReduxModules/StatusDisabled";
import styled from "styled-components";
import { useState } from "react";
import * as API from "../Networks/APIType";
import { singleCircleCabinetInfo, singleShareCabinetInfo } from "../type";

interface circleData {
  circleName: string;
  circleMaster: string;
}

const CabinetDetail = () => {
  // const SearchResponseRedux = useSelector(
  //   (state: RootState) => state.SearchResponse,
  //   shallowEqual
  // );
  const SearchResponseRedux = useAppSelector((state) => state.searchResponse);

  // const DisableResponseRedux = useSelector(
  //   (state: RootState) => state.StatusDisabled
  // );

  const data = useMemo(
    () => SearchResponseRedux.resultFromLent,
    [SearchResponseRedux.resultFromLent]
  );

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const currentPage = window.location.pathname.split("/")[2];

  const [isCircle, setIsCircle] = useState<boolean>(false);
  const [circleData, setCircleData] = useState<circleData>({
    circleName: "",
    circleMaster: "",
  });

  const [isShare, setIsShare] = useState<boolean>(false);
  const [sharingUsers, setSharingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (currentPage === "search" && data?.length === 0) {
      navigate("/saerom/search/invalidSearchResult", {
        state: { errorType: "Cabinet" },
      });
    }
  }, [currentPage, data, navigate]);

  const getTargetCabinetData = async (cabinetId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await API.axiosFormat(
        {
          method: "GET",
          url: API.url(`/api/v3/cabinet/${cabinetId}`),
        },
        token
      );
      return res;
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
    return null;
  };

  useEffect(() => {
    if (
      data !== undefined &&
      data[0] !== undefined &&
      data[0].cabinet_id !== undefined
    ) {
      const res = getTargetCabinetData(data[0].cabinet_id).then((res) => {
        const data: singleCircleCabinetInfo | null = res?.data;
        if (data !== null && data.lent_type === "CIRCLE") setIsCircle(true);
        else if (data !== null && data.lent_type === "SHARE") setIsShare(true);
      });
    }
  }, [data]);

  useEffect(() => {
    if (
      data !== undefined &&
      data[0] !== undefined &&
      data[0].cabinet_id &&
      isCircle &&
      circleData.circleName === ""
    ) {
      const res = getTargetCabinetData(data[0].cabinet_id).then((res) => {
        const data: singleCircleCabinetInfo | null = res?.data;
        if (
          data?.cabinet_title !== undefined &&
          data.status_note !== undefined
        ) {
          setCircleData({
            circleName: data?.cabinet_title,
            circleMaster: data.status_note,
          });
        }
      });
    }
  });

  useEffect(() => {
    setCircleData({ circleName: "", circleMaster: "" });
  }, []);

  useEffect(() => {
    if (
      data !== undefined &&
      data[0] !== undefined &&
      data[0].cabinet_id &&
      isShare &&
      sharingUsers.length === 0
    ) {
      const res = getTargetCabinetData(data[0].cabinet_id).then((res) => {
        const data: singleShareCabinetInfo | null = res?.data;
        if (
          data !== null &&
          data.lent_info !== null &&
          data.lent_info.length !== 0
        ) {
          let sharingUserList: string[] = [];
          for (let i = 0; i < data?.lent_info.length; i++) {
            sharingUserList.push(data.lent_info[i].intra_id);
          }
          setSharingUsers(sharingUserList);
        }
      });
    }
  });

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
    data !== undefined && data[0] !== undefined && data[0].activation === 0
      ? "사용 불가"
      : "";

  // const getDisableData = useCallback(async () => {
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     const res = await API.axiosFormat(
  //       {
  //         method: "GET",
  //         url: API.url("/api/activation"),
  //       },
  //       token
  //     );
  //     dispatch(GetDisabledResponse(res.data));
  //   } catch (e) {
  //     console.log(e);
  //     const axiosError = e as API.axiosError;
  //     API.HandleError(navigate, axiosError);
  //   }
  // }, [dispatch, navigate]);

  // useEffect(() => {
  //   if (CabinetActivationInfo === "사용 불가") {
  //     getDisableData();
  //   }
  // }, [CabinetActivationInfo, getDisableData]);

  // const cabinetFloor =
  //   data !== undefined && data[0] !== undefined ? data[0].floor : 0;

  // const cabinetNum =
  //   data !== undefined && data[0] !== undefined ? data[0].cabinet_num : 0;

  // const targetCabinetData = DisableResponseRedux.find(
  //   (key) => key.floor === cabinetFloor && key.cabinet_num === cabinetNum
  // );

  // const CabinetDisabledReason =
  //   data !== undefined &&
  //   data[0] !== undefined &&
  //   data[0].activation === 0 ?
  //     data[0].note;
  //     : "";

  if (data === undefined || data.length === 0) {
    return (
      <DetailBox>
        <NoneCabinet>목록에서 사물함을 선택해주세요!</NoneCabinet>
      </DetailBox>
    );
  } else if (data[0].activation === 2) {
    return (
      <DetailBox>
        <BigFontSize>{CabinetInfo}</BigFontSize>
        <BigRedMessage>강제 반납 처리된 사물함입니다.</BigRedMessage>
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
        {!isCircle && !isShare && (
          <>
            <p>현재 대여자 : {CabinetUserInfo}</p>
            <p>대여 기간 : {CabinetLentInfo}</p>
          </>
        )}
        {isCircle && (
          <>
            <p>동아리 사물함입니다.</p>
            <p>동아리 : {circleData.circleName}</p>
            <p>동아리장 : {circleData.circleMaster}</p>
          </>
        )}
        {isShare && (
          <>
            <p>공유 사물함입니다.</p>
            <p>현재 대여자 : {sharingUsers.join(", ")}</p>
          </>
        )}
        <CabinetStatusMessage>{CabinetActivationInfo}</CabinetStatusMessage>
        {/* {CabinetActivationInfo === "사용 불가" && (
          <p>비활성화 사유 : {CabinetDisabledReason}</p>
        )} */}
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

const NoneCabinet = styled.div`
  font-size: 2rem;
  color: black;
  padding-top: 10rem;
  padding-bottom: 10rem;
`;

const CabinetStatusMessage = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #bc0000;
`;

export default CabinetDetail;
