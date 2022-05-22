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
