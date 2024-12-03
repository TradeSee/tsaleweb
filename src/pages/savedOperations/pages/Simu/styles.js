import styled from "styled-components";

export const SimulationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 80%;
`;

export const InfoCard = styled.div`
  background-color: #e9edf8;
  border-radius: 12px;
  padding: 4px 24px;
  position: relative;
  box-shadow: 1px 4px 4px #00000025;
  transition: all 0.2s;
  display: flex;
  justify-content: space-evenly;
  width: 80%;

  strong {
    align-self: center;
    color: #aaa;
  }

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
    padding-left: 12px;
  }

  .To,
  .From {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100px;
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
