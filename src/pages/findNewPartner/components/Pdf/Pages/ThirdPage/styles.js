import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  gap: 12px;
  flex: 1;

  flex-direction: column;
  align-items: center;
  break-before: always;
  max-width: 100dvw;
  overflow: hidden;
  size: A4 portrait;
  background-color: #ffff;

  background-repeat: no-repeat;
  background-position: center right;

  @media print {
    @page {
      /* size: A4 portrait; */
    }
  }
`;

export const ContentContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
