import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  height: 80%;
  margin-left: 12px;
  width: 100%;
  padding-left: 24;
  padding-right: 24;
  flex-direction: column;
  break-before: always;
  size: A4 portrait;
  background-color: #ffff;
  border-top: 1px solid #dadada;
  padding-top: 12px;

  background-repeat: no-repeat;
  background-position: center right;

  @media print {
    @page {
      /* size: A4 portrait; */
    }
  }
`;
