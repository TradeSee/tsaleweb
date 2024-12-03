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
