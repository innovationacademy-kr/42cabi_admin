import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <PageNotFoundStyles>
      <img
        src="/assets/pageNotFound.png"
        alt="page not found"
        style={{ width: "20rem", marginBottom: "1.5rem" }}
      />
      페이지를 찾을 수 없습니다
      <Link to="/saerom">
        <ButtonStyles>홈으로 돌아가기</ButtonStyles>
      </Link>
    </PageNotFoundStyles>
  );
};

const ButtonStyles = styled.button`
  width: 27rem;
  height: 4.5rem;
  margin-top: 1.5rem;

  color: #512d83;
  border: 0.25rem solid #512d83;
  border-radius: 0.5rem;
  background-color: #00000000;

  :hover {
    background-color: #00000011;
    transition: background-color 0.4s;
    cursor: pointer;
  }

  :active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
`;

const PageNotFoundStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8%;

  font-size: 2rem;
`;

export default PageNotFound;
