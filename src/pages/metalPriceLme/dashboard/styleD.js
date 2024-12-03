import { Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.bgColor || props.theme.colors.main[500]};
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;

  &:hover {
    color: #fff;
  }
`;

export const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-radius: 5px;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 5px;
  }
`;

export const NewsContainer = styled.div`
  width: 85%;
  padding-left: 24px;

  .swiper {
    width: 100%;
  }

  .swiper-slide {
    width: 80%;
    max-width: 495px;
    height: 240px;
  }
`;

export const ChartContainer = styled.div`
  position: relative;

  .metalContainer {
    display: flex !important;
    align-items: center !important;
    justify-content: center;
    padding-top: 4px;
  }
`;

export const GridMetal = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(300px, 400px);
  margin-bottom: -28px;
`;

export const MetalVariation = styled.div`
  width: 100%;
  display: flex;
  background-color: #1e1e1e;
  color: white;
  bottom: 12px;
  border-radius: 4px;

  div {
    .metalName {
      font-weight: bold;
    }
  }

  div + div {
    margin-left: 16px;
  }
`;

export const Variation = styled.small`
  color: ${({ percVariation, theme }) =>
    percVariation <= 0
      ? `${theme.colors.danger.main}`
      : `${theme.colors.sucess.main}`};
`;

export const MetalList = styled.div`
  height: 426px;
  position: relative;
  overflow-y: scroll;
  margin-top: -18px;

`;

export const Metal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  padding: 0 8px;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  background-color: ${({ IsSelected, theme }) =>
    IsSelected ? theme.colors.light[50] : "transparent"};
  color: #4b4b4b;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light[50]};
  }

  &:after {
    content: "\\2713";
    position: absolute;
    background-color: ${({ theme }) => theme.colors.main[500]};
    color: #fff;
    width: 20px;
    height: 20px;
    left: 36px;
    top: 0;
    display: ${({ IsSelected }) => (IsSelected ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }

  .first {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    .favoriteMetal {
      background-color: ${({ theme }) => theme.colors.main[500]};
      padding: 8px;
      border-radius: 4px;
    }
  }

  .prices {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .deleteMetal {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }

  section {
    h3 {
      margin: 0px;
      font-weight: 800;
      font-size: 16px;
    }

    .metalPrice {
      font-size: 16px;
      font-weight: 800;
    }

    div {
      display: flex;
      height: max-content;
      flex-direction: column;
      justify-content: center;
    }

    img {
      width: 40px;
      height: 40px;
      background-color: ${({ theme }) => theme.colors.main[500]};
      padding: 8px;
      border-radius: 4px;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;
export const MetalHome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  background-color: ${({ IsSelected, theme }) =>
    IsSelected ? theme.colors.light[50] : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light[50]};
  }

  &:after {
    content: "\\2713";
    position: absolute;
    background-color: ${({ theme }) => theme.colors.main[500]};
    color: #fff;
    width: 20px;
    height: 20px;
    top: 5px;
    right: 5px;
    display: ${({ IsSelected }) => (IsSelected ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }

  .first {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  section {
    h3 {
      margin: 0px;
    }

    div {
      display: flex;
      height: max-content;
      flex-direction: column;
      justify-content: center;
    }

    img {
      width: 40px;
      height: 40px;
      background-color: ${({ theme }) => theme.colors.main[500]};
      padding: 8px;
      border-radius: 4px;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;
