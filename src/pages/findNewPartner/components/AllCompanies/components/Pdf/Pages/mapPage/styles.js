import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  gap: 12px;
  flex: 1;
  width: 210mm;
  height: 297mm;
  max-width: 210mm;
  max-height: 297mm;
  justify-content: space-between;
  padding-left: 24;
  padding-right: 24;
  flex-direction: column;
  align-items: center;
  break-before: always;
  overflow: hidden;
  size: A4 portrait;
  background-color: #ffff;

  background-repeat: no-repeat;
  background-position: center right;

  @media print {
    @page {
      size: A4 portrait;
    }
  }
`;
