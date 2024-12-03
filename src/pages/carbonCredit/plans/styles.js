import { styled } from "styled-components";

import BG from "../icons/bgMarketplace.png";

export const Container = styled.div``;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.header`
  margin-top: 36px;
  color: #1d47b0;

  div {
    background: url(${BG}) no-repeat;
    width: 100%;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    position: relative;
    padding: 24px 0;

    h3 {
      text-align: center;
    }

    * {
      color: #fafafa;
    }
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 90%;
`;

export const Card = styled.article`
  border: 1px solid #b9b9b9;
  width: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  strong:first-of-type {
    margin: 16px 0;
  }

  strong {
    font-size: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #b9b9b9;
    max-width: 80%;

    & > img {
      margin-top: 24px;
    }

    span {
      max-width: 80%;
      text-align: center;
      margin: 20px 0;
      color: #777;
    }
  }
`;

export const Benefits = styled.aside`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #b9b9b9;

  & > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: #777;

    span {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
`;

export const Cta = styled.button`
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.main[500]};
  margin: 12px 0;
  padding: 12px 16px;
  font-weight: bold;
  border: none;
  outline: none;
  color: #fafafa;
  border-radius: 8px;
`;
