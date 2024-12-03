/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSearchParams } from "react-router-dom";

import { getCompanieFavorite } from "../../../../hooks/findNewPartner";
import { authScreen } from "../../../../contexts/auth";
import getUserInfo from "../../../../hooks/getUsers";
import ProfileCompany from "../../../../service/ProfileCompany";

import CompanyMapperInfo from "../../../home/utils/mapper";
import HsIcon from "../../../../icons/boxC-v2.png";
import ShipValue from "../../../../icons/moeda.png";
import LogoGeneric from "../../../../icons/102832.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Empty } from "./styles";
import MagnifierQuestion from "./assets/magnifier-question.svg";

import {
  ColumnContainer,
  ContainerHome,
  TextDefault,
  RowContainer,
  ImgDefault,
  HrDefault,
  CardDefault,
} from "../../../../assets/styles";
import Drawer from "../../../../components/Drawer";

import LoadingPage from "../../../../components/LoadingPage";

import "./styles.css";
import ExportBtn from "../components/ExportBtn";

import Capitalize from "../../../../utils/capitalize";
import PingV2 from "../../../../icons/ping-v2.png";
import RoleIcon from "../../../../icons/pass.png";
import CardProfile from "../components/CardProfile";
import BoatIcon from "../../../../icons/boatv2.png";
import Deal from "../../../../icons/deal.png";
import Loading from "../components/loading";
import CardSmHorizontal from "../components/CardSmHorizontal";
import Country from "../../../../components/Flag";
import AllCompaniesTable from "../components/DataGrid";
import { Pdf } from "../components/Pdf";

import "swiper/css";
import "swiper/css/navigation";
import { useReactToPrint } from "react-to-print";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";
import ButtonBlue from "../../../../components/myButton";
import DataLead from "../../../findNewPartner/assets/DataLead";
import { format } from "date-fns";
import numberReducer from "../../../../utils/numberReducer";

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

