import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #8a97aa;
    font-weight: bold;
  }

  cursor: pointer;
`;

export const Icon = styled.div`
  position: relative;
  /* padding: 12px; */
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ IsSelected }) =>
    IsSelected ? "2px solid #366DFB" : "2px solid #e9edfb"};
  border-radius: 100%;
  box-shadow: 4px 3px 0 #e9edf860;

  img {
    width: 60px;
    border-radius: 100%;
  }

  svg {
    width: ${({ iconType }) => (iconType === "lme" ? `200px` : "28px")};
  }
  .LMEIcon {
    width: 500px;
  }
  &:after {
    content: "\\2713";
    position: absolute;
    background-color: ${({ theme }) => theme.colors.main[500]};
    color: #fff;
    width: 20px;
    height: 20px;
    right: -4px;
    top: 0;
    display: ${({ IsSelected }) => (IsSelected ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
`;
