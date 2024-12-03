import styled, { keyframes } from "styled-components";

import backgroundImage from "../../../../icons/sanctionImg.png";

const SlideTop = keyframes`
0%{transform:translateY(0);
} 100% {
  transform:translateY(8px);
  }
`;

// Tables tab
export const TablesContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 500px;
`;

export const DownloadButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 4px;
  cursor: pointer;

  &:active {
    animation: ${SlideTop} 0.4s linear infinite;
  }
`;

// > Navigation
export const NavigationContainer = styled.div`
  position: sticky;
  top: 24px;
  width: 100%;
  height: 164px;
`;

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const MyItem = styled.div`
  margin-right: 20px;
  padding-bottom: ${({ active }) => (active ? "3px" : "0")};
  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.main[500]}` : "none"};
  cursor: pointer;
`;

export const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const Mr8 = styled.div`
  margin-right: 8px;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.button.main};
  width: 100px;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.button.active};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.disabled};
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
    color: ${({ theme }) => theme.colors.textColor};
    grid-column: 1/-1;
  }

  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
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
      color: ${({ theme }) => theme.colors.gray[500]};
    }
    strong {
      color: ${({ theme }) => theme.colors.textColor};
    }
  }
`;

export const TableNavigator = styled.nav`
  position: relative;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.gray[200]};
    top: 0;
    bottom: 0;
    left: 50.55%;
    margin-left: -3px;
    border-radius: 8px;
  }
`;

export const Option = styled.div`
  padding: 4px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  left: 50%;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    width: ${({ isActive }) => (isActive ? "30px" : "25px")};
    height: ${({ isActive }) => (isActive ? "30px" : "25px")};
    left: ${({ isActive }) => (isActive ? "-15px" : "-12px")};
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.colors.main[500] : theme.colors.gray[200]};
    transition: all 0.4s;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  &::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 22px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  .navContent {
    p {
      color: ${({ isActive, theme }) =>
        isActive ? theme.colors.main[500] : theme.colors.gray[200]};
      font-weight: ${({ isActive }) => (isActive ? "bold" : 500)};
      transition: all 0.3s;
    }
  }
`;

// Sanction Tab
export const SanctionImage = styled.div`
  width: 350px;
  height: 350px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

export const SanctionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Shipments

export const ShipmentsDownload = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 8px;
  gap: 8px;
  font-size: 16px;
  margin-right: 40px;
  border: none;
  color: #fafafa;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.button.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.button.active};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.disabled};
  }
`;
