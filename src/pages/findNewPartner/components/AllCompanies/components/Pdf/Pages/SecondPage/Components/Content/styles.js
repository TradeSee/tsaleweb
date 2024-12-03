import styled from "styled-components";

export const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  font-size: 12px;

  th {
    padding: 8px 0;
  }

  td {
    text-align: center;
  }

  th,
  td {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 4px;
  }
`;
