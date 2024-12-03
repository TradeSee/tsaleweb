import styled from "styled-components";
import Logo from "../../../../assets/Logo60.png";

export const Container = styled.section`
  display: flex;
  flex: 1;
  width: 210mm;
  height: 297mm;
  padding-left: 24;
  padding-right: 24;
  flex-direction: column;
  justify-content: space-between;
  break-before: always;
  overflow: hidden;
  background-color: #ffff;

  background-image: url(${Logo});
  background-repeat: no-repeat;
  background-position: center right;

  @media print {
    @page {
      /* size: A4 portrait; */
    }
  }
`;
