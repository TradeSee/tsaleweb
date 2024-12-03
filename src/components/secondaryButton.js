import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.secondaryButton.mainBg};
  color: ${({ theme }) => theme.colors.secondaryButton.mainColor};
  border: 2.5px solid ${({ theme }) => theme.colors.secondaryButton.mainColor};
  font-weight: bold;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryButton.hoverBg};
    color: ${({ theme }) => theme.colors.secondaryButton.hoverColor};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryButton.activeBg};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondaryButton.disabled};
  }
`;

const SecondaryButton = ({
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

export default SecondaryButton;
