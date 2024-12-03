import React, { useEffect, useState } from "react";
import {
  ContainerHome,
  SelectDefault,
  TextDefault,
} from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid } from "@mui/material";
import {
  ClearButton,
  Container,
  GroupInput,
  MainFilter,
  MyLine,
  SearchButton,
  StepsContainer,
  TabsContainer,
  Underline,
} from "./style";
import { message, Alert, Space, Empty, Spin } from "antd";
import { authScreen } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../../hooks/getUsers";
import LoadingPage from "../../../components/LoadingPage";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import SaveIcon from "../components/pdfExport";
import { saveTracking } from "../../../hooks/globalTrack";

export default function SearchGlobalTrack() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [trade, setTrade] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [containerNumber, setContainerNumber] = useState("");
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);
  const [auth, setAuth] = useState(false);
  const [numberType, setNumberType] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);

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

  const [userInfo, setUserInfo] = useState(null);

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

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  function tradeSelect(selected) {
    setTrade(selected.value);
  }
  function typeSelect(selected) {
    setTypeSearch(selected.value);
  }

  function isContainerNumber(num) {
    const containerPattern = /\b[A-Z]{4}\d{7}\b/;

    return containerPattern.test(num);
  }

  function isBolNumber(num) {
    const BolPattern = /\b[A-Z\d]{9}\b/;

    return BolPattern.test(num);
  }

  function handleChangeContainer(event) {
    setContainerNumber(event.target.value);

    if (isContainerNumber(event.target.value)) {
      return setNumberType("Container");
    }

    if (isBolNumber(event.target.value)) {
      return setNumberType("Bill of lading");
    }
  }

  const buscar = () => {
    if (!trade || !typeSearch || !containerNumber) {
      let errorMessage = "Please fill in the following fields:";
      if (!trade) errorMessage += " Tracking company";
      if (!typeSearch) errorMessage += " Type Search";
      if (!containerNumber) errorMessage += " Container Number";

      message.error(errorMessage);
      return;
    }
    requestTracking();
    setStep(1);
  };

  const clearFilters = () => {
    setTrade("");
    setTypeSearch("");
    setContainerNumber("");
    setKey((prevKey) => prevKey + 1);
    setStep(0);
  };

  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  const requestTracking = async () => {
    const headers = {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const requestData = {
      type: typeSearch,
      idNumber: containerNumber,
    };

    try {
      setLoadingData(true);

      const response = await axios.post(
        "https://api3003/trackshipment",
        requestData,
        { headers }
      );

      setData(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro na solicitação:", error);
      setError(error.message);
    } finally {
      setLoadingData(false);
    }
  };

  function saveTrack() {
    const tipo = `${typeSearch}`
    const item = {
      trade: trade,
      typeSearch: tipo,
      containerNumber: containerNumber,
    };
    saveTracking(userInfo?.uid, item);
  }

  function formatarData(dataString) {
    const [day, month, year] = dataString.split("/");
    const dataObj = new Date(`${year}-${month}-${day}`);
    const monthFormatted = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const dayFormatted = (dataObj.getDate() + 1).toString().padStart(2, "0");
    const yearFormatted = dataObj.getFullYear();
    return `${monthFormatted}/${dayFormatted}/${yearFormatted}`;
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

            <Grid
              item
              xs={toggleDrawer ? 10 : 11}
              marginLeft={toggleDrawer ? 40 : 20}
              container
            >
              <Container>
                <TabsContainer>
                  <TextDefault
                    color={"#17283E"}
                    size={"32px"}
                    style={{ marginTop: 20, marginBottom: 10 }}
                  >
                    Search Tracking
                  </TextDefault>

                  <br />
                  <TextDefault
                    color={"#17283E"}
                    size={"18px"}
                    bold={"400"}
                    style={{ width: "100%", marginBottom: 20 }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </TextDefault>

                  <MainFilter>
                    <TextDefault color={"#000000"} size={"20px"}>
                      Filters
                      <Underline />
                    </TextDefault>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <GroupInput className="groupInputSale">
                        <SelectDefault
                          key={`trade-${key}`}
                          className={"inputSale selectSale"}
                          type="text"
                          style={{ color: "#94a3b8" }}
                          value={trade}
                          onChange={(item) => setTrade(item.target.value)}
                        >
                          <option value="" disabled selected>
                            Select company...
                          </option>
                          <option value={"msc"}>MSC</option>
                          <option value={"maersk"}>MAERSK</option>
                        </SelectDefault>
                      </GroupInput>

                      <GroupInput className="groupInputSale">
                        <SelectDefault
                          key={`typeSearch-${key}`}
                          className={"inputSale   selectSale"}
                          type="text"
                          style={{ color: "#94a3b8" }}
                          value={typeSearch}
                          onChange={(item) => setTypeSearch(item.target.value)}
                        >
                          <option value="" disabled selected>
                            Select type...
                          </option>
                          <option value={"containeradio"}>
                            Container/Bill of Lading Number
                          </option>
                          <option value={"bookingradio"}>Booking Number</option>
                        </SelectDefault>
                      </GroupInput>

                      <input
                        type="text"
                        placeholder="Enter number"
                        value={containerNumber}
                        onChange={handleChangeContainer}
                      />

                      <ClearButton onClick={clearFilters}>
                        {" "}
                        <ClearIcon sx={{ fontSize: "1.2rem" }} />
                        Clear
                      </ClearButton>
                      <SearchButton onClick={buscar}>Search</SearchButton>
                    </div>
                  </MainFilter>
                  <br />
                  <>
                    {step === 0 ? (
                      <div style={{ marginTop: "20px" }}>
                        <Empty
                          description={
                            <span>Your search result will appear here</span>
                          }
                        ></Empty>
                      </div>
                    ) : (
                      <div>
                        {loadingData && (
                          <Spin tip="Loading" size="large">
                            <div className="content" />
                          </Spin>
                        )}

                        {!loadingData && data && (
                          <>
                            <SaveIcon saveOp={saveTrack} />
                            <MainFilter>
                              <TextDefault color={"#17283E"} size={"24px"}>
                                General Information
                              </TextDefault>
                              <MyLine />
                              <ul
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                {data.liDetails.map((item, index) => (
                                  <li
                                    key={index}
                                    style={{
                                      flex: "1",
                                      padding: "0 10px",
                                      listStyleType: "none",
                                    }}
                                  >
                                    {Object.values(item)[0]}
                                  </li>
                                ))}
                              </ul>
                            </MainFilter>
                            <br />
                            <StepsContainer>
                              <header>
                                <div style={{ width: 100 }} />
                                <p>Date</p>
                                <p>Location</p>
                                <p>Description</p>
                                <p>Empty/Laden/Vessel/Voyage</p>
                                <p>Equipment handling facility name</p>
                              </header>

                              {data.steps.map((step, index) => (
                                <section key={index * 1}>
                                  <div
                                    className={
                                      index !== 0 &&
                                      index !== data.steps.length - 1
                                        ? "tracking__step step_blue"
                                        : index === 0
                                        ? "tracking__step step_over"
                                        : "tracking__step step_start"
                                    }
                                  >
                                    <div className="tracking-container">
                                      <span
                                        className={
                                          index !== 0 &&
                                          index !== data.steps.length - 1
                                            ? "data-step blue"
                                            : index === 0
                                            ? "data-step current"
                                            : "data-step start"
                                        }
                                      />
                                    </div>
                                  </div>

                                  <p>
                                    {formatarData(
                                      `${step[`step${index + 1}`].data}`
                                    )}
                                  </p>
                                  <p>{`${
                                    step[`step${index + 1}`].location
                                  }`}</p>
                                  <p>{`${
                                    step[`step${index + 1}`].description
                                  }`}</p>
                                  <p>{`${
                                    step[`step${index + 1}`][
                                      "Empty/Laden/Vessel/Voyage"
                                    ]
                                  }`}</p>
                                  <p>{`${
                                    step[`step${index + 1}`][
                                      "Equipment handling facility name"
                                    ]
                                  }`}</p>
                                </section>
                              ))}
                            </StepsContainer>
                          </>
                        )}
                        {!loadingData && error && (
                          // <p>Ocorreu um erro: {error}</p>
                          <Space direction="vertical" style={{ width: "100%" }}>
                            <Alert
                              message="Error: There is an error in the filters or container/booking number."
                              type="error"
                            />
                          </Space>
                        )}
                        {!loadingData && !data && !error && (
                          <>
                            <Empty />
                          </>
                        )}
                      </div>
                    )}
                  </>
                </TabsContainer>
              </Container>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
