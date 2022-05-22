import styled from "styled-components";
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

const SearchDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const SearchTypeRedux = useSelector(
    (state: RootState) => state.SearchType,
    shallowEqual
  );

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let params = {};
  useEffect(() => {
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
    axios
      .get(url, { params })
      .then((res) => {
        dispatch(GetTargetResponse(res.data));
        setLoading(false);
        // console.log(res);
      })
      .catch((e) => {
        // if (SearchTypeRedux === "Cabinet") {
        navigate("/saerom/search/invalidCabinet");
        // } else {
        // navigate("/saerom/search/invalidUser");
        // }
        console.log(e);
      });
  });

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
        SearchResponseRedux.resultFromLentLog[0] != undefined &&
        SearchResponseRedux.resultFromLentLog[0].lent_time !== null
      ) {
        return <PrevCabinetTable />;
      } else {
        return <NoPrevLog />;
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DashboardBox>
      <LeftBox>
        <DetailBox>
          <DetailType />
        </DetailBox>
        <ButtonBox>
          <ButtonSet />
        </ButtonBox>
      </LeftBox>
      <RightBox>
        <TableBox>
          <TableType />
        </TableBox>
      </RightBox>
    </DashboardBox>
  );
};

const DashboardBox = styled.div`
  display: flex;
  width: 99%;
  height: 90%;
  justify-content: center;
  // border: 0.5rem solid #6667ab;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  // border: 0.2rem solid red;
  @media screen and (max-width: 450px) {
    width: 95%;
  }
`;

const RightBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  // border: 0.2rem solid blue;
  @media (max-width: 450px) {
    width: 95%;
  }
`;

const DetailBox = styled.div`
  display: flex;
  width: 100%;
  margin: 0.2rem;
  margin-top: 0;
  flex-direction: column;
  // justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableBox = styled.div`
  margin: 0.2rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1.5rem;
  // border: 0.2rem solid green;
  background-color: #dddddd;
  @media screen and (max-width: 450px) {
    padding-bottom: 5rem;
  }
`;

export default SearchDashboard;
