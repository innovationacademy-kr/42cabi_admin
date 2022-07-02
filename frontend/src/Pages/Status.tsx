import { ExpiredTable } from "../Tables/ExpiredTable";
import { BanUserTable } from "../Tables/BanUserTable";
import { useDispatch } from "react-redux";
import * as API from "../Networks/APIType";
import { GetExpiredResponse } from "../ReduxModules/StatusExpired";
import { GetBanUserResponse } from "../ReduxModules/TaskBanUser";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { dataInitialize } from "../ReduxModules/SearchResponse";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonBox,
  DashboardBox,
  GrayBgBox,
  LeftBox,
  RightBox,
} from "../Components/DashboardStyleComponent";
import UserDetail from "../Components/UserDetail";
import ButtonSet from "../Components/ButtonSet";

const Status = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [paramUser, setParamUser] = useState("");

  const getExpiredData = async () => {
    try {
      const res = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/lent/overdue"),
        },
        token
      );
      dispatch(GetExpiredResponse(res.data));
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  };

  const getBanUserData = async () => {
    try {
      const res = await API.axiosFormat(
        {
          method: "GET",
          url: API.url("/api/auth/ban"),
        },
        token
      );
      dispatch(GetBanUserResponse(res.data));
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  };

  const getUserData = useCallback(async () => {
    try {
      let params = {
        intraId: paramUser,
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
  }, [dispatch, navigate, paramUser]);

  useEffect(() => {
    getExpiredData();
    getBanUserData();
  });

  useEffect(() => {
    if (paramUser !== "") {
      getUserData();
    }
  }, [paramUser, getUserData]);

  // 페이지 벗어날 때 redux state 초기화 -> 다른 페이지에서 가져다 쓰거나 다시 돌아왔을 때 남아있는 현상 방지
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
            <ExpiredTable setParams={setParamUser} />
          </GrayBgBox>
          <GrayBgBox>
            <BanUserTable setParams={setParamUser} />
          </GrayBgBox>
        </LeftBox>
        <RightBox>
          <GrayBgBox>
            <UserDetail />
          </GrayBgBox>
          <ButtonBox>
            <ButtonSet originPage="status" />
          </ButtonBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

export default Status;
