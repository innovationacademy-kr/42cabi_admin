import React from "react";
import styled from "styled-components";

const Main = styled.div`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

export const DropDownContainer = styled.div`
  width: 4em;
  margin: 0 auto;
  margin-top: 1em;
`;

export const DropDownHeader = styled.div`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #000000;
  background: #ffffff;
`;

export const DropDownHeaderSymbol = styled.div`
  display: inline;
  padding-left: 1em;
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
