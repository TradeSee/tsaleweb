import styled from "styled-components";

export const ActionButton = styled.button`
  font-size: 16;
  font-weight: bold;
  color: #fafafa;
  background: #1c57d9;
  padding: 12px 24px;
  border: none;
  outline: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  :hover {
    background: #246dec;
  }

  :active {
    background: #1d47b0;
  }

  z-index: 2000;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  align-self: right;
  justify-self: right;
  width: fit-content;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.colors.danger.main};
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.danger.main};
  transition: all 0.2s;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.danger.main};
    background-color: ${({ theme }) => theme.colors.danger.main};
    color: #fafafa;
  }

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.danger.main};
    background-color: ${({ theme }) => theme.colors.danger.dark};
    color: #fafafa;
  }
`;
