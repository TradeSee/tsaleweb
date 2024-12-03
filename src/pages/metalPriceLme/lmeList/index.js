import React, { useEffect, useState, useRef } from "react";
import { ContainerHome } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import LoadingPage from "../../../components/LoadingPage";
import { authScreen } from "../../../contexts/auth";
import { useLme } from "../../../hooks/getLME";
import ReactApexChart from "react-apexcharts";
import { FloatSelect } from "../../../components/FloatInput/FloatInput";
import LmeMapper from "./Mappers/LmeMapper";
import { ChartsContainer, Container, FormContainer } from "./styles";

export default function LmeList() {
  const [auth, setAuth] = useState(false);
  const [unitFilter, setUnitFilter] = useState("Mt");
  const [currencyFilter, setCurrencyFilter] = useState("USD");
  const [selectedMetal, setSelectedMetal] = useState();

  const [toggleDrawer, useToggleDawer] = useState(false);

  const { metalName } = useParams();
  const { lmeData, loading } = useLme();
  const navigate = useNavigate();
  const targetRef = useRef();

  const ChartOptionsMovings = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "London Metal Exchange - Aluminum prices - last 30 Days",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["10 Days", "20 Days", "30 Days", "Last Days"],
      },
    },
  };

  const ChartOptionsOfficial = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "London Metal Exchange - Aluminum prices - last Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["October", "September"],
      },
    },
  };

  const ChartOptionsWarehouse = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "London Metal Exchange - Aluminum prices - Unofficial - Last 3 months",
        align: "left",
        colors: {
          primary: "#1d47b0",
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Official", "Unofficial"],
      },
    },
  };

  const ChartOptionsUnnoficial = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "London Metal Exchange - Aluminum prices - Warehouse(Inventory)",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["MT", "Float"],
      },
    },
  };

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  useEffect(() => {
    if (!loading) {
      const mappedLmeData = LmeMapper(
        lmeData,
        `${unitFilter}${currencyFilter}`,
        metalName
      );

      setSelectedMetal(mappedLmeData);
    }
  }, [unitFilter, currencyFilter, metalName, lmeData, loading]);

  const handleUnitChange = (event) => {
    setUnitFilter(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrencyFilter(event.target.value);
  };

  function SetToggle(state) {
    useToggleDawer(state);
  }

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    pageStyle: `
      @page {
        @top-right {
          content: counter(page)/
        }
      }
    `,
  });

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={2}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>

            <Container>
              <header style={{ marginLeft: "80px" }}>
                <h1>{metalName} </h1>

                <FormContainer>
                  <FloatSelect
                    value={unitFilter}
                    onChange={handleUnitChange}
                    label={"Measurement"}
                  >
                    <option value="Mt">MT</option>
                    <option value="Lb">LB</option>
                  </FloatSelect>

                  <FloatSelect
                    value={currencyFilter}
                    onChange={handleCurrencyChange}
                    label={"Currency"}
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="BRL">BRL</option>
                  </FloatSelect>
                </FormContainer>
              </header>

              <button onClick={handlePrint}>
                See as Print or Download PDF
              </button>

              <ChartsContainer ref={targetRef}>
                <ReactApexChart
                  options={ChartOptionsMovings.options}
                  series={[
                    {
                      name: "Movings",
                      data: [
                        selectedMetal.movings["10days"],
                        selectedMetal.movings["20days"],
                        selectedMetal.movings["30days"],
                        selectedMetal.movings["last Days"],
                      ],
                    },
                  ]}
                  type="line"
                  height={350}
                  width={700}
                />

                <ReactApexChart
                  options={ChartOptionsOfficial.options}
                  series={[
                    {
                      name: "Cash Avgs",
                      data: [
                        selectedMetal.official.avgs["Sep"],
                        selectedMetal.official.avgs["Oct"],
                      ],
                    },
                  ]}
                  type="line"
                  height={350}
                  width={700}
                />

                <ReactApexChart
                  options={ChartOptionsWarehouse.options}
                  series={[
                    {
                      name: "Warehouse",
                      data: [
                        selectedMetal.warehouse.inventory["MT"],
                        selectedMetal.warehouse.inventory["float"],
                      ],
                    },
                  ]}
                  type="line"
                  height={350}
                  width={700}
                />

                <ReactApexChart
                  options={ChartOptionsUnnoficial.options}
                  series={[
                    {
                      name: "Cash",
                      data: [
                        selectedMetal.unofficial["3 month"].official,
                        selectedMetal.unofficial["3 month"].unofficial,
                      ],
                    },
                  ]}
                  type="line"
                  height={350}
                  width={700}
                />

                <small>
                  Analytics Data managed and offered by T-Sale Metals. -
                  www.tsalemetals.com - All rights reserved
                </small>
              </ChartsContainer>
            </Container>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
