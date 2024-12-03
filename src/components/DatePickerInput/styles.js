import styled from "styled-components";

export const InputWrapper = styled.button`
  background-color: #fff;
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #ccc;
  padding-left: 0.75rem;
  height: 52px;
  color: #555;
  border: 1px solid #777;
  font-size: 16px;

  &:focus {
    border-color: #888;
    outline: none;
  }

  transition: all 0.3s;
  text-align: left;
  position: relative;
  padding-top: 1rem;

  ${({ theme, error }) =>
    error &&
    `
    border-color: ${theme.colors.danger.main};
  `}
`;

export const TextHolder = styled.span`
  position: absolute;
  color: #555;
  font-size: 0.75rem;
  left: 13px;
  top: 2px;
  pointer-events: none;
`;
