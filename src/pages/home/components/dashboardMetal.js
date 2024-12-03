import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";
import MetalListStyle from "./MetalsList";

import "swiper/css";
import "swiper/css/navigation";

import { useLme } from "../../../hooks/getLME";

import {
  ChartContainer,
  GridMetal,
  Metal,
  MetalHome,
  MetalList,
  MetalVariation,
  Variation,
} from "../../metalPriceLme/dashboard/styleD";

import EngineImg from "../../metalPriceLme/dashboard/assets/engine.png";

import { TextDefault } from "../../../assets/styles";
import InfoSelect from "../../findNewPartner/components/Selects";
import { format } from "date-fns";
import { Box, Tab, Tabs } from "@mui/material";
import { ThemeContext } from "styled-components";
import getUserInfo from "../../../hooks/getUsers";
import { getFavoriteMetals } from "../../../hooks/metalPrice";

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

const DashboardMetal = () => {
  const theme = useContext(ThemeContext);

  const { lmeData } = useLme();
  const [series, setSeries] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState({
    name: "Aluminium",
    color: "#3A8BDB",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState(0);
  const [favoriteMetals, setFavoriteMetals] = useState([]);

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        getFavoriteMetals(res?.uid)
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

            setFavoriteMetals(formattedMetalNames);
          })
          .catch((err) => console.log("Error to fetch metals:", err));
      })
      .catch((err) => console.log("Error on fetch fav metals:", err));
  }, []);

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

  function getDateNDaysAgo(n) {
    const currentDate = new Date();
    const dateNDaysAgo = new Date(currentDate);
    dateNDaysAgo.setDate(currentDate.getDate() - n);
    return dateNDaysAgo;
  }

  const handleCommodityClick = (commodityName, color) => {
    setSelectedCommodity({ name: commodityName, color });
    setSelectedItems([commodityName]);
  };

  const filteredSeries = series.filter(
    (serie) => serie.name === selectedCommodity.name
  );

  const handlePercentageVar = (initialVal, newVal) =>
    (((newVal - initialVal) / initialVal) * 100).toFixed(2);

  const formatToCurrency = (num) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      num
    );

  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    colors: ["#3961BC", "#A7C1F2"],
    stroke: {
      width: [2, 2],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "65%",
      },
    },

    fill: {
      opacity: [0.25, 0.25],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
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

  const handleSelectTable = (event, newValue) => {
    if (newValue) {
      return setSelectedTable(newValue);
    }

    setSelectedTable((prevState) => (prevState === 0 ? 1 : 0));
  };

  return (
    <ChartContainer>
      <GridMetal>
        <ReactApexChart
          options={{
            ...options,
            colors: [selectedCommodity.color],
          }}
          series={filteredSeries}
          type="area"
          height={450}
        />

        <MetalList style={{ position: "relative" }}>
          <Tabs
            value={selectedTable}
            onChange={handleSelectTable}
            style={{
              borderBottom: `1px solid ${theme.colors.gray[100]}`,
              position: "sticky",
              top: 0,
              background: "#ffffff",
              zIndex: 16,
              boxShadow: "1px 1px 10px 2px #ccc",
            }}
            centered
          >
            <Tab label="LME" {...allyProps(0)} style={{ width: "50%" }} />
            <Tab
              label="Favorited Prices"
              {...allyProps(1)}
              style={{ width: "50%" }}
            />
          </Tabs>

          <CustomTabPanel index={0} value={selectedTable}>
            {series.slice(0, 5).map((serie) => (
              <MetalHome
                key={serie?.name}
                onClick={() =>
                  handleCommodityClick(`${serie?.name}`, "#3A8BDB")
                }
                IsSelected={selectedCommodity.name === serie?.name}
              >
                <MetalListStyle
                  title={serie?.name}
                  state={
                    handlePercentageVar(serie?.data[2], serie?.data[3]) > 0
                      ? 1
                      : -1
                  }
                  price={formatToCurrency(serie?.data[3].toFixed(2))}
                  var={handlePercentageVar(serie?.data[2], serie?.data[3])}
                />
              </MetalHome>
            ))}
          </CustomTabPanel>

          <CustomTabPanel index={1} value={selectedTable}>
            {favoriteMetals.map((serie) => (
              <MetalHome
                key={serie?.name}
                onClick={() =>
                  handleCommodityClick(`${serie?.name}`, "#3A8BDB")
                }
                IsSelected={selectedCommodity.name === serie?.name}
              >
                <MetalListStyle
                  title={serie?.name}
                  state={
                    handlePercentageVar(serie?.data[2], serie?.data[3]) > 0
                      ? 1
                      : -1
                  }
                  price={formatToCurrency(serie?.data[3]?.toFixed(2))}
                  var={handlePercentageVar(serie?.data[2], serie?.data[3])}
                />
              </MetalHome>
            ))}
          </CustomTabPanel>
        </MetalList>
      </GridMetal>
    </ChartContainer>
  );
};

export default DashboardMetal;
