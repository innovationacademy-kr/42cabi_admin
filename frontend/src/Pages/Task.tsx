import { BanUserTable } from "../Tables/BanUserTable";
import { BanCabinetTable } from "../Tables/BanCabinetTable";
import { useDispatch } from "react-redux";
import * as API from "../Networks/APIType";
import { GetBanUserResponse } from "../ReduxModules/TaskBanUser";
import { GetBanCabinetResponse } from "../ReduxModules/TaskBanCabinet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardBox,
  GrayBgBox,
  LeftBox,
  RightBox,
} from "../Components/DashboardStyleComponent";

const Task = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

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

  useEffect(() => {
    getBanUserData();
    getBanCabinetData();
  });

  return (
    <div>
      <DashboardBox>
        <LeftBox>
          <GrayBgBox>
            <BanUserTable />
          </GrayBgBox>
        </LeftBox>
        <RightBox>
          <GrayBgBox>
            <BanCabinetTable />
          </GrayBgBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

export default Task;
