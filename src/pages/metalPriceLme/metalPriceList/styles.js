import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 300px 1fr;
  gap: 64px;

  button {
    cursor: pointer;
  }

  .firstMetal,
  .head {
    margin-top: 20px;
    width: 100%;
  }

  .firstMetal {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 60dvw;
  }

  .daily,
  .variation {
    border-bottom: 1px solid #ccc;
  }
`;

export const InputComparationName = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #aaa;
`;

export const PDFContainer = styled.div`
  break-before: always;
  size: A4 portrait;
  position: absolute;
  top: -1000%;

  @media print {
    top: 0;

    @page {
      margin: 5mm;
      padding: 24px;
      /* size: A4 portrait; */
      break-before: always;
    }
  }
`;

export const PdfDashboard = styled.div`
  display: flex;
  flex: 1;
  width: 210mm;
  height: 297mm;
  max-height: 100dvh;
  padding-left: 24;
  padding-right: 24;
  flex-direction: column;
  justify-content: center;
  break-before: always;
  overflow: hidden;
  size: A4 portrait;
  background-color: #ffff;
  padding-left: 0 24px;
  padding-right: 0 24px;

  background-repeat: no-repeat;
  background-position: center center;

  @media print {
    @page {
      size: A4 portrait;
    }
  }
`;

export const Variation = styled.h3`
  color: ${({ percVariation, theme }) =>
    percVariation <= 0
      ? `${theme.colors.danger.main}`
      : `${theme.colors.sucess.main}`};
`;

export const NewMetal = styled.div`
  background-color: ${({ hasSelectedMetal, theme }) =>
    hasSelectedMetal ? "transparent" : `${theme.colors.gray[50]}`};
  width: 100%;
  max-height: 300px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: ${({ hasSelectedMetal }) =>
    hasSelectedMetal ? "left" : "center"};
  justify-content: center;
  transition: all 0.2s;

  .addNew {
    padding: 48px 0;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      color: ${({ theme }) => theme.colors.danger.light};

      :hover {
        transition: all 0.2s;
        color: ${({ theme }) => theme.colors.danger.main};
      }
    }
  }

  .icon {
    background-color: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 50%;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ isFavorite, theme }) =>
    isFavorite ? "#fafafa" : theme.colors.main[500]};
  font-weight: 600;
  cursor: pointer;

  background-color: ${({ isFavorite, theme }) =>
    isFavorite ? theme.colors.main[500] : "transparent"};
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.main[500]};
  border-radius: 4px;
  align-self: end;
`;

export const CompareMetals = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #fafafa;
  background-color: ${({ theme }) => theme.colors.button.main};
  border: none;
  border-radius: 4px;
  outline: none;
  padding: 4px 8px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.button.active};
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  td,
  tr,
  th {
    border: 1px solid ${({ theme }) => theme.colors.darker[50]};
    color: ${({ theme }) => theme.colors.main[950]};
  }

  td,
  th {
    font-size: 16px;
    text-align: right;
    padding: 8px;
  }

  .metalName {
    text-align: left;
  }

  .metalVar {
    display: flex;
    border: none;
    align-items: center;
    justify-content: space-between;
  }
`;

export const RemoveMetal = styled.button`
  background-color: ${({ theme }) => theme.colors.darker[50]};
  border: none;
  border-radius: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
