import styled from "styled-components";

export const StartContainer = styled.div`
  max-width: 100%;
`;

export const BtnsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
`;

export const SecondaryBtn = styled.button`
  border: none;
  border-radius: 8px;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.main[500]};
  border: 2.5px solid ${({ theme }) => theme.colors.main[500]};
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  height: 45px;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.main[500]};
    color: #fafafa;
  }

  &:active {
    background-color: #2a5dc2;
  }
`;