export default function Fnp() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState([]);
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [companySelect, setCompanySelect] = useState();
  const [step, setStep] = useState(4);

  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [animatedStep, setAnimatedStep] = useState("staticStep");
  const [products, setProducts] = useState([]);
  const [userIP, setUserIP] = useState("");
  const [selectedInfo, setSelectedInfo] = useState(0);
  const [hasImportData, setHasImportData] = useState(true);
  const [hasExportData, setHasExportData] = useState(true);
  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("companyId");

  useEffect(() => {
    if (companyId && companies.length > 0) {
      dataCompany(companyId, companies);
    }
  }, [companyId, companies]);

  useEffect(() => {
    (async () => {
      setUserIP(await publicIpv4());
    })();
  }, []);
  const pdfProfileRef = useRef(null);

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setUserInfo(userData);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData().finally(() => {
        setLoading(false);
      });
    }
  }, [auth]);

  const textStyle = { color: "#4D6484", fontWeight: "bold", height: "100%" };
  const columnsCountry = [
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt={params.row.country}
            src={renderFlag(params.row.country)}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
          <p style={{ marginLeft: 10 }}>{Capitalize(params.row.country)}</p>
        </div>
      ),
    },
    {
      field: "percentageShare",
      headerName: "Percentage Share",
      flex: 1,
      editable: false,
      valueGetter: (params) => `${params.row.percentageShare.toFixed(2)}%`,
    },
  ];

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const moveStepAnimation = (animation, step) => {
    //animation next = Direita para Esquerda
    //animation back = Esqueda pra direita
    //step = condicional da tela de exibição
    scrollTop();

    if (animation == "next") {
      setAnimatedStep("nextStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    } else {
      setAnimatedStep("backStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    }
  };

  const handleSelectInfo = (event, newValue) => {
    if (newValue) {
      return setSelectedInfo(newValue);
    }

    setSelectedInfo((prevState) => (prevState === 0 ? 1 : 0));
  };

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
  }, [navigate]);

  const dataCompany = (id, info) => {
    let getData = info.filter((obj) => {
      return obj.id === id;
    });
    setStep(5);
    if (temShipments(getData)) {
      setCompanySelect(getData);

      setStep(6);
    } else {
      setCompanySelect(getData);
      ProfileCompany(
        getData[0].id,
        getData[0].companyName,
        getData[0].country,
        userInfo?.userData?.name,
        userInfo?.uid,
        userIP
      )
        .then((resp) => {
          setStep(6);
          let array = Object.assign({}, getData[0], resp.profile, {
            shipments: resp.shipment,
          });
          setCompanySelect([array]);
        })
        .catch((err) => {
          console.log("Erro na requisição profile id: " + getData[0].companyId);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (auth) {
      const fetchDataC = async () => {
        try {
          const dataUnmapped = await getCompanieFavorite(userInfo.uid);
          const mappedData = CompanyMapperInfo(dataUnmapped);

          setCompanies(mappedData);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDataC();
    }
  }, [auth, userInfo]);

  function temShipments(array) {
    return array.some((objeto) => objeto.hasOwnProperty("shipments"));
  }

  function ClearString(string) {
    return string.replace(/[^a-z0-9]/gi, "").toLowerCase();
  }

  const renderFlag = (countryName) => {
    const filterCountry = Country.filter(
      (obj) => obj.country.toLocaleLowerCase() === countryName
    );
    if (filterCountry.length === 0) {
      const flagDefault = Country.filter(
        (obj) => obj.country.toLocaleLowerCase() === "flag"
      );
      return flagDefault[0].src;
    } else {
      return filterCountry[0].src;
    }
  };

  const listHsCodeCompany = (array) => {
    let string;
    array.forEach((obj) => {
      if (string) {
        string = string + `, ${obj}`;
      } else {
        string = obj;
      }
    });

    return string;
  };

  useEffect(() => {
    if (companySelect) {
      setHasExportData(
        companySelect[0]?.portsOfLading?.length > 0 ||
          companySelect[0]?.exportedProductKeywords?.length > 0 ||
          companySelect[0]?.exportTradingPartners?.length > 0 ||
          companySelect[0]?.countriesExportingTo?.length > 0
      );

      setHasImportData(
        companySelect[0]?.portsOfUnlading?.length > 0 ||
          companySelect[0]?.importedProductKeywords?.length > 0 ||
          companySelect[0]?.importTradingPartners?.length > 0 ||
          companySelect[0]?.countriesImportingFrom?.length > 0
      );
    }
  }, [companySelect]);

  const handlePrintProfile = useReactToPrint({
    content: () => pdfProfileRef.current,
  });

  const handleExportSimulation = () => {
    const impHsCodes = companySelect[0]?.imported6DigitHsCodes.map((hs) =>
      hs.hscode.toString().substr(0, 4)
    );
    const expHsCodes = companySelect[0]?.imported6DigitHsCodes.map((hs) =>
      hs.hscode.toString().substr(0, 4)
    );
    const allHsCodes = [...impHsCodes, expHsCodes];

    navigate("/simulation", {
      state: {
        hsCodes: allHsCodes,
        country: companySelect[0]?.country,
        transactionType: companySelect[0]?.role,
        companySelected: companySelect[0],
      },
    });
  };

  function reduceShipmentsArray(array) {
    const reduced = array.reduce(
      (acc, actual) => acc + actual.shipmentValue,
      0
    );

    return reduced;
  }

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            {step === 4 ? (
              <>
                <Grid
                  item
                  xs={toggleDrawer ? 10 : 11}
                  container
                  className={animatedStep}
                >
                  <Grid item xs={12}>
                    <ColumnContainer style={{ marginLeft: 20, marginTop: 50 }}>
                      <RowContainer
                        style={{
                          width: 55,
                          position: "fixed",
                          left: "5%",
                          top: 40,
                        }}
                      >
                        <button
                          class="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                          title="Go Back"
                          style={{
                            backgroundColor: "transparent",
                            borderWidth: 0,
                            width: "100%",
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                          onClick={() => navigate("/saved-operations")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            className="stroke-blue-300"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="M11 6L5 12M5 12L11 18M5 12H19"
                            ></path>
                          </svg>
                        </button>
                      </RowContainer>
                      <TextDefault color={"#4b4b4b"} size={"32px"}>
                        Result
                      </TextDefault>
                      <TextDefault
                        color={"#8a97aa"}
                        size={"18px"}
                        bold={"400"}
                        style={{ marginTop: 10, width: "75%" }}
                      >
                        Favorited companies
                      </TextDefault>

                      {companies?.length > 0 && (
                        <div>
                          <AllCompaniesTable
                            data={companies}
                            clickRow={dataCompany}
                          />
                        </div>
                      )}

                      {companies?.length === 0 && (
                        <Empty>
                          <img
                            src={MagnifierQuestion}
                            alt="Magnifier Question"
                          />
                          <h2>
                            Looks like you don't have saved any company yet,
                            click the button below to save your first one
                          </h2>

                          <button onClick={() => navigate("/trade-datas")}>
                            Save first
                          </button>
                        </Empty>
                      )}
                    </ColumnContainer>
                  </Grid>
                </Grid>

                <div style={{ height: 10, width: "100%" }} />
              </>
            ) : step === 5 ? (
              <ColumnContainer
                style={{
                  width: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Loading />
              </ColumnContainer>
            ) : step === 6 ? (
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                container
                className={animatedStep}
              >
                <Grid item xs={12} style={{ marginBottom: 50 }}>
                  <div
                    style={{
                      top: 0,
                      paddingTop: 24,
                      zIndex: 50,
                      background: "#ffffff",
                    }}
                  >
                    <ColumnContainer>
                      <RowContainer
                        style={{
                          width: 55,
                          left: "5%",
                          marginTop: 40,
                        }}
                      >
                        <button
                          className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                          title="Go Back"
                          style={{
                            backgroundColor: "transparent",
                            borderWidth: 0,
                            width: "100%",
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                          onClick={() => {
                            moveStepAnimation("back", 4);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            className="stroke-blue-300"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="M11 6L5 12M5 12L11 18M5 12H19"
                            ></path>
                          </svg>
                        </button>
                      </RowContainer>

                      <RowContainer style={{ alignItems: "center" }}>
                        <TextDefault color={"#4b4b4b"} size={"32px"}>
                          {Capitalize(companySelect[0]?.companyName)}
                        </TextDefault>
                        <ImgDefault
                          src={renderFlag(companySelect[0].country)}
                          style={{ marginLeft: 20 }}
                          width={"40px"}
                          height={"40px"}
                        />
                        <ExportBtn
                          action={handlePrintProfile}
                          exportSimu={handleExportSimulation}
                        />
                      </RowContainer>

                      {companySelect[0].addressList !== "" ||
                      companySelect[0]?.address !== "" ? (
                        <RowContainer
                          style={{ alignItems: "center", margin: "12px 0" }}
                        >
                          <ImgDefault
                            src={PingV2}
                            width={"18px"}
                            height={"18px"}
                          />
                          <TextDefault
                            color={"#8a97aa"}
                            size={"16px"}
                            bold={"400"}
                            style={{ width: "75%", marginLeft: 5 }}
                          >
                            {Capitalize(
                              (companySelect[0]?.addressList === "undefined" ||
                              companySelect[0]?.address === "undefined"
                                ? companySelect[0]?.addressList ||
                                  companySelect[0]?.address
                                : companySelect[0].role) +
                                ", " +
                                companySelect[0].country
                            )}
                          </TextDefault>
                        </RowContainer>
                      ) : (
                        <RowContainer
                          style={{ alignItems: "center", marginTop: 10 }}
                        >
                          <ImgDefault
                            src={RoleIcon}
                            width={"18px"}
                            height={"18px"}
                          />
                          <TextDefault
                            color={"#8a97aa"}
                            size={"16px"}
                            bold={"400"}
                            style={{ width: "75%", marginLeft: 5 }}
                          >
                            {Capitalize(
                              companySelect[0]?.role === undefined
                                ? `Supplier, ${companySelect[0].country}`
                                : companySelect[0].role +
                                    ", " +
                                    companySelect[0].country
                            )}
                          </TextDefault>
                        </RowContainer>
                      )}
                      <div
                        style={{
                          columnGap: 12,
                          width: "98%",
                          display: "grid",
                          justifyContent: "space-between",
                          alignContent: "space-between",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        }}
                      >
                        <CardProfile
                          title={"Number Of Shipments"}
                          value={`${
                            companySelect[0]?.totalShipmentsExportedCount +
                            companySelect[0]?.totalShipmentsImportedCount
                          } Shipments`}
                          src={BoatIcon}
                        />

                        <CardProfile
                          title={"Trading Partner"}
                          value={`${
                            companySelect[0]?.tradingPartnerCount ||
                            companySelect[0].importTradingPartnerCount +
                              companySelect[0].exportTradingPartnerCount
                          } Partners`}
                          src={Deal}
                          style={{ justifySelf: "right" }}
                        />
                      </div>
                    </ColumnContainer>

                    <Tabs
                      value={selectedInfo}
                      onChange={handleSelectInfo}
                      aria-label="Filter by"
                      style={{
                        marginTop: 24,
                        width: "98%",
                        borderBottom: "1px solid #d9d9d9",
                      }}
                    >
                      <Tab label="Export Data" {...allyProps(0)} />
                      <Tab label="Import Data" {...allyProps(1)} />
                      <Tab label="Shipments" {...allyProps(2)} />
                      <Tab label="Leads" {...allyProps(3)} />
                      <Tab label="PDF" {...allyProps(4)} />
                      <Tab label="Compliance" {...allyProps(5)} />
                    </Tabs>
                  </div>

                  <CustomTabPanel value={selectedInfo} index={0}>
                    {hasExportData ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          rowGap: 24,
                        }}
                      >
                        <div>
                          {companySelect[0]?.countriesExportingTo.length > 0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Countries Exporting To
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Destinations
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={companySelect[0]?.countriesExportingTo}
                                  columns={columnsCountry}
                                  getRowId={() => Math.random()}
                                  autoHeight={false}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          {companySelect[0]?.exportTradingPartners.length >
                          0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Export Trading Partners
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Trading Partners
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={companySelect[0]?.exportTradingPartners}
                                  columns={[
                                    {
                                      field: "country",
                                      headerName: "Country",
                                      flex: 1,
                                      editable: false,
                                      renderCell: (params) => (
                                        <div
                                          style={{
                                            flexDirection: "row",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <img
                                            alt={params.row.country}
                                            src={renderFlag(params.row.country)}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              marginLeft: 10,
                                            }}
                                          />
                                          <p style={{ marginLeft: 10 }}>
                                            {Capitalize(params.row.country)}
                                          </p>
                                        </div>
                                      ),
                                    },
                                    {
                                      field: "companyName",
                                      headerName: "Company Name",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        Capitalize(params.row.companyName),
                                    },
                                    {
                                      field: "percentageShare",
                                      headerName: "Percentage Share",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.percentageShare.toFixed(
                                          2
                                        )}%`,
                                    },
                                  ]}
                                  autoHeight={false}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          {companySelect[0]?.exportedProductKeywords.length >
                          0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Exported Product Keywords
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Products
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={
                                    companySelect[0]?.exportedProductKeywords
                                  }
                                  autoHeight={false}
                                  columns={[
                                    {
                                      field: "productKeywords",
                                      headerName: "Product Keywords",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.productKeyword}`,
                                    },
                                    {
                                      field: "percentageShare",
                                      headerName: "Percentage Share",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.percentageShare.toFixed(
                                          2
                                        )}%`,
                                    },
                                  ]}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          {companySelect[0]?.portsOfLading.length > 0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Ports Of Lading
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Ports
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={companySelect[0]?.portsOfLading}
                                  autoHeight={false}
                                  columns={[
                                    {
                                      field: "port",
                                      headerName: "Ports",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.port}`,
                                    },
                                    {
                                      field: "percentageShare",
                                      headerName: "Percentage Share",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.percentageShare.toFixed(
                                          2
                                        )}%`,
                                    },
                                  ]}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 style={{ color: "#bbb" }}>- No Data Avaliable -</h1>
                      </div>
                    )}
                  </CustomTabPanel>

                  <CustomTabPanel value={selectedInfo} index={1}>
                    {hasImportData ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          rowGap: 24,
                        }}
                      >
                        <div>
                          {companySelect[0]?.countriesImportingFrom.length >
                          0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Countries Importing From
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Destinations
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={
                                    companySelect[0]?.countriesImportingFrom
                                  }
                                  columns={columnsCountry}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  autoHeight={false}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          {companySelect[0]?.importTradingPartners.length >
                          0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Import Trading Partners
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Trading Partners
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={companySelect[0]?.importTradingPartners}
                                  columns={[
                                    {
                                      field: "country",
                                      headerName: "Country",
                                      flex: 1,
                                      editable: false,
                                      renderCell: (params) => (
                                        <div
                                          style={{
                                            flexDirection: "row",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <img
                                            alt={params.row.country}
                                            src={renderFlag(params.row.country)}
                                            style={{
                                              width: 40,
                                              height: 40,
                                              marginLeft: 10,
                                            }}
                                          />
                                          <p style={{ marginLeft: 10 }}>
                                            {Capitalize(params.row.country)}
                                          </p>
                                        </div>
                                      ),
                                    },
                                    {
                                      field: "companyName",
                                      headerName: "Company Name",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        Capitalize(params.row.companyName),
                                    },
                                    {
                                      field: "percentageShare",
                                      headerName: "Percentage Share",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.percentageShare.toFixed(
                                          2
                                        )}%`,
                                    },
                                  ]}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          {companySelect[0]?.importedProductKeywords.length >
                          0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Imported Product Keywords
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Products
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={
                                    companySelect[0]?.importedProductKeywords
                                  }
                                  columns={[
                                    {
                                      field: "productKeywords",
                                      headerName: "Product Keywords",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.productKeyword}`,
                                    },
                                    {
                                      field: "percentageShare",
                                      headerName: "Percentage Share",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.percentageShare.toFixed(
                                          2
                                        )}%`,
                                    },
                                  ]}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          {companySelect[0]?.portsOfUnlading.length > 0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Ports Of Unlading
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Top Ports
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={companySelect[0]?.portsOfUnlading}
                                  autoHeight={false}
                                  columns={[
                                    {
                                      field: "port",
                                      headerName: "Ports",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.port}`,
                                    },
                                    {
                                      field: "percentageShare",
                                      headerName: "Percentage Share",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${params.row.percentageShare.toFixed(
                                          2
                                        )}%`,
                                    },
                                  ]}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 5,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[5]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 style={{ color: "#bbb" }}>- No Data Avaliable -</h1>
                      </div>
                    )}
                  </CustomTabPanel>

                  <CustomTabPanel value={selectedInfo} index={2}>
                    {companySelect[0].shipments.length > 0 ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                        }}
                      >
                        <div style={{ gridColumn: "1/-1" }}>
                          {companySelect[0].shipments.length > 0 ? (
                            <>
                              <ColumnContainer
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                <TextDefault size={"24px"} color={"#4b4b4b"}>
                                  Shipments
                                </TextDefault>
                                <TextDefault color={"#8a97aa"} bold={"400"}>
                                  Shipments Info
                                </TextDefault>
                              </ColumnContainer>

                              <Box sx={{ height: "85%", width: "98%" }}>
                                <DataGrid
                                  rows={companySelect[0].shipments}
                                  columns={[
                                    {
                                      field: "consigneeName",
                                      headerName: "Company Name",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.consigneeName === ""
                                            ? "-"
                                            : Capitalize(
                                                params.row.consigneeName
                                              )
                                        }`,
                                    },
                                    {
                                      field: "country",
                                      headerName: "Country",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.consigneeCountry === ""
                                            ? "-"
                                            : Capitalize(
                                                params.row.consigneeCountry
                                              )
                                        }`,
                                    },
                                    {
                                      field: "shipmentDate",
                                      headerName: "Shipment Date",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        format(
                                          new Date(params.row.shipmentDate),
                                          "MM/dd/yyyy"
                                        ),
                                    },
                                    {
                                      field: "hscode",
                                      headerName: "Hs Codes",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        params.row.hsCode[0],
                                    },
                                    {
                                      field: "modeOfTransportation",
                                      headerName: "Mode Of Transportation",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.modeOfTransportation === ""
                                            ? "-"
                                            : Capitalize(
                                                params.row.modeOfTransportation
                                              )
                                        }`,
                                    },
                                    {
                                      field: "shipperName",
                                      headerName: "Shipper Name",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.shipperName === ""
                                            ? "-"
                                            : Capitalize(params.row.shipperName)
                                        }`,
                                    },
                                    {
                                      field: "portOfLading",
                                      headerName: "Port Of Lading",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.portOfLading === ""
                                            ? "-"
                                            : params.row.portOfLading
                                        }`,
                                    },
                                    {
                                      field: "portOfUnlading",
                                      headerName: "Port Of Unlading",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.portOfUnlading === ""
                                            ? "-"
                                            : params.row.portOfUnlading
                                        }`,
                                    },
                                    {
                                      field: "shipmentValue",
                                      headerName: "Shipment Value",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.shipmentValue < 0
                                            ? 0
                                            : params.row.shipmentValue
                                        }`,
                                    },
                                    {
                                      field: "shipmentWeight",
                                      headerName: "Shipment Weight",
                                      flex: 1,
                                      editable: false,
                                      valueGetter: (params) =>
                                        `${
                                          params.row.shipmentWeight < 0
                                            ? 0
                                            : params.row.shipmentWeight
                                        }`,
                                    },
                                  ]}
                                  getRowId={() => Math.random()}
                                  style={textStyle}
                                  autoHeight={false}
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 100,
                                      },
                                    },
                                  }}
                                  pageSizeOptions={[100]}
                                />
                              </Box>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 style={{ color: "#bbb" }}>- No Data Avaliable -</h1>
                      </div>
                    )}
                  </CustomTabPanel>

                  <CustomTabPanel value={selectedInfo} index={3}>
                    <RowContainer>
                      <CardDefault
                        width="120px"
                        height="120px"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ImgDefault
                          src={LogoGeneric}
                          width="100px"
                          height="100px"
                        />
                      </CardDefault>
                      <ColumnContainer
                        style={{ marginLeft: 20, marginTop: 40 }}
                      >
                        <TextDefault size="20px" color="#4b4b4b">
                          {Capitalize(companySelect[0]?.companyName)}
                        </TextDefault>
                        <TextDefault size="13px" color="#8a97aa">
                          Company
                        </TextDefault>
                      </ColumnContainer>
                    </RowContainer>
                    <RowContainer style={{ marginTop: 30 }}>
                      <TextDefault size="18px" color="#4b4b4b">
                        Location:
                      </TextDefault>
                      <TextDefault
                        size="18px"
                        color="#8a97aa"
                        bold="400"
                        style={{ marginLeft: 10 }}
                      >
                        Chicago, IL, USA
                      </TextDefault>
                    </RowContainer>
                    <HrDefault />
                    <RowContainer style={{ marginTop: 15 }}>
                      <TextDefault size="18px" color="#4b4b4b">
                        City:
                      </TextDefault>
                      <TextDefault
                        size="18px"
                        color="#8a97aa"
                        bold="400"
                        style={{ marginLeft: 10 }}
                      >
                        Chicago
                      </TextDefault>
                    </RowContainer>
                    <HrDefault />
                    <RowContainer style={{ marginTop: 15 }}>
                      <TextDefault size="18px" color="#4b4b4b">
                        Site:
                      </TextDefault>
                      <TextDefault
                        size="18px"
                        color="#8a97aa"
                        bold="400"
                        style={{ marginLeft: 10 }}
                      >
                        www.{ClearString(companySelect[0]?.companyName)}.com
                      </TextDefault>
                    </RowContainer>
                    <HrDefault />
                    <RowContainer style={{ marginTop: 15 }}>
                      <TextDefault size="18px" color="#4b4b4b">
                        Sector:
                      </TextDefault>
                      <TextDefault
                        size="18px"
                        color="#8a97aa"
                        bold="400"
                        style={{ marginLeft: 10 }}
                      >
                        Metals
                      </TextDefault>
                    </RowContainer>
                    <HrDefault />
                    <RowContainer style={{ marginTop: 15 }}>
                      <TextDefault size="18px" color="#4b4b4b">
                        Size:
                      </TextDefault>
                      <TextDefault
                        size="18px"
                        color="#8a97aa"
                        bold="400"
                        style={{ marginLeft: 10 }}
                      >
                        10001+
                      </TextDefault>
                    </RowContainer>
                    <HrDefault />
                    <RowContainer style={{ marginTop: 15 }}>
                      <TextDefault size="18px" color="#4b4b4b">
                        Social Network:
                      </TextDefault>
                      <ImgDefault
                        // src={LogoLinkedin}
                        width="20px"
                        height="20px"
                        style={{ marginLeft: 10 }}
                      />
                    </RowContainer>
                    <HrDefault />

                    <RowContainer
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 50,
                        paddingRight: 70,
                      }}
                    >
                      <RowContainer>
                        <TextDefault size="18px" color="#4b4b4b">
                          Potential customers:
                        </TextDefault>
                        <TextDefault
                          size="18px"
                          color="#8a97aa"
                          bold="400"
                          style={{ marginLeft: 10 }}
                        >
                          6574
                        </TextDefault>
                      </RowContainer>

                      <RowContainer>
                        <TextDefault size="18px" color="#4b4b4b">
                          All emails from the domain:
                        </TextDefault>
                        <TextDefault
                          size="18px"
                          color="#8a97aa"
                          bold="400"
                          style={{ marginLeft: 10 }}
                        >
                          1995
                        </TextDefault>
                      </RowContainer>

                      <RowContainer>
                        <TextDefault size="18px" color="#4b4b4b">
                          Generic contacts:
                        </TextDefault>
                        <TextDefault
                          size="18px"
                          color="#8a97aa"
                          bold="400"
                          style={{ marginLeft: 10 }}
                        >
                          7
                        </TextDefault>
                      </RowContainer>

                      <RowContainer>
                        <TextDefault size="18px" color="#4b4b4b">
                          Technologies:
                        </TextDefault>
                        <TextDefault
                          size="18px"
                          color="#8a97aa"
                          bold="400"
                          style={{ marginLeft: 10 }}
                        >
                          45
                        </TextDefault>
                      </RowContainer>
                    </RowContainer>

                    <RowContainer style={{ marginTop: 50 }}>
                      <DataLead />
                    </RowContainer>
                  </CustomTabPanel>

                  <CustomTabPanel value={selectedInfo} index={4}>
                    <Pdf
                      ref={pdfProfileRef}
                      type={"companySelect[0]?.role"}
                      user={userInfo}
                      userIP={userIP}
                      filters={{
                        company: companySelect,
                        role: companySelect[0]?.role,
                        hsCode: companySelect[0]?.exported6DigitHsCodes,
                        type: "byName",
                      }}
                    />
                  </CustomTabPanel>

                  <CustomTabPanel value={selectedInfo} index={5}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonBlue
                        onClick={() =>
                          window.open(
                            `search-compliance?companyName=${companySelect[0].companyName}&countrySel=${companySelect[0].country}`,
                            "_blank"
                          )
                        }
                      >
                        Get Report
                      </ButtonBlue>
                    </div>
                  </CustomTabPanel>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
