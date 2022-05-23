import styled from "styled-components";
import { useLocation } from "react-router-dom";

type searchError = {
  errorType: string;
};

const InvalidSearchResult = () => {
  const location = useLocation();
  const invalidReason: searchError = location.state as searchError;
  let message: string;
  if (invalidReason.errorType === "Cabinet") {
    message = "존재하지 않는 사물함입니다.";
  } else if (invalidReason.errorType === "User") {
    message = "      잘못된 인트라 ID 이거나\n사용한 기록이 없는 유저입니다.";
  } else {
    message = "입력을 다시 확인해주세요!";
  }

  return <DashboardBox>{message}</DashboardBox>;
};

const DashboardBox = styled.div`
  display: flex;
  height: 90%;
  // border: 0.5rem solid red;
  border-radius: 1.5rem;
  background-color: white;
  justify-content: center;
  margin: 0rem 1.5rem 0rem 1.5rem;
  padding: 10rem 2rem 10rem 2rem;
  font-size: 2rem;
  white-space: pre;
`;

export default InvalidSearchResult;
