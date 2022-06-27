import styled from "styled-components";

const CabiButton = styled.button<{
  Color: string;
  disabled: boolean;
}>`
  width: 60%;
  height: 4rem;
  margin: 1rem;
  min-width: 15rem;
  color: ${(props) => props.Color};
  border: 0.3rem solid ${(props) => props.Color};
  border-radius: ${(props) => props.theme.borderRadius};
  transition-duration: 0.4s;
  :hover:enabled {
    background-color: #d8d4d4;
    cursor: pointer;
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }
  :active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
`;

export default CabiButton;
