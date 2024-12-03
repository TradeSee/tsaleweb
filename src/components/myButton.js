import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.button.main};
  color: ${({ theme }) => theme.colors.button.color};
  font-weight: bold;
  padding: 15px 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  font-size: 16px;
  max-height: 45px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.button.active};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.disabled};
  }
`;

const MainButton = ({
  children,
  onClick,
  width,
  marginTop,
  marginLeft,
  style,
  disabled,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={style}
      width={width}
      disabled={disabled}
      marginTop={marginTop}
      marginLeft={marginLeft}
    >
      {children}
    </StyledButton>
  );
};

export default MainButton;
