import styled from "styled-components";

const CabiButton = styled.button<{
  Color: string;
  isActive: boolean;
}>`
  width: 40%;
  height: 4rem;
  margin: 1rem;
  min-width: 15rem;
  color: ${(props) => props.Color};
  border: 0.3rem solid ${(props) => props.Color};
  border-radius: ${(props) => props.theme.borderRadius};
  /* pointer-events: none; */
  transition-duration: 0.4s;
  :hover {
    background-color: #d8d4d4;
    cursor: pointer;
  }
`;

export default CabiButton;
