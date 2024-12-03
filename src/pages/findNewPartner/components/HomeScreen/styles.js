import styled from "styled-components";

export const StartContainer = styled.div`
  max-width: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
  }
`;

export const List = styled.ul`
   list-style: none;
   margin: 100px;

   li {
    color: #8a97aa !important;

   }
   
   li:before {
    content: '\2714';
    margin: 0 1em;    /* any design */
  }    
  `;

export const BtnsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 48px;

  button {
    white-space: nowrap;
  }
`;

export const SecondaryBtn = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondaryButton.mainBg};
  color: ${({ theme }) => theme.colors.secondaryButton.mainColor};
  border: 2.5px solid ${({ theme }) => theme.colors.secondaryButton.mainColor};
  font-weight: bold;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  height: 45px;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryButton.hoverBg};
    color: ${({ theme }) => theme.colors.secondaryButton.hoverColor};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryButton.activeBg};
  }
`;
