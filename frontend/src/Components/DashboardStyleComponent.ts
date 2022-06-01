import styled from "styled-components";

export const DashboardBox = styled.div`
  display: flex;
  width: 99%;
  height: 90%;
  justify-content: center;
  // border: 0.5rem solid #6667ab;
  @media screen and (max-width: 724px) {
    flex-direction: column;
    align-items: center;
  }
  padding-bottom: 5rem;
`;

export const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  // border: 0.2rem solid red;
  @media screen and (max-width: 724px) {
    width: 95%;
  }
`;

export const RightBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  width: 50%;
  margin: 0.3rem;
  // border: 0.2rem solid blue;
  @media screen and (max-width: 724px) {
    width: 95%;
  }
`;

export const GrayBgBox = styled.div`
  margin: 0.2rem;
  margin-top: 1rem;
  padding: 1rem;
  width: 95%;
  border-radius: 1.5rem;
  // border: 0.2rem solid green;
  background-color: #dddddd;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PrevLogBox = styled.div`
  display: flex;
  // border: 0.5rem solid gray;
  padding: 16.5rem 2rem 16.5rem 2rem;
  font-size: 2rem;
  justify-content: center;
  margin: 1rem;
`;
