import { BanCabinetTable } from "../Tables/BanCabinetTable";
import { DisabledTable } from "../Tables/DisabledTable";
import { useDispatch } from "react-redux";
import * as API from "../Networks/APIType";
import { GetDisabledResponse } from "../ReduxModules/StatusDisabled";
import { GetBanCabinetResponse } from "../ReduxModules/TaskBanCabinet";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { dataInitialize } from "../ReduxModules/SearchResponse";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardBox,
  GrayBgBox,
  LeftBox,
  RightBox,
} from "../Components/DashboardStyleComponent";
import CabinetDetail from "../Components/CabinetDetail";
import { ButtonBox } from "../Components/DashboardStyleComponent";
import ButtonSet from "../Components/ButtonSet";

const Task = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [paramCabinet, setParamCabinet] = useState({
    floor: NaN,
    cabinetNum: NaN,
  });

  const getDisabledData = async () => {
    try {
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
  };

  const getBanCabinetData = async () => {
    try {
      const res = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/activation/ban"),
        },
        token
      );
      dispatch(GetBanCabinetResponse(res.data));
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  };

  const getCabinetData = useCallback(async () => {
    try {
      let params = {
        floor: paramCabinet.floor,
        cabinetNum: paramCabinet.cabinetNum,
      };
      const token = localStorage.getItem("accessToken");
      const res = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/search"),
          params,
        },
        token
      );
      dispatch(GetTargetResponse(res.data));
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  }, [dispatch, navigate, paramCabinet]);

  useEffect(() => {
    getDisabledData();
    getBanCabinetData();
  });

  useEffect(() => {
    if (!isNaN(paramCabinet.floor)) {
      getCabinetData();
    }
  }, [paramCabinet, getCabinetData]);

  // ????????? ????????? ??? redux state ????????? -> ?????? ??????????????? ????????? ????????? ?????? ???????????? ??? ???????????? ?????? ??????
  useEffect(() => {
    return () => {
      dispatch(dataInitialize());
    };
  }, [dispatch]);

  return (
    <div>
      <DashboardBox>
        <LeftBox>
          <GrayBgBox>
            <BanCabinetTable setParams={setParamCabinet} />
          </GrayBgBox>
          <GrayBgBox>
            <DisabledTable setParams={setParamCabinet} />
          </GrayBgBox>
        </LeftBox>
        <RightBox>
          <GrayBgBox>
            <CabinetDetail />
          </GrayBgBox>
          <ButtonBox>
            <ButtonSet />
          </ButtonBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

export default Task;
