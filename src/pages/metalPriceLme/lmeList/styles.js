import styled from "styled-components";

export const Container = styled.main`
  h1 {
    color: ${({ theme }) => theme.colors.button.main[800]};
  }

  header {
    margin-bottom: 48px;
  }

  button {
    border-radius: 17px;
    background: ${({ theme }) => theme.colors.button.main};
    display: flex;
    padding: 16px 8px;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.button.color};
    font-weight: bold;
    font-size: 16px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s;
    margin-left: 68px;

    &:hover {
      transform: scale(1.05);
      background: ${({ theme }) => theme.colors.button.hover};
    }

    &:active {
      transform: scale(0.95);
      background: ${({ theme }) => theme.colors.button.active};
    }
  }
`;

export const FormContainer = styled.section``;

export const ChartsContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 68px;
`;
