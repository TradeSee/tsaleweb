import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import AddIcon from "@mui/icons-material/Add";
import { Dropdown } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { authScreen } from "../../contexts/auth";

import Drawer from "../../components/Drawer";
import NewsList from "../../components/NewsList";
import LmeCard from "./components/LmeCard";
import AreaChart from "./components/Chart";
import LoadingPage from "../../components/LoadingPage";
import { SliderNavigation } from "./components/SliderNavigation";

import {
  Container,
  Filters,
  Input,
  SearchBar,
  Card,
  AddMetal,
  Header,
} from "./styles";
import { ContainerStay, RowContainer, TextDefault } from "../../assets/styles";

import { useNews } from "../../hooks/getNews";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { getFavoriteMetals, deleteFavoriteMetal } from "../../hooks/metalPrice";

import getUserInfo from "../../hooks/getUsers";
import FnpButton from "./components/FnpButton";
import { ThemeContext } from "styled-components";

export default function StayInformed() {
  const { newsData, loading } = useNews();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");
  const [auth, setAuth] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const theme = useContext(ThemeContext);

  const [favoriteMetals, setFavoriteMetals] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [toggleDrawer, useTroggleDawer] = useState(false);

  const FilteredNews = useMemo(
    () =>
      data?.filter(
        (news) =>
          news.text.toLowerCase().includes(searchValue.toLowerCase()) &&
          news.type.toLowerCase().includes(filter.toLowerCase())
      ),
    [data, searchValue, filter]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userInfo?.uid === "") {
      return;
    }

    async function fetchMetals() {
      getFavoriteMetals(userInfo?.uid)
        .then((res) => setFavoriteMetals(res))
        .catch((err) => console.log(err));
    }

    fetchMetals();
  }, [userInfo]);

  useEffect(() => {
    if (!loading) {
      const newsArray = newsData ? Object.values(newsData) : [];
      setData(newsArray);
    }
  }, [loading, newsData]);

  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 4000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  function handleSelectMetal(item) {
    setSelectedMetal(item);
  }

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  function handleDeleteMetal(id) {
    deleteFavoriteMetal(id, userInfo?.uid);

    getFavoriteMetals(userInfo?.uid)
      .then((res) => {
        setFavoriteMetals(res);
      })
      .catch((err) => console.log(err));
  }

  const items = [
    {
      key: "1",
      label: (
        <button
          onClick={() => setFilter("News")}
          style={{ background: "none", border: "none", width: "100%" }}
        >
          News
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => setFilter("MARKET COMMENTARY")}
          style={{ background: "none", border: "none", width: "100%" }}
        >
          Market
        </button>
      ),
    },
  ];

  const FavMetals = Object.keys(favoriteMetals).map(
    (key) => favoriteMetals[key].data
  );
  return (
    <>
      {auth ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={toggleDrawer ? 2 : 1}>
            <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
          </Grid>
          <Container>
            <Grid sx={{ marginLeft: "75px", marginTop: "32px" }}>
              <TextDefault color={"#4B4B4B"} size={"32px"}>
                {" "}
                Highlights
              </TextDefault>

              <br />
              <Swiper
                slidesPerView={windowWidth > 500 ? 4.2 : 1.2}
                spaceBetween={16}
                onSlideChange={(swiper) => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  });
                }}
              >
                <header
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  slot="container-start"
                >
                  <TextDefault color={"#4b4b4b"} size={"14px"}>
                    Favorited Metals
                  </TextDefault>

                  <SliderNavigation
                    isBeginning={sliderState.isBeginning}
                    isEnd={sliderState.isEnd}
                  />
                </header>

                {FavMetals.length === 0 && (
                  <AddMetal onClick={() => navigate("/market-intelligence")}>
                    <div>
                      <AddIcon
                        color={theme.colors.main[500]}
                        sx={{
                          color: theme.colors.main[500],
                        }}
                      />
                    </div>

                    <strong>Save your first metal</strong>
                  </AddMetal>
                )}

                {FavMetals.length > 0 &&
                  FavMetals.map((metalData) => (
                    <SwiperSlide key={metalData.id}>
                      <Card>
                        <div onClick={() => handleSelectMetal(metalData)}>
                          <strong>{metalData.MetalName}</strong>
                          <p>{`Last value: ${metalData.value4}`}</p>
                        </div>

                        <button onClick={() => handleDeleteMetal(metalData.id)}>
                          <BookmarkRemoveIcon sx={{ color: "#fafafa" }} />
                        </button>
                      </Card>
                    </SwiperSlide>
                  ))}
              </Swiper>

              <Header>
                <AreaChart metalData={selectedMetal} />
                <LmeCard />
                <FnpButton />
              </Header>

              <ContainerStay>
                <Filters>
                  <h3>Recent news</h3>

                  <div>
                    <SearchBar>
                      <Input
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />

                      <SearchIcon />
                    </SearchBar>

                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                      <button onClick={(e) => e.preventDefault()}>
                        <FilterListIcon />
                      </button>
                    </Dropdown>
                  </div>
                </Filters>

                <RowContainer
                  style={{
                    marginTop: 15,
                    alignItems: "center",
                  }}
                >
                  <NewsList data={FilteredNews} />
                </RowContainer>
              </ContainerStay>
            </Grid>
          </Container>
        </Grid>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
