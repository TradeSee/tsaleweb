import styled from "styled-components";

export const Container = styled.main`
  width: 100%;

  a {
    text-decoration: none;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  span {
    color: #1b3065;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const CardContainer = styled.section`
  width: 100%;
  box-shadow: 0 0 12px #d4dbf1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & + & {
    margin-top: 32px;
  }
`;
