import styled from "styled-components";
import { Grid } from "@mui/material";

export const Empty = styled.div`
  height: 80dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    width: 40%;
    color: #1b2e8d;
  }

  img {
    width: 80px;
  }

  button {
    background-color: #246dec;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fafafa;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #3a8cf7;
    }

    &:active {
      background-color: #1c57d9;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin-bottom: 4px;

  button {
    font-size: 16;
    font-weight: bold;
    color: #fafafa;
    background: #1c57d9;
    padding: 12px 24px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    :hover {
      background: #246dec;
    }

    :active {
      background: #1d47b0;
    }
  }
`;

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const TabsContainer = styled.section`
  width: 97%;
  height: fit-content;
  border-radius: 8px;
  transition: all 0.2s;
`;

export const FilterByName = styled.div`
  flex-direction: row;
  display: flex;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: 16px;

  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #aaa;
    outline: none;
  }
`;
export const MainFilter = styled.div`
  background-color: #fafafa;
  max-width: 96%;
  display: grid;
  flex-direction: column;
  grid-template-rows: 20px 1fr 1fr;
  grid-template-columns: minmax(200px, 1fr) 3fr 160px;
  align-items: center;

  gap: 16px;
  box-shadow: 0 4px 4px #00000040;
  border-radius: 8px;
  padding: 24px 40px;

  h2 {
    color: #17283e;
    grid-column: 1/-1;
  }

  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #aaa;
    outline: none;
  }

  .basic-multi-select {
    width: 100%;
    max-width: 1061px;
    flex-wrap: nowrap;
  }

  .Select-Text {
    font-size: 14px;
  }

  .searchBy {
    grid-column: 1/-1;
    display: flex;
    gap: 12px;
  }
`;

export const HeaderFilter = styled.div`
  max-width: 100%;
  display: grid;
  flex-direction: column;
  grid-template-rows: 40px 1fr 1fr;
  grid-template-columns: minmax(200px, 1fr) 3fr 160px;
  align-items: center;

  gap: 16px;
  box-shadow: 0 4px 0px #00000040;
  border-radius: 8px;
  padding: 24px 40px;

  h2 {
    color: #17283e;
    grid-column: 1/-1;
  }

  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #aaa;
    outline: none;
  }

  .basic-multi-select {
    width: 100%;
    max-width: 1061px;
    flex-wrap: nowrap;
  }

  .Select-Text {
    font-size: 14px;
  }

  .searchBy {
    grid-column: 1/-1;
    display: flex;
    gap: 12px;
  }

  .searchFor {
    grid-column: 1/-1;
  }

  .lookingFor {
    display: flex;
    gap: 32px;
  }
`;

// export const InRow = styled.div`
//   flex-direction: row;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   > * {
//     flex: 1;
//   }
// `;

export const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const Heading = styled.h4`
  margin-right: 8px;
  color: #17283e;
`;

export const Mr8 = styled.div`
  margin-right: 8px;
`;

export const Ml10 = styled.div`
  margin-left: 40%;
`;

export const HiddenInScreen = styled.p`
  display: none;

  @media print {
    display: block;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
`;

export const MyCard = styled.div`
  border-radius: 18px;
  background-color: #e9edf8;
  padding: 20px;
  flex: 1 0 calc(33.33% - 10px);
  max-width: 300px;
  box-sizing: border-box;
  min-height: 100px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
export const MyCardContent = styled.div`
  width: 100%;
`;

export const SearchButton = styled.button`
  background-color: #366dfb;
  width: 100px;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background-color: #214eb9;
  }
`;

export const ClearButton = styled.button`
  background-color: #fafafa;
  border: 1px solid #fafafa;
  border-radius: 4px;
  color: #000;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #214eb9;
  }
`;

export const Underline = styled.div`
  width: 5%;
  height: 2px;
  background-color: #366dfb;
`;

export const UnderlineG = styled.div`
  width: 1173px;
  height: 2px;
  background-color: #b5c0d0;
  margin-bottom: 10px;
`;

export const MyLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d1d1d1;
`;

export const CustomGrid = styled(Grid)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const Card = styled.div`
  width: 550px;
  height: auto;
  padding: 20px;
  border: 3px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;

  ${({ active }) =>
    active &&
    `
    border-color: #4b4b4b;
  `}
`;

export const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const InfoTitle = styled.span`
  font-weight: bold;
  color: #4b4b4b;
`;

export const InfoTitleR = styled.span`
  font-weight: normal;
`;
export const InfoValue = styled.span`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 80%;
  margin-left: 5px;
`;

export const InfoRight = styled.span`
  margin-bottom: 15px;
`;

export const GroupInput = styled.div`
  width: 50%;
  max-width: 250px;

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

export const SelectDefaultC = styled.select`
  border-width: 2px;
  border-color: #e9edf8;
  width: 50%;
  height: 50px;
  padding-right: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8a97aa;
  margin-right: 8px;
`;

export const BtnNextSolutions = styled.div`
  width: 160px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 8px;
  color: #fff;
  justify-self: right;
  transition: all 0.2s;
`;

export const MyItem = styled.div`
  margin-right: 20px;
  padding-bottom: ${({ active }) => (active ? "3px" : "0")};
  border-bottom: ${({ active }) => (active ? "2px solid #366DFB" : "none")};
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  padding-top: 12px;

  a,
  p {
    padding: 12px 16px;
  }

  a:hover,
  p:hover {
    background-color: #dddddd;
    border-radius: 4px;
  }
`;

export const Header = styled.header`
  border-radius: 8px;
  height: 240px;
  display: flex;
  align-items: center;
  gap: 24px;

  img {
    width: 160px;
    height: 160px;
    border: 1px solid ${({ theme }) => theme.colors.main[500]};
    border-radius: 50%;
  }

  .head_title {
  }
`;

export const ContactInfo = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, auto));
  gap: 12px;

  div {
    border-bottom: 1px solid #eeeeee;
    padding: 8px 0;
    display: flex;
    align-items: center;

    span {
      color: #969696;
    }
    strong {
      color: #17283e;
      margin-right: 5px;
    }
    a {
      color: #969696;
      text-decoration: none;
    }
  }
`;
