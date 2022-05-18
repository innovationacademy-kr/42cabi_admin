import styled from "styled-components";

const NoPrevLog = () => {
  return (
    <div>
      <PrevLogBox>이전 사용 기록이 없습니다.</PrevLogBox>
    </div>
  );
};

const PrevLogBox = styled.div`
  display: flex;
  margin-left: 1rem;
  border: 0.5rem solid gray;
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 10rem;
  font-size: 2rem;
`;

export default NoPrevLog;
