import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 52px;
  row-gap: 32px;
  margin-right: 20%;
  padding-bottom: 24px;

  .country {
    display: flex;
    justify-content: space-evenly;

    img {
      width: 120px;
    }
  }
`;

export const InfoCard = styled.div`
  background-color: #e9edf8;
  border-radius: 12px;
  padding: 4px 24px;
  position: relative;
  box-shadow: 1px 4px 4px #00000025;
  transition: all 0.2s;

  h2,
  h3 {
    color: #1b2e8d;
    display: flex;
    gap: 8px;
  }

  hr {
    width: 40%;
    background-color: #bac4e7;
    outline: none;
    border: none;
    border-radius: 8px;
    height: 2px;
  }

  p {
    color: #151d56;
    font-weight: bold;
  }

  .To {
    border-left: 1px solid #bac4e7;
    padding-left: 12px;
  }

  &:hover {
    &::after {
      content: "Click to see more info about it";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #858acf60;
      border-radius: 12px;

      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      color: #fafafa;
    }
  }
`;

export const CostCard = styled.aside`
  background-color: #e9edf8;
  border-radius: 12px;
  padding: 4px 24px;
  position: relative;
  box-shadow: 1px 4px 4px #00000025;
  transition: all 0.2s;

  grid-row: ${({ isCostActive }) => isCostActive && "span 2"};

  h2,
  h3 {
    color: #1b2e8d;
    display: flex;
    gap: 8px;
  }

  hr {
    width: 40%;
    background-color: #bac4e7;
    outline: none;
    border: none;
    border-radius: 8px;
    height: 2px;
  }

  .cost {
    width: 34%;
  }

  p {
    color: #151d56;
    font-weight: bold;
  }

  &:hover {
    &::after {
      content: "Click to see more info about it";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #858acf60;
      border-radius: 12px;

      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      color: #fafafa;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  gap: 32px;
  grid-column: 2;

  button {
    font-size: 20;
    font-weight: bold;
    color: #fafafa;
    background: #1c57d9;
    padding: 12px 24px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #246dec;
    }

    &:active {
      background: #1d47b0;
    }
  }
`;
