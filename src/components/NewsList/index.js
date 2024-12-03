import React from "react";
import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import { ArrowForward } from "@mui/icons-material";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Card, Header } from "./styles";

function NewsCard({ item, index }) {
  function cleanContent(text) {
    const regex = /^[^,]+, \d+ \w+ \(Argus\) —/;
    return text.replace(regex, "").trim();
  }

  function savePublishDate(text) {
    const regex = /^[^,]+, \d+ \w+ \(Argus\)/;
    // Encontre a primeira parte
    const publishedDate = text.match(regex)[0];

    return publishedDate;
  }

  return (
    <Card>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        key={index}
        to={`/stayinformed/${item.id}`}
      >
        <Header>
          <article style={{ paddingRight: 8 }}>
            <h2>{item.text}</h2>
          </article>
          <p>{savePublishDate(item.content)}</p>
        </Header>

        <CardContent>
          <Typography
            variant="body2"
            style={{
              textAlign: "justify",
              maxHeight: "4em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {cleanContent(item.content)}
          </Typography>

          <Typography
            variant="body2"
            style={{
              display: "flex",
              marginTop: 12,
              textAlign: "justify",
              maxHeight: "4em",
              maxWidth: "max-content",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              color: "#366DFB",
              alignItems: "center",
              borderBottom: "1px solid #366DFB",
            }}
          >
            Read
            <ArrowForward style={{ fontSize: 12 }} />
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

function NewsList({ data }) {
  const items = Object.values(data).slice(0, 6);

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={3}
      grid={{ rows: 2, fill: "row" }}
      pagination={{
        clickable: true,
      }}
      modules={[Grid, Pagination]}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <NewsCard key={item.id} item={item} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default NewsList;
