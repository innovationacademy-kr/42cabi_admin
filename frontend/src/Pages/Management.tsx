import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetBanCabinetResponse } from "../ReduxModules/TaskBanCabinet";
import SearchBar from "../Components/SearchBar";
import ThreeToggleButton from "../Components/ThreeTogleButton";
import UserDetail from "../Components/UserDetail";
import CabinetDetail from "../Components/CabinetDetail";
import PrevUserTable from "../Tables/PrevUserTable";
import PrevCabinetTable from "../Tables/PrevCabinetTable";
import NoPrevLog from "../Components/NoPrevLog";
import ButtonSet from "../Components/ButtonSet";
import Toast from "../Components/Toast";
import * as API from "../Networks/APIType";
import {
  DashboardBox,
  LeftBox,
  RightBox,
  GrayBgBox,
  ButtonBox,
  PrevLogBox,
} from "../Components/DashboardStyleComponent";
import { TempTable } from "../Tables/TempTable";

const Management = () => {
  const [isLoading, setisLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

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
    getBanCabinetData();
  });

  const DetailType = () => {
    // return <UserDetail />;
    return <CabinetDetail />;
  };

  const TableType = () => {
    // return <PrevUserTable />;
    // return <NoPrevLog />;
    // return <PrevCabinetTable />;
    return <NoPrevLog />;
  };

  // if (isLoading) {
  //   return <></>;
  // }
  return (
    <DashboardBox>
      <LeftBox>
        <ThreeToggleButton />
        <GrayBgBox>
          <TempTable />
        </GrayBgBox>
        <SearchBar />
      </LeftBox>
      <RightBox>
        <GrayBgBox>
          <DetailType />
        </GrayBgBox>
        <ButtonBox>
          <ButtonSet />
          버튼 들어갈 곳
        </ButtonBox>
        {/* <TableType /> */}
        <PrevLogBox>사용 기록 로그</PrevLogBox>
        <Toast />
      </RightBox>
    </DashboardBox>
  );
};

export default Management;
