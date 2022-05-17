import styled from "styled-components";
import TotalStateChart from "../Charts/TotalStateChart";
import FloorStateChart from "../Charts/FloorStateChart";

const Home = () => {
  return (
    <HomeContainer>
      <TotalStateChart />
      <FloorStateChart />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
`;
export default Home;
