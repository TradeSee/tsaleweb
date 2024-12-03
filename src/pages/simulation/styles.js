import styled from "styled-components";

// Step 1
export const HsCodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, auto));
  margin-right: 64px;
`;

export const ButtonNextBlue = styled.button`
  position: absolute;
  bottom: 48px;
  right: 64px;
  z-index: 500;
  box-shadow: 1px 1px 8px #aaa;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.main[500]};
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  height: 45px;
  font-size: 20px;
  transition: all 0.2s;

  &:hover {
    background-color: #2a5dc2;
  }

  &:active {
    background: #1d47b0;
  }

  &:disabled {
    background: #ccc;
  }
`;

// Step 2
export const InputsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 416px));
  column-gap: 12px;
  row-gap: 20px;
`;

export const GroupInput = styled.div`
  width: 86%;
  max-width: 416px;
  margin-top: 20px;

  .buttonExplore {
    position: absolute;
    bottom: -24px;
  }

  @media screen and (max-width: 1160px) {
    img {
      display: none;
    }
  }
`;

// Step 4
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  column-gap: 52px;
  row-gap: 32px;
  margin-right: 120px;
  padding-bottom: 24px;
  margin-top: 24px;

  .country {
    display: flex;
    justify-content: space-evenly;

    img {
      width: 120px;
    }
  }
`;

export const InfoCard = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  padding: 0px 0px;
  position: relative;
  box-shadow: 1px 4px 4px #00000025;
  transition: all 0.2s;
  grid-row: 2;

  h2,
  h3 {
    color: #1b2e8d;
    display: flex;
    gap: 8px;
    line-height: 0;
    background-color: #f3f3f3;
    padding: 24px 0 24px 24px;
    margin: 0;
    border-radius: 8px 8px 0 0;
  }

  .Container {
    display: grid;
    grid-template-columns: 1fr 12px 1fr;
    margin-left: 24px;
    gap: 24px;
  }

  .midBar {
    background-color: #d1d1d1;
    height: 90%;
    width: 1px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d1d1d1;
    height: 25px;
    white-space: nowrap;

    & > span {
      width: 100%;
    }

    div {
      display: flex;
      align-items: center;
      gap: 4px;
      width: max-content;

      img {
        width: 24px;
        height: auto;
      }
    }
  }

  .To {
    padding-left: 12px;
  }

  .To,
  .From {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const CostsContainer = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  padding: 0px 0px;
  position: relative;
  box-shadow: 1px 4px 4px #00000025;
  transition: all 0.2s;
  grid-row: 2;

  h2,
  h3 {
    color: #1b2e8d;
    display: flex;
    gap: 8px;
    line-height: 0;
    background-color: #f3f3f3;
    padding: 24px 0 24px 24px;
    margin: 0;
    border-radius: 8px 8px 0 0;
  }

  .Container {
    display: grid;
    grid-template-columns: 1fr 12px 1fr;
    margin-left: 24px;
    gap: 24px;
  }

  .midBar {
    background-color: #d1d1d1;
    height: 90%;
    width: 1px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    white-space: nowrap;

    & > span {
      width: 100%;
    }

    div {
      display: flex;
      align-items: center;
      gap: 4px;
      width: max-content;

      img {
        width: 24px;
        height: auto;
      }
    }
  }

  .To {
    padding-left: 12px;
  }

  .To,
  .From {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Content = styled.section`
  display: flex;
  justify-content: space-between;
  padding-right: 64px;

  div {
    width: 100%;
  }

  img {
    width: 120px;
    height: 120px;
  }

  @media screen and (max-width: 990px) {
    border: none;
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
