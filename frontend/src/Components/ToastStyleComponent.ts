import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
  `;

const FadeOut = keyframes`
    from {
        opacity: 1
    }
    to {
        opacity: 0
    }
  `;

export const NotificationContatiner = styled.div<{
  disappear: boolean;
}>`
  font-size: 1.4rem;
  //   box-sizing: border-box;
  position: fixed;
  bottom: 1.2rem;
  right: 0.5rem;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${(props) => (props.disappear ? FadeOut : FadeIn)};
  animation-fill-mode: forwards;
`;

export const Notification = styled.div<{
  BgColor: string;
  disappear: boolean;
}>`
  display: flex;
  background: ${(props) => props.BgColor};
  position: relative;
  pointer-events: auto;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  opacity: 0.85;
  bottom: 1.2rem;
  right: 1.2rem;
  :hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: default;
  }
`;

export const Message = styled.p<{
  Color: string;
}>`
  color: ${(props) => props.Color};
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
