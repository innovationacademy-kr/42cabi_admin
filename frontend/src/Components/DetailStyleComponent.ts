import styled from "styled-components";

export const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  //   border: 0.5rem solid black;
  background-color: #dddddd;
  border-radius: 1.5rem;
  margin: 1rem;
  padding: 1rem;
  @media screen and (max-width: 370px) {
    padding: 0rem;
  }
`;

export const BigFontSize = styled.p`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: bold;
`;
