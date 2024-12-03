import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex: 1;
  width: 210mm;
  height: 297mm;
  max-height: 100dvh;
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: column;
  justify-content: center;
  break-before: always;
  overflow: hidden;
  size: A4 portrait;
  background-color: #ffff;

  background-repeat: no-repeat;
  background-position: center center;

  @media print {
    @page {
      /* size: A4 portrait; */
    }
  }
`;
