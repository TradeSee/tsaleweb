import styled from "styled-components";
// import Bg from "../../icons/bgCard.png";
import BgCard from "../../../icons/T-SaleMetals-03.png";

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;

  a {
    text-decoration: none;
  }
`;

export const FootCard = styled.section`
  height: 400px;
  width: 355px;

  header {
    width: 100%;
    background-color: #d4dbf1;
    background-image: url(${BgCard});
    background-position: center center;
    background-size: 80%;
    height: 50%;
    border-radius: 20px 20px 0px 0px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0px 0px 20px #bac4e7;
    border-radius: 0 0 20px 16px;
    height: 50%;
    background-color: #fffbf5;

    h3 {
      line-height: 0px;
    }

    p {
      width: 80%;
      text-align: center;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
    button {
      background-color: ${({ theme }) => theme.colors.main[500]};
      color: #fff;
      outline: none;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 16px;

      &:hover {
        background-color: #204cf0;
        transform: scale(1.05);
        transition: 0.2s;
      }
    }
  }
`;

export const Marketplace = styled.div`
  width: 650px;
  height: 400px;

  background-size: 100%;
  padding-left: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 36px;
    color: #fafafa;
    width: 40%;
  }

  p {
    font-size: 16px;
    color: #fafafa;
    width: 60%;
  }
`;

export const Icons = styled.section`
  display: flex;
  align-items: center;
`;

export const SponsorCard = styled.div`
  max-width: 300px;
  box-shadow: 0px 0px 8px #5d5d5d;
  border-radius: 16px;

  header {
    background-color: ${({ theme }) => theme.colors.main[500]};
    padding: 24px;
    border-radius: 16px 16px 0 0;

    img {
      width: 220px;
    }
  }

  section {
    text-align: center;
    margin-bottom: 64px;
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      color: #fc5050;
      text-decoration: line-through;
    }

    div {
      border: 1px solid #51ca73;
      border-radius: 8px;
      padding: 8px 24px;
      position: relative;
      margin-top: 12px;
      margin-bottom: 32px;

      span {
        font-size: 24px;
        font-weight: 500;
      }

      &::before {
        content: "Save 50%";
        position: absolute;
        background-color: #51ca73;
        color: #fafafa;
        font-weight: bold;
        border-radius: 4px;
        padding: 0px 16px;
        top: -8px;
      }
    }

    button {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      outline: none;
      background-color: #51ca73;
      font-size: 16px;
      font-weight: bold;
      color: #fafafa;
      margin-bottom: 48px;
    }
  }
`;
