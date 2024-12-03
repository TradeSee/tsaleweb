import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex: 1;

  flex-direction: column;
  justify-content: center;
  break-before: always;
  overflow: hidden;
  size: A4 portrait;
  background-color: #ffff;

  background-repeat: no-repeat;
  background-position: center center;

  @media print {
    page-break-before: always;

    @page {
      break-before: always;
      /* size: A4 portrait; */
    }
  }
`;
