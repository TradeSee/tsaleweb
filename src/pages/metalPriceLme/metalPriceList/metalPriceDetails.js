import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useReactToPrint } from "react-to-print";
import { Add, CloseRounded } from "@mui/icons-material";
import { ThemeContext } from "styled-components";
import { format } from "date-fns";
import { Button, message, Modal } from "antd";

import {
  ContainerHome,
  RowContainer,
  TextDefault,
} from "../../../assets/styles";
import {
  CompareMetals,
  GridContainer,
  InputComparationName,
  NewMetal,
  PDFContainer,
  PdfDashboard,
  RemoveMetal,
  SaveButton,
  Table,
  Variation,
} from "./styles";

import { authScreen } from "../../../contexts/auth";

import Drawer from "../../../components/Drawer";
import LoadingPage from "../../../components/LoadingPage";
import LineChart from "../components/chart";
import AllModal from "../../../components/AllModal";
import ModalExtra from "../components/modalExtra";
import PdfExport from "../components/pdfExport";

import {
  addFavoriteMetal,
  createCompareList,
  deleteFavoriteMetal,
  getCompareList,
  getFavoriteMetals,
  getMetalPrice,
  getUniqueCompareList,
} from "../../../hooks/metalPrice";
import getUserInfo from "../../../hooks/getUsers";
import {
  deleteCredit,
  handleLimitCredits,
  historyCredits,
} from "../../../hooks/credits";
import { saveAnalytics } from "../../../hooks/analytics";
import Cover from "./pdf/Cover/Index";

