import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  Delete,
  Search,
  Star,
} from "@mui/icons-material";

import "swiper/css";
import "swiper/css/navigation";

import { useLme } from "../../../hooks/getLME";

import {
  ChartContainer,
  GridMetal,
  Metal,
  MetalList,
  Variation,
} from "./styleD";

import EngineImg from "./assets/engine.png";

import { BarTrade, TextDefault } from "../../../assets/styles";
import { format } from "date-fns";
import Slider from "react-slick";
import {
  deleteCompareList,
  deleteFavoriteMetal,
  getCompareList,
  getFavoriteMetals,
} from "../../../hooks/metalPrice";
import getUserInfo from "../../../hooks/getUsers";
import { ThemeContext } from "styled-components";
import { Box, Tab, Tabs } from "@mui/material";
import AllModal from "../../../components/AllModal";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SplineChart = ({ hideTradeBar, isOnHome }) => {
  const theme = useContext(ThemeContext);

  const { lmeData } = useLme();
  const [series, setSeries] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState({
    name: "Aluminium",
    color: theme.colors.main[400],
  });
  const [favoriteMetals, setFavoriteMetals] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [selectedTable, setSelectedTable] = useState(0);
  const [comparationLists, setComparationLists] = useState([]);
  const [isDeleteListModal, setIsDeleteListModal] = useState(false);
  const [listToDelete, setListToDelete] = useState("");

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

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        setUserInfo(res);

        Promise.all([
          getCompareList(res?.uid),
          getFavoriteMetals(res?.uid),
        ]).then((values) => {
          const favMetals = Object.keys(values[1]).map(
            (key) => values[1][key].data
          );

          const formattedFavoriteMetals = favMetals.map((fav) => {
            return {
              name: fav?.MetalName,
              data: [fav?.value1, fav?.value2, fav?.value3, fav?.value4],
              id: fav.id,
            };
          });

          const comparationMetals = values[0].map((list) =>
            Object.values(list).filter((data) => typeof data === "object")
          );

          const unifyComparationListData = comparationMetals.map(
            (list, index) => ({
              createdAt: values[0][index].created_at,
              id: values[0][index].listId,
              name: values[0][index].name,
              metals: list,
            })
          );

          setComparationLists(unifyComparationListData);
          setFavoriteMetals(formattedFavoriteMetals);
        });
      })
      .catch((err) => console.log("Error on fetch fav metals:", err));
  }, []);

  function getDateNDaysAgo(n) {
    const currentDate = new Date();
    const dateNDaysAgo = new Date(currentDate);
    dateNDaysAgo.setDate(currentDate.getDate() - n);
    return dateNDaysAgo;
  }

  const handleCommodityClick = (commodityName, color) => {
    setSelectedCommodity({ name: commodityName, color });
  };

  function convertStringToNumber(number) {
    if (typeof number === "string") {
      return parseFloat(number?.replace(",", ".")).toFixed(2);
    }

    return parseFloat(number).toFixed(2);
  }

  const handlePercentageVar = (initialVal, newVal) =>
    (((newVal - initialVal) / initialVal) * 100).toFixed(2);

  const formatToCurrency = (num) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      num
    );

  async function handleDeleteMetal(id) {
    await deleteFavoriteMetal(id, userInfo?.uid);

    getFavoriteMetals(userInfo?.uid)
      .then((res) => {
        const favMetals = Object.keys(res).map((key) => res[key].data);

        const formattedMetalNames = favMetals.map((fav) => {
          const words = fav?.MetalName.split(" ");
          const name = words.slice(0, 2).join(" ");

          return {
            name,
            data: [fav?.value1, fav?.value2, fav?.value3, fav?.value4],
            id: fav.id,
          };
        });

        setSelectedCommodity({ color: "#3A8BDB", name: "Aluminium" });
        setFavoriteMetals(formattedMetalNames);
      })
      .catch((err) => console.log(err));
  }

  const handleSelectTable = (event, newValue) => {
    if (newValue) {
      return setSelectedTable(newValue);
    }

    setSelectedTable((prevState) => (prevState === 0 ? 1 : 0));
  };

  const filteredSeries = useMemo(
    () => series.filter((serie) => serie.name === selectedCommodity.name),
    [selectedCommodity, series]
  );

  const filteredFavorites = useMemo(
    () => favoriteMetals.filter((fav) => fav.id === selectedCommodity.name),
    [favoriteMetals, selectedCommodity]
  );

  const filteredComparationLists = useMemo(
    () => comparationLists.filter((list) => list.id !== listToDelete),
    [listToDelete, comparationLists]
  );

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        format(getDateNDaysAgo(3), "dd/MM"),
        format(getDateNDaysAgo(2), "dd/MM"),
        format(getDateNDaysAgo(1), "dd/MM"),
        format(getDateNDaysAgo(0), "dd/MM"),
      ],
    },
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
  };

  function formatMetalName(MetalName) {
    const words = MetalName.split(" ");
    const name = words.slice(0, 2).join(" ");

    return name;
  }

  async function handleItemClick(item) {
    window.open(
      `/market-intelligence-details?name=${item.name}&value1=${item.data[0]}&value2=${item.data[1]}&value3=${item.data[2]}&value4=${item.data[3]}`,
      "_blank"
    );
  }

  async function openComparation(id) {
    window.open(`/market-intelligence-details?metalId=${id}`, "_blank");
  }

  return (
    <ChartContainer>
      {!isOnHome && (
        <TextDefault color={"#2D2D2D"} size={"18px"} bold={"600"}>
          {" "}
          London Metal Exchange{" "}
        </TextDefault>
      )}
      <br />
      <br />

      <AllModal
        type={"warning"}
        message={"After delete it you can't recover this comparation"}
        title={"Delete Comparation List"}
        onCancel={() => setIsDeleteListModal(false)}
        visible={isDeleteListModal}
        onConfirm={() => deleteCompareList(userInfo?.uid, listToDelete)}
      />

      <GridMetal>
        <ReactApexChart
          options={{
            ...options,
            colors: [selectedCommodity.color],
          }}
          series={
            filteredSeries.length === 0 ? filteredFavorites : filteredSeries
          }
          type="area"
          height={400}
        />

        <MetalList>
          <Tabs
            value={selectedTable}
            onChange={handleSelectTable}
            style={{
              borderBottom: `1px solid ${theme.colors.gray[100]}`,
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 16,
              boxShadow: "0 1px 8px #aaa",
            }}
            centered
          >
            <Tab label="LME" {...allyProps(0)} style={{ width: "33%" }} />
            <Tab
              label="Favorited Prices"
              {...allyProps(1)}
              style={{ width: "33%" }}
            />
            <Tab
              label="Comparations Lists"
              {...allyProps(2)}
              style={{ width: "33%" }}
            />
          </Tabs>

          <CustomTabPanel index={0} value={selectedTable}>
            {series.map((serie) => (
              <Metal
                key={serie.name}
                title="LME Metal"
                onClick={() =>
                  handleCommodityClick(`${serie.name}`, theme.colors.main[400])
                }
                isOnHome={isOnHome}
                IsSelected={selectedCommodity.name === serie.name}
              >
                <section className="first">
                  <img src={EngineImg} alt="Engine" />

                  <div>
                    <h3>{serie.name}</h3>
                  </div>
                </section>

                <section className="Metals">
                  <span className="metalPrice">
                    {formatToCurrency(serie?.data[3].toFixed(2))}
                  </span>

                  <span>
                    {" "}
                    {handlePercentageVar(serie.data[2], serie.data[3]) > 0 ? (
                      <ArrowDropUpRounded
                        sx={{ color: theme.colors.sucess.main }}
                      />
                    ) : (
                      <ArrowDropDownRounded
                        sx={{ color: theme.colors.danger.main }}
                      />
                    )}
                    <Variation
                      percVariation={handlePercentageVar(
                        serie.data[2],
                        serie.data[3]
                      )}
                    >
                      {handlePercentageVar(serie.data[2], serie.data[3])}%
                    </Variation>
                  </span>
                </section>
              </Metal>
            ))}
          </CustomTabPanel>

          <CustomTabPanel index={1} value={selectedTable}>
            {favoriteMetals.map((fav) => (
              <Metal
                key={fav.name}
                title="Favorited metal"
                onClick={() =>
                  handleCommodityClick(`${fav.id}`, theme.colors.main[400])
                }
                IsSelected={selectedCommodity.name === fav.id}
              >
                <section className="first">
                  <div className="favoriteMetal">
                    <Star style={{ color: "#fafafa" }} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h3>{formatMetalName(fav.name)}</h3>
                  </div>
                </section>

                <section className="Metals prices">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      onClick={() => handleItemClick(fav)}
                      className="deleteMetal"
                      title="Compare metal"
                    >
                      <Search sx={{ fontSize: 16 }} />
                    </button>

                    <button
                      onClick={() => handleDeleteMetal(fav.id)}
                      className="deleteMetal"
                    >
                      <Delete
                        sx={{ color: theme.colors.danger.main, fontSize: 16 }}
                      />
                    </button>
                  </div>

                  <span className="metalPrice">
                    {formatToCurrency(convertStringToNumber(fav.data[3]))}
                  </span>

                  <span>
                    {" "}
                    {handlePercentageVar(
                      convertStringToNumber(fav.data[2]),
                      convertStringToNumber(fav.data[3])
                    ) > 0 ? (
                      <ArrowDropUpRounded
                        sx={{ color: theme.colors.sucess.main }}
                      />
                    ) : (
                      <ArrowDropDownRounded
                        sx={{ color: theme.colors.danger.main }}
                      />
                    )}
                    <Variation
                      percVariation={handlePercentageVar(
                        convertStringToNumber(fav.data[2]),
                        convertStringToNumber(fav.data[3])
                      )}
                    >
                      {handlePercentageVar(
                        convertStringToNumber(fav.data[2]),
                        convertStringToNumber(fav.data[3])
                      )}
                      %
                    </Variation>
                  </span>
                </section>
              </Metal>
            ))}
          </CustomTabPanel>

          <CustomTabPanel index={2} value={selectedTable}>
            {filteredComparationLists.map((list) => (
              <Metal
                key={list.id}
                title="Favorited metal"
                style={{ padding: "4px 8px" }}
              >
                <section
                  className="first"
                  onClick={() => openComparation(list.id)}
                  style={{
                    width: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  <div className="favoriteMetal">
                    <Star style={{ color: "#fafafa" }} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h3>{list.name}</h3>
                  </div>
                </section>

                <section className="Metals prices">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      onClick={() => {
                        setIsDeleteListModal(true);
                        setListToDelete(list.id);
                      }}
                      className="deleteMetal"
                    >
                      <Delete
                        sx={{ color: theme.colors.danger.main, fontSize: 16 }}
                      />
                    </button>
                  </div>

                  <span className="metalPrice">
                    {format(new Date(list.createdAt), "dd/MM/yyyy")}
                  </span>
                </section>
              </Metal>
            ))}
          </CustomTabPanel>
        </MetalList>
      </GridMetal>

      {!hideTradeBar && (
        <BarTrade>
          <Slider {...sliderSettings}>
            {series.map((serie) => (
              <div key={serie.name} className="metalContainer">
                <span
                  className="metalName"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  {serie.name.substr(-20, 3).toUpperCase()}
                </span>
                {handlePercentageVar(serie.data[2], serie.data[3]) > 0 ? (
                  <ArrowDropUpRounded
                    sx={{ color: theme.colors.sucess.main }}
                  />
                ) : (
                  <ArrowDropDownRounded
                    sx={{ color: theme.colors.danger.main }}
                  />
                )}
                <Variation
                  percVariation={handlePercentageVar(
                    serie.data[2],
                    serie.data[3]
                  )}
                >
                  {handlePercentageVar(serie.data[2], serie.data[3])}%
                </Variation>
              </div>
            ))}
          </Slider>
        </BarTrade>
      )}
    </ChartContainer>
  );
};

export default SplineChart;
