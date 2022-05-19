import styled from "styled-components";

export const TableSheet = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
`;

export const TableHead = styled.thead`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const Tr = styled.tr`
  :nth-child(even) {
    background-color: #f2f2f2;
  }
  :hover {
    background-color: #ddd;
  }
`;

export const Th = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #123456;
  color: white;
`;
