import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  gap: 12px;
  flex: 1;
  justify-content: space-between;
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
