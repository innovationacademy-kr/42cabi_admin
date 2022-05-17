import styled from "styled-components";
import CabinetDetail from "../Components/CabinetDetail";
import UserDetail from "../Components/UserDetail";
import CabiButton from "../Components/CabiButton";
import PrevCabinetTable from "../Tables/PrevCabinetTable";
import PrevUserTable from "../Tables/PrevUserTable";
import { useSelector, useDispatch } from "react-redux";
import { GetTargetCabinet } from "../ReduxModules/SearchCabinet";
import { GetTargetUser } from "../ReduxModules/SearchUser";
import { GetTargetType } from "../ReduxModules/SearchType";
import { RootState } from "../ReduxModules/rootReducer";
import NoResult from "./NoResult";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchDashboard = () => {
  const SearchTypeRedux = useSelector((state: RootState) => state.SearchType);

  // let SearchRedux: any = {};
  const DetailType = () => {
    if (SearchTypeRedux === "User") {
      // SearchRedux = SearchUserRedux;
      return <UserDetail />;
    } else {
      return <CabinetDetail />;
    }
  };

  const cabinetId: number = 0;
  const cabinetActivation: number = 0;

  const TableType = () => {
    const SearchUserRedux = useSelector((state: RootState) => state.SearchUser);
    const SearchCabinetRedux = useSelector(
      (state: RootState) => state.SearchCabinet
    );
    if (SearchTypeRedux === "User") {
      if (SearchUserRedux.data?.resultFromLentLog?.length !== 0) {
        return <PrevUserTable />;
      } else {
        return <NoResult />;
      }
    } else {
      if (SearchCabinetRedux.data?.resultFromLentLog?.length !== 0) {
        return <PrevCabinetTable />;
      } else {
        return <NoResult />;
      }
    }
  };

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  console.log(params, url);
  axios
    .get(url, { params })
    .then((res) => {
      if (SearchTypeRedux === "User") {
        dispatch(GetTargetUser(res.data));
      } else {
        dispatch(GetTargetCabinet(res.data));
      }
      console.log(res);
    })
    .catch((e) => {
      navigate("/saerom/search/noResult");
      console.log(e);
    });

  return (
    <div>
      <DashboardBox>
        <LeftBox>
          <DetailBox>
            <DetailType />
          </DetailBox>
          <ButtonBox>
            <CabiButton Color="#6667ab" isActive={true}>
              반납하기
            </CabiButton>
            <CabiButton Color="#6667ab" isActive={true}>
              연장처리
            </CabiButton>
            <CabiButton Color="#6667ab" isActive={true}>
              상태관리
            </CabiButton>
            <CabiButton Color="#6667ab" isActive={true}>
              슬랙 메시지 전송
            </CabiButton>
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
