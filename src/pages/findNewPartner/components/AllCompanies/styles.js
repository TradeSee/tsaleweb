import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  width: 98%;
  margin-bottom: 20px;

  small {
    color: #a7a7a7;
  }

  button {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.button.main};
    padding: 12px 24px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.button.hover};
    }

    &:active {
      background: ${({ theme }) => theme.colors.button.active};
    }
  }
`;
