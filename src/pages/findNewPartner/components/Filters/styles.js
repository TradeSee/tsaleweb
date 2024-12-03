import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 80dvh;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  justify-content: space-between;
`;

export const MainFilter = styled.div`
  background-color: #fafafa;
  max-width: 96%;
  display: grid;
  flex-direction: column;
  grid-template-rows: 20px 300px 160px 1fr;
  grid-template-columns: minmax(200px, 1fr) minmax(200px, 1.4fr) 1fr;
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
    border: 1px solid #aaa;
    outline: none;
  }

  .basic-multi-select {
    width: 100%;
    /* max-width: 1061px; */
    flex-wrap: nowrap;
  }

  .Select-Text {
    font-size: 14px;
  }

  .Filters {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
  }

  .searchFor {
    grid-column: 1/-1;
  }

  .lookingFor {
    display: flex;
    gap: 32px;
  }
`;

export const AdvancedFilters = styled.div`
  background-color: #fafafa;
  max-width: 96%;
  display: grid;
  flex-direction: column;
  align-items: center;
  grid-template-rows: 20px 1fr;

  gap: 32px;
  box-shadow: 0 4px 4px #00000040;
  border-radius: 8px;
  padding: 24px 40px;

  h2 {
    color: ${({ filterBy, theme }) =>
      filterBy === "name" ? theme.colors.gray[300] : theme.colors.textColor};
    grid-column: 1/-1;
  }
`;

export const CardSwitch = styled.div`
  background: ${({ ByName, color, theme }) =>
    ByName ? theme.colors.gray[300] : color};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  height: 128px;
  max-width: 230px;

  border-radius: 16px 0 0 16px;
  overflow: hidden;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  --gradient: ${({ theme }) => `linear-gradient(
    to bottom,
    ${theme.colors.dark[400]},
    ${theme.colors.dark[300]}
  )`};
  --color: ${({ theme }) => theme.colors.dark[500]};

  & + & {
    border-radius: 0 16px 16px 0;
  }

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
  width: 96%;
  grid-column: 1/-1;
  padding-right: px;
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
