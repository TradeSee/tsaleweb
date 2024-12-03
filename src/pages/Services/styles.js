import { styled } from "styled-components";

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  justify-content: center;
`;

export const Header = styled.header`
  margin-top: 36px;
  color: #1d47b0;
  display: flex;
  align-items: center;
`;

export const LogoIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 24px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.main[500]};
  padding: 4px;
`;

export const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  width: 100%;
  row-gap: 32px;

  a {
    text-decoration: none;
    color: #1d408b;
    max-width: fit-content;

    &:hover {
      color: #818fb4;
    }
  }
`;

export const ServiceContainer = styled.section`
  width: 240px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #e9edf8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;
