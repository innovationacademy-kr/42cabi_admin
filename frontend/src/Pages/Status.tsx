import { ExpiredTable } from "../Tables/ExpiredTable";
import { DisabledTable } from "../Tables/DisabledTable";
import { useDispatch } from "react-redux";
import * as API from "../Networks/APIType";
import { GetExpiredResponse } from "../ReduxModules/StatusExpired";
import { GetDisabledResponse } from "../ReduxModules/StatusDisabled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardBox,
  GrayBgBox,
  LeftBox,
  RightBox,
} from "../Components/DashboardStyleComponent";

const Status = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

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

  useEffect(() => {
    getExpiredData();
    getDisabledData();
  });

  return (
    <div>
      <DashboardBox>
        <LeftBox>
          <GrayBgBox>
            <ExpiredTable />
          </GrayBgBox>
        </LeftBox>
        <RightBox>
          <GrayBgBox>
            <DisabledTable />
          </GrayBgBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

export default Status;
