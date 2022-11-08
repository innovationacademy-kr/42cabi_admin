import CabinetDetail from "../Components/CabinetDetail";
import UserDetail from "../Components/UserDetail";
import PrevCabinetTable from "../Tables/PrevCabinetTable";
import PrevUserTable from "../Tables/PrevUserTable";
// import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { GetTargetResponse } from "../../src/redux/slices/searchResponseSlice";
// import { RootState } from "../ReduxModules/rootReducer";
// import { dataInitialize } from "../ReduxModules/SearchResponse";
import { searchResponseInitialize } from "../../src/redux/slices/searchResponseSlice";
import NoPrevLog from "../Components/NoPrevLog";
import { useSearchParams } from "react-router-dom";
import * as API from "../Networks/APIType";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ButtonSet from "../Components/ButtonSet";
import Toast from "../Components/Toast";
import {
  DashboardBox,
  LeftBox,
  RightBox,
  GrayBgBox,
  ButtonBox,
} from "../Components/DashboardStyleComponent";
import { SearchQueryBody } from "../type";

const SearchDashboard = () => {
  const [isLoading, setisLoading] = useState(true);
  // const SearchResponseRedux = useSelector(
  //   (state: RootState) => state.SearchResponse,
  //   shallowEqual
  // );
  const SearchResponseRedux = useAppSelector((state) => state.searchResponse);

  const [searchParams] = useSearchParams();

  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getSearchData = useCallback(async () => {
    try {
      let params: SearchQueryBody;
      if (searchParams.get("intraId") !== null) {
        params = {
          intraId: searchParams.get("intraId"),
        };
      } else {
        params = {
          floor: searchParams.get("floor"),
          cabinetNum: searchParams.get("cabinetNum"),
        };
      }

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
      setisLoading(false);
    } catch (e) {
      console.log(e);
      const axiosError = e as API.axiosError;
      API.HandleError(navigate, axiosError);
    }
  }, [dispatch, navigate, searchParams]);

  useEffect(() => {
    getSearchData();
  }, [getSearchData]);

  const DetailType = () => {
    if (searchParams.get("intraId") !== null) {
      return <UserDetail />;
    } else {
      return <CabinetDetail />;
    }
  };

  // 페이지 벗어날 때 redux state 초기화 -> 다른 페이지에서 가져다 쓰거나 다시 돌아왔을 때 남아있는 현상 방지
  useEffect(() => {
    return () => {
      // dispatch(dataInitialize());
      dispatch(searchResponseInitialize());
    };
  }, [dispatch]);

  const TableType = () => {
    if (searchParams.get("intraId") !== null) {
      if (
        SearchResponseRedux.resultFromLent !== undefined &&
        SearchResponseRedux.resultFromLentLog !== undefined &&
        SearchResponseRedux.resultFromLentLog.length !== 0 &&
        SearchResponseRedux.resultFromLentLog[0].lent_time !== null
      ) {
        return <PrevUserTable />;
      } else {
        return <NoPrevLog />;
      }
    } else {
      if (
        SearchResponseRedux.resultFromLentLog !== undefined &&
        SearchResponseRedux.resultFromLentLog[0] !== undefined &&
        SearchResponseRedux.resultFromLentLog[0].lent_time !== null
      ) {
        return <PrevCabinetTable />;
      } else {
        return <NoPrevLog />;
      }
    }
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <DashboardBox>
      <LeftBox>
        <GrayBgBox>
          <DetailType />
        </GrayBgBox>
        <ButtonBox>
          <ButtonSet />
        </ButtonBox>
      </LeftBox>
      <RightBox>
        <GrayBgBox>
          <TableType />
        </GrayBgBox>
        <Toast />
      </RightBox>
    </DashboardBox>
  );
};

export default SearchDashboard;
