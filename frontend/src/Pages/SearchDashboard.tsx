import styled from "styled-components";
import Detail from "../Components/Detail";
import CabiButton from "../Components/CabiButton";
import MiniTable from "../Tables/MiniTable";

export type searchCabinetData = {
  intra_id?: string;
  cabinet_id?: number;
  cabinet_num?: number;
  location?: string;
  floor?: number;
  section?: string;
  activation?: number;
  lent_user_id?: number;
  lent_time?: string;
  expire_time?: string;
};

export type searchUserData = {
  intra_id?: string;
  cabinet_id?: number;
  cabinet_num?: number;
  location?: string;
  floor?: number;
  section?: string;
  activation?: boolean;
  lent_user_id?: number;
  lent_time?: string;
  expire_time?: string;
};

const SearchDashboard = () => {
  return (
    <div>
      <DashboardBox>
        <LeftBox>
          <DetailBox>
            <Detail />
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
            <p>이전 사용자 정보</p>
            <MiniTable />
          </TableBox>
          <TableBox>
            <p>이전 대여 기록</p>
            <MiniTable />
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
