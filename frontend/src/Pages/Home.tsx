import styled from "styled-components";
import TotalStatusChart from "../Charts/TotalStatusChart";
import FloorStatusChart from "../Charts/FloorStatusChart";

const Home = () => {
  return (
    <Container>
      <div className="innerbox">
        <TotalStatusChart />
      </div>
      <div className="innerbox">
        <FloorStatusChart />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 50rem;
  .innerbox {
    flex: 1;
  }
`;
export default Home;
