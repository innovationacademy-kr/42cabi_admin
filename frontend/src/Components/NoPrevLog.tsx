import styled from "styled-components";

const NoPrevLog = () => {
  return <PrevLogBox>이전 사용 기록이 없습니다.</PrevLogBox>;
};

const PrevLogBox = styled.div`
  display: flex;
  border: 0.5rem solid gray;
  padding: 16.5rem 3rem 16.5rem 3rem;
  font-size: 2rem;
  justify-content: center;
  margin: 1rem;
`;

export default NoPrevLog;
