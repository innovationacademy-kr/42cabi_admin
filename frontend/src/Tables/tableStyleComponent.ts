import styled from "styled-components";

export const TableSheet = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
`;

export const TableHead = styled.thead`
  border: 0.1rem solid #ddd;
  padding: 0.5rem;
`;

export const Td = styled.td`
  border: 0.1rem solid #ddd;
  padding: 0.8rem;
  min-width: 2rem;
`;

export const Tr = styled.tr`
  // :nth-child(even) {
  background-color: #f2f2f2;
  // }
  :hover {
    background-color: #fff;
  }
`;

export const Th = styled.th`
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  text-align: center;
  background-color: #123456;
  color: white;
`;

export const BigBlackText = styled.h2`
  margin-bottom: 0.3rem;
`;

export const SmallGrayText = styled.div`
  font-size: 1.5rem;
  color: gray;
  margin-top: 0rem;
  margin-bottom: 2rem;
`;

export const TablePageControlBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
`;

export const TableIndexBox = styled.strong`
  display: block;
  width: 10rem;
  text-align: center;
`;
