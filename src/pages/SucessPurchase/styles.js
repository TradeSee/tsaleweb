import { styled } from "styled-components";

export const Container = styled.div``;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 99dvh;
  align-items: center;
  justify-content: center;

  div {
    color: #1c57d9;
    font-size: 20px;
    max-width: 500px;
    text-align: center;
    margin-top: 48px;
  }

  button {
    background-color: #204cf0;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    padding: 8px 16px;
    border-radius: 100px;
    margin-top: 64px;
    cursor: pointer;

    &:hover {
      transition: 0.3s;
      transform: scale(1.1);
    }
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  color: #1d47b0;
`;

export const LogoIcon = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.main[500]};
  padding: 8px;
`;