export default function MetalPriceDetails() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [toggleDrawer, useTroggleDawer] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
  }
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const metalId = searchParams.get("metalId");

  const item = useMemo(() => {
    return {
      MetalName: searchParams.get("name"),
      value1: searchParams.get("value1"),
      value2: searchParams.get("value2"),
      value3: searchParams.get("value3"),
      value4: searchParams.get("value4"),
    };
  }, [searchParams]);
  const theme = useContext(ThemeContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMetals] = useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [comparationListName, setComparationListName] = useState("");
  const [comparationList, setComparationList] = useState({});

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();

          setUserInfo(userData);
          return userData;
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData();
    }
  }, [auth]);

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
    if (userInfo && metalId) {
      getUniqueCompareList(userInfo?.uid, metalId)
        .then((res) => {
          const listOfMetals = Object.values(res).filter(
            (data) => typeof data === "object"
          );

          const unifyComparationListData = {
            createdAt: res.created_at,
            id: res.listId,
            name: res.name,
            metals: listOfMetals,
          };

          setComparationList(unifyComparationListData);
          setSelectedMetals(unifyComparationListData.metals);
          setSearchValue(unifyComparationListData.metals[0]?.MetalName);
        })
        .finally(() => {
          setLoading(false);
        });

      return;
    }

    if (userInfo && item?.MetalName) {
      setSelectedMetals([convertToNumber(item)]);
      setSearchValue(item?.MetalName);
    }
  }, [userInfo, metalId, item]);

  function convertToNumber(item) {
    const convertedItem = { ...item };

    if (item.value1 !== undefined) {
      convertedItem.value1 = item?.value1?.trim()
        ? parseFloat(item?.value1?.replace(",", "."))
        : 0;
    } else {
      convertedItem.value1 = 0;
    }

    if (item.value2 !== undefined) {
      convertedItem.value2 = item?.value2?.trim()
        ? parseFloat(item?.value2?.replace(",", "."))
        : 0;
    } else {
      convertedItem.value2 = 0;
    }

    if (item.value3 !== undefined) {
      convertedItem.value3 = item?.value3?.trim()
        ? parseFloat(item?.value3?.replace(",", "."))
        : 0;
    } else {
      convertedItem.value3 = 0;
    }

    if (item.value4 !== undefined) {
      convertedItem.value4 = item?.value4?.trim()
        ? parseFloat(item?.value4?.replace(",", "."))
        : 0;
    } else {
      convertedItem.value4 = 0;
    }

    return convertedItem;
  }

  useEffect(() => {
    if (userInfo?.uid === "") {
      return;
    }

    if (selectedMetals.length > 0) {
      async function fetchMetals() {
        getFavoriteMetals(userInfo?.uid)
          .then((res) => {
            for (const key in res) {
              if (res[key].data.MetalName === selectedMetals[0].MetalName) {
                setIsFavorite(true);
                return;
              }
            }
          })
          .catch((err) => console.log(err));
      }

      fetchMetals();
    }
  }, [userInfo, selectedMetals]);

  const allMetal = {};

  for (const favoriteKey in favoriteMetals) {
    const favoriteData = favoriteMetals[favoriteKey].data;

    if (favoriteData.MetalName === selectedMetals[0].MetalName) {
      allMetal.id = favoriteData.id;
      break;
    }
  }

  const id = allMetal.id;

  const formattedDate = new Date().toISOString();

  const custCredit = 1;
  const infoC = {
    text: `Credits used with research on Market Intelligence`,
    type: "decrease",
    date: formattedDate,
    credits: custCredit,
  };

  const infoA = {
    action: `Favorite`,
    date: formattedDate,
    page: "Metal Price Details",
    keywords: `${item?.MetalName}`,
    name: userInfo?.userData?.name,
  };

  async function handleFavorite(metal, isFavorited, onFavorite) {
    onFavorite();

    if (isFavorited) {
      deleteFavoriteMetal(id, userInfo?.uid);
    } else if (await handleLimitCredits(userInfo?.uid)) {
      setIsLimitModalVisible(true);
      return;
    } else {
      saveAnalytics(userInfo?.uid, infoA);
      deleteCredit(userInfo?.uid, custCredit);
      historyCredits(infoC, userInfo?.uid);
      addFavoriteMetal(metal, userInfo?.uid);
    }
  }
  const pdfRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const infoD = {
    action: `Search`,
    date: formattedDate,
    page: "Market Intelligence Details",
    keywords: `${searchValue}`,
    name: userInfo?.userData?.name,
  };

  const buscar = () => {
    if (searchValue !== "") {
      saveAnalytics(userInfo?.uid, infoD);
      OpenModal();
    } else {
      console.log("erro");
    }
  };

  const saveComparedMetals = (listName) => {
    if (selectedMetals) {
      createCompareList(userInfo?.uid, listName, selectedMetals);
      setIsSaveModalOpen(false);
    } else {
      message.error("Please select a metal");
    }
  };

  const handlePercentageVar = (initialVal, newVal) =>
    (((newVal - initialVal) / initialVal) * 100).toFixed(2);

  const formatToCurrency = (num) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      num
    );

  const filterSecondTable = (metal) => {
    const metalNames = selectedMetals.map((selected) => selected.MetalName);
    const isAlreadySelected = metalNames.includes(metal.MetalName);

    if (metal.MetalName !== item.MetalName && !isAlreadySelected) {
      setSelectedMetals((prevState) => [...prevState, convertToNumber(metal)]);

      return CloseModal();
    }

    return message.error(
      "This metal is already selected, please select another metal!"
    );
  };

  const removeMetal = (metalName) => {
    setSelectedMetals((prevState) =>
      prevState.filter((metal) => metal.MetalName !== metalName)
    );
  };

  const Pdf = React.forwardRef((props, ref) => {
    return (
      <PDFContainer ref={ref}>
        <Cover metal={item} />
        <PdfDashboard>
          <h2 style={{ paddingLeft: "24px" }}>{item?.MetalName}</h2>
          <GridContainer
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0 24px",
            }}
          >
            <div className="metalDetails">
              <div className="daily">
                <strong>As of {format(new Date(), "MMM dd,yyyy")}</strong>
                <h2>
                  {formatToCurrency(parseFloat(convertToNumber(item)?.value4))}
                </h2>
              </div>

              <div className="variation">
                <Variation
                  percVariation={handlePercentageVar(
                    parseFloat(convertToNumber(item)?.value3),
                    parseFloat(convertToNumber(item)?.value4)
                  )}
                >
                  {handlePercentageVar(
                    parseFloat(convertToNumber(item)?.value3),
                    parseFloat(convertToNumber(item)?.value4)
                  )}
                </Variation>
                <p>Last 4 days</p>
              </div>
            </div>

            <div className="firstMetal">
              <LineChart data={selectedMetals} />

              <Table>
                <tr>
                  <th className="metalName">Index Name</th>
                  <th className="metalValue">Last Value</th>
                  <th className="metalVar">Variation</th>
                </tr>
                {selectedMetals.map((metal, index) => (
                  <tr key={metal.MetalName}>
                    <th className="metalName">{metal.MetalName}</th>
                    <th className="metalValue">
                      {formatToCurrency(parseFloat(metal.value4))}
                    </th>
                    <th className="metalVar">
                      <Variation
                        style={{ fontSize: 16 }}
                        percVariation={handlePercentageVar(
                          parseFloat(metal.value3),
                          parseFloat(metal.value4)
                        )}
                      >
                        {handlePercentageVar(
                          parseFloat(metal.value3),
                          parseFloat(metal.value4)
                        )}
                      </Variation>

                      {index !== 0 && (
                        <RemoveMetal
                          title="Remove Metal"
                          onClick={() => removeMetal(metal.MetalName)}
                        >
                          <CloseRounded sx={{ fontSize: 12 }} />
                        </RemoveMetal>
                      )}
                    </th>
                  </tr>
                ))}
              </Table>
            </div>
          </GridContainer>
        </PdfDashboard>
      </PDFContainer>
    );
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
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <div style={{ position: "relative" }}>
              <RowContainer
                style={{
                  position: "absolute",
                  width: 55,
                  marginTop: 16,
                  left: "-40px",
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
                  onClick={() => window.close()}
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
            </div>
            <Grid
              item
              xs={toggleDrawer ? 10 : 11}
              container
              alignItems="center"
            >
              <Modal
                title="Comparation Name"
                open={isSaveModalOpen}
                onCancel={() => setIsSaveModalOpen(false)}
                onOk={() => saveComparedMetals(comparationListName)}
                footer={[
                  <Button key="back" onClick={() => setIsSaveModalOpen(false)}>
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => saveComparedMetals(comparationListName)}
                  >
                    Save
                  </Button>,
                ]}
              >
                <InputComparationName
                  value={comparationListName}
                  onChange={(e) => setComparationListName(e.target.value)}
                  placeholder="Choose the name of this list"
                  className="inputComparationName"
                />
              </Modal>
              <AllModal
                type={"warning"}
                visible={isLimitModalVisible}
                onCancel={() => setIsLimitModalVisible(false)}
                onConfirm={() => setIsLimitModalVisible(false)}
                message="You have reached your daily limit of 1000 credits"
                title="Limit Reached"
              />

              <ModalExtra
                visible={isModalOpen}
                onCancel={CloseModal}
                metalname={searchValue}
                userId={userInfo?.uid}
                userName={userInfo?.userData?.name}
                onClick={filterSecondTable}
              />
              <div>
                <br />
                <TextDefault
                  color={theme.colors.textColor}
                  size={"28px"}
                  bold={"700"}
                >
                  Market Intelligence
                </TextDefault>
                <br />
                <TextDefault
                  color={theme.colors.gray[300]}
                  size={"14px"}
                  bold={"400"}
                >
                  Look at the price of the selected metal from the last 4 days,
                  and compare with other metals
                </TextDefault>

                <h2>
                  {item?.MetalName || comparationList?.name}{" "}
                  {Object.values(comparationList).length > 0 &&
                    `| ${selectedMetals[0].MetalName}`}
                </h2>
                <GridContainer>
                  <div className="metalDetails">
                    <div className="daily">
                      <strong>
                        As of{" "}
                        {comparationList?.createdAt
                          ? format(
                              new Date(comparationList?.createdAt),
                              "MMM dd,yyyy"
                            )
                          : format(new Date(), "MMM dd,yyyy")}
                      </strong>
                      <h2>
                        {formatToCurrency(
                          parseFloat(selectedMetals[0]?.value4)
                        )}
                      </h2>
                    </div>

                    <div className="variation">
                      <Variation
                        percVariation={
                          selectedMetals[0]?.value3 !== 0 &&
                          selectedMetals[0]?.value4 !== 0
                            ? handlePercentageVar(
                                parseFloat(selectedMetals[0]?.value3),
                                parseFloat(selectedMetals[0]?.value4)
                              )
                            : 0
                        }
                      >
                        {selectedMetals[0]?.value3 !== 0 &&
                        selectedMetals[0]?.value4 !== 0
                          ? handlePercentageVar(
                              parseFloat(selectedMetals[0]?.value3),
                              parseFloat(selectedMetals[0]?.value4)
                            )
                          : 0}
                      </Variation>
                      <p>Last 4 days</p>
                    </div>
                  </div>

                  <div className="firstMetal">
                    <PdfExport action={handlePrint} />
                    <div style={{ display: "flex", gap: 16 }}>
                      <CompareMetals onClick={buscar}>
                        Compare <Add />
                      </CompareMetals>

                      <SaveButton
                        isFavorite={isFavorite}
                        onClick={() =>
                          handleFavorite(selectedMetals[0], isFavorite, () =>
                            setIsFavorite((prevState) => !prevState)
                          )
                        }
                      >
                        {isFavorite ? "Favorited" : "Favorite"}
                        {isFavorite ? (
                          <StarIcon style={{ color: theme.colors.warn.main }} />
                        ) : (
                          <StarOutlineIcon
                            style={{ color: theme.colors.main[500] }}
                          />
                        )}
                      </SaveButton>

                      <SaveButton
                        isFavorite={isFavorite}
                        onClick={() => setIsSaveModalOpen(true)}
                        style={{ padding: "7px 8px" }}
                      >
                        {Object.values(comparationList).length > 0
                          ? "Create New Comparation"
                          : "Save comparation"}
                      </SaveButton>
                    </div>

                    <LineChart data={selectedMetals} />

                    <Table>
                      <tr>
                        <th className="metalName">Index Name</th>
                        <th className="metalValue">Last Value</th>
                        <th className="metalVar">Variation</th>
                      </tr>
                      {selectedMetals.map((metal, index) => (
                        <tr key={metal.MetalName}>
                          <th className="metalName">{metal.MetalName}</th>
                          <th className="metalValue">
                            {formatToCurrency(parseFloat(metal.value4))}
                          </th>
                          <th className="metalVar">
                            <Variation
                              style={{ fontSize: 16 }}
                              percVariation={
                                metal?.value3 !== 0 && metal?.value4 !== 0
                                  ? handlePercentageVar(
                                      parseFloat(metal?.value3),
                                      parseFloat(metal?.value4)
                                    )
                                  : 0
                              }
                            >
                              {parseInt(metal?.value3) !== 0 &&
                              parseInt(metal?.value4) !== 0
                                ? handlePercentageVar(
                                    parseFloat(metal?.value3),
                                    parseFloat(metal?.value4)
                                  )
                                : 0}
                            </Variation>

                            {index !== 0 && (
                              <RemoveMetal
                                title="Remove Metal"
                                onClick={() => removeMetal(metal.MetalName)}
                              >
                                <CloseRounded sx={{ fontSize: 12 }} />
                              </RemoveMetal>
                            )}
                          </th>
                        </tr>
                      ))}
                    </Table>
                  </div>
                </GridContainer>
              </div>
            </Grid>
          </Grid>
          <Pdf ref={pdfRef} />
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
