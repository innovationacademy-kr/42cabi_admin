import styled from "styled-components";
import CabinetDetail from "../Components/CabinetDetail";
import UserDetail from "../Components/UserDetail";
import CabiButton from "../Components/CabiButton";
import PrevCabinetTable from "../Tables/PrevCabinetTable";
import PrevUserTable from "../Tables/PrevUserTable";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { GetTargetType } from "../ReduxModules/SearchType";
import { GetTargetResponse } from "../ReduxModules/SearchResponse";
import { RootState } from "../ReduxModules/rootReducer";
import NoPrevLog from "./NoPrevLog";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ButtonSet from "../Components/ButtonSet";

const SearchDashboard = () => {
  const SearchTypeRedux = useSelector(
    (state: RootState) => state.SearchType,
    shallowEqual
  );

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
      if (SearchResponseRedux.resultFromLentLog?.length !== 0) {
        return <PrevUserTable />;
      } else {
        return <NoPrevLog />;
      }
    } else {
      if (SearchResponseRedux.resultFromLentLog?.length !== 0) {
        return <PrevCabinetTable />;
      } else {
        return <NoPrevLog />;
      }
    }
  };

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
        // console.log(res);
      })
      .catch((e) => {
        navigate("/saerom/search/invalidCabinet");
        console.log(e);
      });
  });

  return (
    <div>
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
    </div>
  );
};

const DashboardBox = styled.div`
  display: flex;
  position: sticky;
  width: 99%;
  height: 90%;
  border: 0.5rem solid gray;
`;

const LeftBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  border: 0.2rem solid red;
`;

const RightBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  border: 0.2rem solid blue;
`;

const DetailBox = styled.div`
  display: flex;
  margin: 0.2rem;
  flex-direction: column;
  // justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableBox = styled.div`
  margin: 1rem;
  border: 0.2rem solid green;
`;

export default SearchDashboard;
