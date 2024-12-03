import styled from "styled-components";

export const Table = styled.table`
  max-width: 90%;
  border-collapse: collapse;
  font-size: 12px;

  & + & {
    margin-top: 8px;
  }

  th {
    padding: 8px 0;
  }

  td {
    text-align: center;
  }

  tr,
  th,
  td {
    padding: 4px;
    border: 1px solid #ccc;
  }
`;
