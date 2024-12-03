import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useWindowWidth } from "../../../../hooks/useWindowWidth";
import { SliderNavigation } from "../SliderNavigation";
import NewsCard from "../NewsCard";

import { Header, SearchBar } from "./styles";

export default function NewsSlides({ data }) {
  const [searchField, setSearchField] = useState("");

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();

  const filteredNews = useMemo(
    () =>
      Object.values(data).filter((news) =>
        news.text.toLowerCase().includes(searchField.toLowerCase())
      ),
    [data, searchField]
  );

  return (
    <div style={{ maxWidth: "75vw" }}>
      <Swiper
        spaceBetween={16}
        slidesPerGroup={2}
        slidesPerView={windowWidth >= 500 ? 3.1 : 1.2}
        onSlideChange={(swiper) => {
          setSliderState({
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
          });
        }}
      >
        <Header slot="container-start">
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <strong>Recent News</strong>

            <SearchBar>
              <Search />
              <input
                placeholder="Search"
                onChange={(event) => setSearchField(event.target.value)}
              />
            </SearchBar>

            <Link>
              <strong>View All</strong>
            </Link>
          </div>

          <SliderNavigation
            isBeginning={sliderState.isBeginning}
            isEnd={sliderState.isEnd}
          />
        </Header>

        {filteredNews.map((item) => (
          <SwiperSlide key={item.id}>
            <NewsCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
