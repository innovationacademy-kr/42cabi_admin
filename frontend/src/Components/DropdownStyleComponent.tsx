import styled from "styled-components";

export const DropDownContainer = styled.div`
  width: 7em;
  min-width: 6.5rem;
  margin-right: 1%;
  margin-left: 5%;
  margin-top: 1rem;
`;

export const DropDownHeader = styled.div`
  position: relative;
  margin-bottom: 0.2rem;
  padding: 0.8rem 2.2rem 0.6rem 1.2rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  height: 2.3rem;
  font-weight: 500;
  font-size: 1.3rem;
  color: #000000;
  background: #ffffff;
`;

export const DropDownHeaderSymbol = styled.div`
  display: inline;
  padding-left: 75%;
  padding-right: 0;
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  width: 7em;
`;

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-width: 6.5rem;
  padding-left: 1.2rem;
  background: #ffffff;
  border: 0.2rem solid #e5e5e5;
  box-sizing: border-box;
  color: #000000;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 1rem;
  }
`;

export const ListItem = styled.div`
  list-style: none;
  display: flex;
  margin-bottom: 1rem;
`;
