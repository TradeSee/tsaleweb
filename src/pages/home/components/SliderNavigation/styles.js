import styled from "styled-components";

export const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
