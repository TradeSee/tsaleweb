import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "swiper/css";
import "swiper/css/navigation";

import { useLme } from "../../../hooks/getLME";
import TradeMetalsList from "./TradeMetalsList";
import { BarTrade, RowContainer } from "../../../assets/styles";

const DashboardCarouselMetal = () => {
  const { lmeData } = useLme();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (lmeData?.MtUSD?.cashe_price) {
      const newSeries = lmeData?.MtUSD?.cashe_price.map((item) => ({
        name: item[0],
        data: item.slice(1).map((value) => parseFloat(value.replace(",", ""))),
      }));

      const seriesFormat = newSeries
        .map((serie) => ({
          ...serie,
          data: [...serie?.data],
        }))
        .filter(
          (serie) => serie.name !== "Al Alloy" && serie.name !== "NASAAC"
        );

      setSeries(seriesFormat);
    }
  }, [lmeData]);

  const handlePercentageVar = (initialVal, newVal) =>
    (((newVal - initialVal) / initialVal) * 100).toFixed(2);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
  };

  return (
    <BarTrade>
      <Slider {...settings}>
        {series.map((serie) => (
          <div key={serie.name}>
            <TradeMetalsList
              acron={serie.name.substr(-20, 3).toUpperCase()}
              var={handlePercentageVar(serie.data[2], serie.data[3])}
              state={
                handlePercentageVar(serie.data[2], serie.data[3]) > 0 ? 1 : -1
              }
            />
          </div>
        ))}
      </Slider>
    </BarTrade>
  );
};

export default DashboardCarouselMetal;
