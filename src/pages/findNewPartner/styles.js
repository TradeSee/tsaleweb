import styled from "styled-components";
import backgroundImage from "../../icons/sanctionImg.png";

// Start
export const StartContainer = styled.div`
  max-width: 100%;
`;

// All
export const Empty = styled.div`
  height: 80dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    width: 40%;
    color: ${({ theme }) => theme.colors.main[900]};
  }

  img {
    width: 80px;
  }

  button {
    background-color: ${({ theme }) => theme.colors.button.main};
    border: none;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.button.color};
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.button.hover};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.button.active};
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 98%;
  margin-bottom: 4px;

  small {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

export const BtnsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
`;

export const SecondaryBtn = styled.button`
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondaryButton.mainBg};
  color: ${({ theme }) => theme.colors.secondaryButton.mainColor};
  border: 2.5px solid ${({ theme }) => theme.colors.secondaryButton.mainColor};
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  height: 45px;
  font-size: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryButton.hoverBg};
    color: ${({ theme }) => theme.colors.secondaryButton.hoverColor};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryButton.activeBg};
  }
`;

export const Cta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  small {
    max-width: 70%;
    text-align: center;
  }

  button {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.button.color};
    background-color: ${({ theme }) => theme.colors.button.main};
    padding: 12px 32px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.button.hover};
    }

    &:active {
      background: ${({ theme }) => theme.colors.button.active};
    }

    &:disabled {
      background: ${({ theme }) => theme.colors.button.disabled};
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  width: 98%;
  margin-bottom: 20px;

  small {
    color: #a7a7a7;
  }

  button {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.button.color};
    background-color: ${({ theme }) => theme.colors.button.main};
    padding: 12px 24px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.button.hover};
    }

    &:active {
      background: ${({ theme }) => theme.colors.button.active};
    }

    &:disabled {
      background: ${({ theme }) => theme.colors.button.disabled};
    }
  }
`;

export const Container = styled.main`
  width: 100%;
  height: 80dvh;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  justify-content: space-between;
`;

export const TabsContainer = styled.section`
  width: 97%;
  height: fit-content;
  border-radius: 8px;
  transition: all 0.2s;
`;

// Filters
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
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
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

export const AdvancedFilters = styled.div`
  background-color: #fafafa;
  max-width: 96%;
  display: grid;
  flex-direction: column;
  align-items: center;
  grid-template-rows: 20px 1fr;

  gap: 16px;
  box-shadow: 0 4px 4px #00000040;
  border-radius: 8px;
  padding: 24px 40px;

  h2 {
    color: ${({ filterBy, theme }) =>
      filterBy === "name"
        ? `${theme.colors.gray[300]}`
        : `${theme.colors.textColor}`};
    grid-column: 1/-1;
  }

  .Filters {
    display: flex;
    gap: 64px;
  }

  .Filters > .date {
    display: flex;
    gap: 48px;
    width: 100%;
  }

  .Filters > .date > * {
    flex: 1;
  }

  .role {
    display: flex;
    flex-direction: row;
  }

  .slider {
    grid-column: 1/-1;
    margin-left: 12px;
    width: 95%;
  }
`;

export const CardSwitch = styled.div`
  & + & {
    margin-left: 24px;
  }

  background: ${({ ByName, color, theme }) =>
    ByName ? `${theme.colors.gray[300]}` : color};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  width: 18rem;
  height: 8rem;

  border-radius: 1rem;
  overflow: hidden;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  --gradient: ${({ theme }) => `linear-gradient(
    to bottom,
    ${theme.colors.dark[400]},
    ${theme.colors.dark[300]}
  )`};
  --color: ${({ theme }) => theme.colors.dark[500]};

  &::after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: ${({ ByName }) => (ByName ? "#fafafa" : "var(--gradient)")};
    transition: transform 300ms ease;
    z-index: 4;
  }

  &:hover:after {
    transform: ${({ ByName }) =>
      ByName ? "translateX(0)" : "translateX(0.15rem)"};
  }

  &:hover .notibody,
  &:hover .notititle {
    transform: ${({ ByName }) =>
      ByName ? "translateX(0)" : "translateX(0.25rem)"};
  }
`;

export const CardSwitchText = styled.div`
  color: ${({ ByName, color }) => (ByName ? "#ffffff" : color)};
`;

export const FilterFooter = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: flex;
  width: 100%;
  grid-column: 1/-1;
  padding-right: 24px;
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

// Profile
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
`;
