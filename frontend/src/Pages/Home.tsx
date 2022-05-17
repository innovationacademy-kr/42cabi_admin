import styled from "styled-components";
import TotalStateChart from "../Charts/TotalStateChart";
import FloorStateChart from "../Charts/FloorStateChart";

const Home = () => {
  return (
    <HomeContainer>
      <ChartContainer>
        <div className="title">전체 사물함 현황</div>
        <TotalStateChart />
      </ChartContainer>
      <ChartContainer>
        <div className="title">층별 사물함 현황</div>
        <FloorStateChart />
      </ChartContainer>
    </HomeContainer>
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  .title {
    font-size: 1.9rem;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
`;
export default Home;
