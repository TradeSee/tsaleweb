import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Option = styled.div`
  background: ${({ ByName, color, theme }) =>
    ByName ? theme.colors.gray[300] : color};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  height: 128px;
  min-width: 240px;
  width: 50%;

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
