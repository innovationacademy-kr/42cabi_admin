import styled from "styled-components";

const Main = styled.div`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

export const DropDownContainer = styled.div`
  width: 7em;
  margin-right: 1rem;
  margin-top: 1rem;
`;

export const DropDownHeader = styled.div`
  margin-bottom: 0.2em;
  padding: 0.6em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  height: 2.3rem;
  font-weight: 500;
  font-size: 1.3rem;
  color: #000000;
  background: #ffffff;
`;

export const DropDownHeaderSymbol = styled.div`
  display: inline;
  padding-left: 5em;
  padding-right: 0em;
`;

export const DropDownListContainer = styled.div``;

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #000000;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled.div`
  list-style: none;
  margin-bottom: 0.8em;
`;
