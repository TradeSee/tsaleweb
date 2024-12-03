import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  gap: 12px;
  flex: 1;
  width: 210mm;
  padding-left: 24;
  padding-right: 24;
  flex-direction: column;
  align-items: center;
  break-before: always;
  max-width: 100dvw;
  overflow: hidden;
  size: A4 portrait;
  background-color: #ffff;

  background-repeat: no-repeat;
  background-position: center right;
  padding: 48px;

  @media print {
    @page {
      /* size: A4 portrait; */
    }
  }
`;

export const ContentContainer = styled.main`
  width: 100%;
  height: 5700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
