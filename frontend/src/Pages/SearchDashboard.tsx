import styled from "styled-components";
import CabinetDetail from "../Components/CabinetDetail";
import UserDetail from "../Components/UserDetail";
import CabiButton from "../Components/CabiButton";
// import MiniTable from "../Tables/MiniTable";
import PrevCabinetTable from "../Tables/PrevCabinetTable";
import PrevUserTable from "../Tables/PrevUserTable";
import { useSelector } from "react-redux";
import { RootState } from "../ReduxModules/rootReducer";

const SearchDashboard = () => {
  const SearchTypeRedux = useSelector((state: RootState) => state.SearchType);
  const DetailType = () => {
    if (SearchTypeRedux === "User") {
      return <UserDetail />;
    } else {
      return <CabinetDetail />;
    }
  };
  const TableType = () => {
    if (SearchTypeRedux === "User") {
      return <PrevUserTable />;
    } else {
      return <PrevCabinetTable />;
    }
  };
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
            {/* <p>이전 사용자 정보</p>
            <PrevIdTable />
          </TableBox>
          <TableBox>
            <p>이전 대여 기록</p>
            <PrevCabinetTable /> */}
            <TableType />
          </TableBox>
        </RightBox>
      </DashboardBox>
    </div>
  );
};

const DashboardBox = styled.div`
  display: flex;
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
