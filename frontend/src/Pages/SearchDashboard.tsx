import CabinetDetail from "../Components/CabinetDetail";
import UserDetail from "../Components/UserDetail";
import PrevCabinetTable from "../Tables/PrevCabinetTable";
import PrevUserTable from "../Tables/PrevUserTable";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { GetTargetType } from "../ReduxModules/SearchType";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { RootState } from "../ReduxModules/rootReducer";
import NoPrevLog from "../Components/NoPrevLog";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonSet from "../Components/ButtonSet";
import Toast from "../Components/Toast";
import {
  DashboardBox,
  LeftBox,
  RightBox,
  GrayBgBox,
  ButtonBox,
} from "../Components/DashboardStyleComponent";

const SearchDashboard = () => {
  const [isLoading, setisLoading] = useState(true);
  const SearchTypeRedux = useSelector(
    (state: RootState) => state.SearchType,
    shallowEqual
  );

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let params = {};
    if (searchParams.get("intraId") !== null) {
      dispatch(GetTargetType("User"));
      params = {
        intraId: searchParams.get("intraId"),
      };
    } else {
      dispatch(GetTargetType("Cabinet"));
      params = {
        floor: searchParams.get("floor"),
        cabinetNum: searchParams.get("cabinetNum"),
      };
    }

    const url = `http://localhost:8080/api/search/`;
    const token = localStorage.getItem("accessToken");
    axios
      .get(url, { params, headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(GetTargetResponse(res.data));
        setisLoading(false);
        // console.log(res);
      })
      .catch((e) => {
        navigate("/saerom/search/invalidSearchResult", {
          state: { errorType: "Input" },
        });
        console.log(e);
      });
  }, [dispatch, navigate, searchParams]);

  const DetailType = () => {
    if (SearchTypeRedux === "User") {
      return <UserDetail />;
    } else {
      return <CabinetDetail />;
    }
  };

  const TableType = () => {
    const SearchResponseRedux = useSelector(
      (state: RootState) => state.SearchResponse,
      shallowEqual
    );
    if (SearchTypeRedux === "User") {
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
