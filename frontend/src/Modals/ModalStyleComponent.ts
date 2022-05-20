import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const Contents = styled.div`
  position: relative;
  top: 0px;
  padding: 0 auto;
  border-radius: 1.5rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.19),
    0 0.6rem 0.6rem rgba(0, 0, 0, 0.23);
  background-color: white;
  text-align: center;
  width: 50%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: rgba(66, 87, 179, 0.52);
  width: 100%;
  overflow: auto;
  height: 10%;
`;

export const Close = styled.div`
  position: absolute;
  margin-right: 1.5rem;
  color: gray;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const Body = styled.div`
  margin: 2rem;
`;

export const ConfirmButton = styled.button`
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border: none;
  background-color: rgba(66, 87, 179, 0.7);
  color: #eeeeee;
  :hover:enabled {
    background-color: #6667ab;
    cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const CancleButton = styled.button`
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border: none;
  background-color: #aaaaaa;
  :hover:enabled {
    background-color: #999999;
    cursor: pointer;
`;

export const ToggleBtn = styled.button<{
  toggle: number;
}>`
  width: 6.4rem;
  height: 2.5rem;
  margin-left: 1rem;
  border-radius: 5rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "none" : "rgb(51,30,190)")};
  position: relative;
  display: inline;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export const Circle = styled.div<{
  toggle: number;
}>`
  background-color: white;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 5rem;
  position: absolute;
  left: 2%;
  top: 3%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(3.9rem, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
