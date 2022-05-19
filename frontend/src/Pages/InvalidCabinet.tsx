import styled from "styled-components";

const InvalidCabinet = () => {
  return <DashboardBox>존재하지 않는 사물함입니다.</DashboardBox>;
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

export default InvalidCabinet;
