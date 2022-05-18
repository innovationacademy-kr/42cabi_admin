import styled from "styled-components";

const NoPrevLog = () => {
  return (
    <div>
      <DashboardBox>이전 사용 기록이 없습니다.</DashboardBox>
    </div>
  );
};

const DashboardBox = styled.div`
  display: flex;
  width: 99%;
  height: 90%;
  border: 0.5rem solid gray;
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 10rem;
  font-size: 2rem;
`;

export default NoPrevLog;
