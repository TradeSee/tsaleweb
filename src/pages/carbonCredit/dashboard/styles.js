import styled from "styled-components";
import Bg from "../icons/bgCard.png";
import BgCard from "../icons/bgTreeCard.png";
import BackVerde from "../../../icons/verde.jpg";

export const Header = styled.div`
  position: relative;
  width: 98%;
  height: 150px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 24px;

  background: url(${BackVerde});
  background-size: cover;
  margin-bottom: 150px;
  border-radius: 20px;
`;

export const HeaderCard = styled.div`
  height: 150px;
  background-color: white;
  margin-top: 70px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 10px;

  & + & {
    margin-left: 8px;
  }
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 24px;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 1300px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Marketplace = styled.div`
  grid-column: 1 / 3;
  background: url(${Bg}) no-repeat;
  background-size: cover;
  border-radius: 24px;

  padding: 64px 0px 64px 48px;

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

export const FootCard = styled.section`
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  header {
    background: url(${BgCard});
    background-size: cover;
    background-repeat: no-repeat;
    height: 70px;
    height: 50%;
    max-height: 50%;

    @media screen {
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 20px #bac4e7;
    border-radius: 0 0 8px 16px;
    height: 50%;
    justify-content: space-evenly;

    h3 {
      line-height: 0px;
    }

    p {
      width: 60%;
      text-align: center;
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

export const Icons = styled.section`
  display: flex;
  align-items: center;
`;

// width=98%"
// height="150px"
// borderRadius="20px"
// style={{
//   backgroundImage: `url(${BackVerde})`,
//   backgroundSize: "cover",
//   marginBottom: "150px",
//   display: "grid",
// }}
// position="relative"
