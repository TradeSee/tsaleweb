import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerFind from "../carousel/Banner-v1.png";
import BannerMetal from "../carousel/Banner-v2.png";
import BannerProduct from "../carousel/BannerBackgroundType1.png";
import IsoCompanie from "../carousel/7088807.png";
import IsoMetal from "../carousel/PriceIsometric.png";
import IsoBox from "../carousel/boxIsometric.png";
import {
  BtnBanner,
  CarouselContainer,
  CarouselContent,
  CarouselImage,
  IsometricBanner,
  ItemCarousel,
  TextDefault,
} from "../assets/styles";
import ResponsiveMapping from "../components/ResponsiveMapping";
import { useNavigate } from "react-router-dom";
import { saveAnalytics } from "../hooks/analytics";

const { width, height, size } = ResponsiveMapping();

export default function Carousel({ userId, name }) {
  //Carrossel temparáriamente fixo com 3 banner testes
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots) => (
      <div style={{ position: "absolute", top: 170, right: 30 }}>{dots}</div>
    ),
  };
  const navigate = useNavigate();

  const formattedDate = new Date().toISOString();

  const infoM = {
    action: `Open Page`,
    date: formattedDate,
    page: "Home",
    keywords: `Market Intelligence`,
    name: name,
  };
  const infoP = {
    action: `Open Page`,
    date: formattedDate,
    page: "Home",
    keywords: `Products`,
    name: name,
  };
  const infoF = {
    action: `Open Page`,
    date: formattedDate,
    page: "Home",
    keywords: `Trade Data Partner`,
    name: name,
  };

  function OpenMarket() {
    saveAnalytics(userId, infoM);
    navigate("/market-intelligence");
  }
  function OpenProduct() {
    saveAnalytics(userId, infoP);
    navigate("/market-intelligence");
  }
  function OpenFnd() {
    saveAnalytics(userId, infoF);
    navigate("/trade-data");
  }
  return (
    <CarouselContainer>
      <Slider {...settings}>
        <ItemCarousel>
          <CarouselContent style={{ marginTop: 30, paddingLeft: 20 }}>
            <TextDefault color={"#fff"} size={"40px"} bold={"800"}>
              Nexus{" "}
              <TextDefault color={"#fff"} size={"40px"} bold={"800"}>
                Data
              </TextDefault>{" "}
            </TextDefault>
          </CarouselContent>
          <CarouselContent
            style={{ marginTop: 90, paddingLeft: 20, width: "30%" }}
          >
            <TextDefault color={"#fff"} size={"20px"} bold={"100"}>
              Get access to all metal suppliers worldwide
            </TextDefault>
          </CarouselContent>
          <CarouselContent
            style={{ marginTop: 140, paddingLeft: 20, width: "25%" }}
          >
            <BtnBanner className="BtnBannerGlass" onClick={OpenFnd}>
              <TextDefault color={"#366DFB"} size={"19px"}>
                Find now
              </TextDefault>
            </BtnBanner>
          </CarouselContent>
          <CarouselContent
            style={{
              marginTop: -9,
              marginLeft: size === "md" ? "8.5%" : "9%",
              width: "20%",
            }}
          ></CarouselContent>
          <CarouselImage src={BannerFind} />
        </ItemCarousel>

        <ItemCarousel>
          <CarouselContent style={{ marginTop: 30, paddingLeft: 20 }}>
            <TextDefault color={"#fff"} size={"40px"} bold={"800"}>
              Market Intelligence
            </TextDefault>
          </CarouselContent>
          <CarouselContent
            style={{ marginTop: 90, paddingLeft: 20, width: "30%" }}
          >
            <TextDefault color={"#fff"} size={"20px"} bold={"100"}>
              Analyze metal prices and obtain quotes
            </TextDefault>
          </CarouselContent>
          <CarouselContent
            style={{ marginTop: 140, paddingLeft: 20, width: "25%" }}
          >
            <BtnBanner className="BtnBannerGlass" onClick={OpenMarket}>
              <TextDefault color={"#1b3065"} size={"19px"}>
                Check now
              </TextDefault>
            </BtnBanner>
          </CarouselContent>
          <CarouselContent
            style={{
              marginTop: 0,
              marginLeft: size === "md" ? "8.5%" : "9%",
              width: "20%",
            }}
          ></CarouselContent>
          <CarouselImage src={BannerMetal} />
        </ItemCarousel>
      </Slider>
    </CarouselContainer>
  );
}
