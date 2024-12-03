import styled from "styled-components";
import Bg from "../../assets/Bg.png";

export const Container = styled.div`
  padding: 24;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 75dvh;
  background: url(${Bg}) center no-repeat;
  position: relative;

  .bar {
    position: absolute;
    width: 100%;
    height: 12px;
    background-color: #0981b1;
    top: 0;

    &::before {
      content: "";
      position: absolute;
      background-color: #089bd5;
      width: 35%;
      height: 12px;
      left: 0;
    }

    &::after {
      content: "";
      position: absolute;
      background-color: #153344;
      width: 35%;
      height: 12px;
      right: 0;
    }
  }

  h2 {
    margin: 32px 32px 12px 32px;
    font-size: 80px;
    font-weight: 900;
    position: relative;
    line-height: 64px;

    &::after {
      content: "";
      background-color: #000;
      position: absolute;
      bottom: -8px;
      height: 2px;
      width: 30%;
      left: 0;
    }
  }

  span {
    margin: 12px 12px 0 32px;
    font-weight: 500;
  }

  footer {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    img {
      width: 100px;
    }
  }
`;
