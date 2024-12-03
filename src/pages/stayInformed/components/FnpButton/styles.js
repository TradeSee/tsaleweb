import styled from "styled-components";
import BannerFind from "../../../../carousel/BannerBackgroundType1.png";

export const Container = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: "100%";
  border-radius: 8px;
  background: url(${BannerFind}) no-repeat;
  cursor: pointer;
  margin-right: 12px;
  transition: 0.2s;

  &:hover {
    transform: scale(1.015);
    transition: 0.2s;
  }

  h1 {
    font-size: 30px;
    font-weight: 600;
    line-height: 12px;
    color: #fff;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img`
  width: 140px;
  height: 140px;
`;
