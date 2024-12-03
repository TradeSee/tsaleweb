import React, { useEffect, useState } from "react";
import { Box, Grid, List, Modal, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import format from "date-fns/format";
import AddIcon from "@mui/icons-material/Add";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { ChartsHome } from "./graph";
import { authScreen } from "../../contexts/auth";
import CompanyMapperInfo from "./utils/mapper";
import {
  BackgroundClose,
  BarTrade,
  BtnDefault,
  ColumnContainer,
  ContainerHome,
  ImgDefault,
  PanelTrade,
  RowContainer,
  TagVariation,
  TextDefault,
} from "../../assets/styles";
import Carousel from "../../components/Carousel";
import ResponsiveMapping from "../../components/ResponsiveMapping";
import LoadingPage from "../../components/LoadingPage";
import Drawer from "../../components/Drawer";
import Partner from "./components/Partner";
import { getPromotions } from "../../hooks/notifications";
import getUserInfo from "../../hooks/getUsers";
import { getCompanieFavorite } from "../../hooks/findNewPartner";
import { useNews } from "../../hooks/getNews";
import { getFavoriteMetals, deleteFavoriteMetal } from "../../hooks/metalPrice";
import { SliderNavigation } from "./components/SliderNavigation";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import {
  ContainerCardModule,
  ContainerFirstLogin,
  ContainerNotificationHome,
  ContainerSeachHome,
  DeleteMetalButton,
  FavoriteCompanies,
  FavoriteCompaniesContainer,
  FavoriteMetals,
  NotificationBtn,
  Notifications,
  TagNotification,
} from "./styles";
import "swiper/css";
import SearchInput from "./components/SearchInput";
import { saveAnalytics } from "../../hooks/analytics";
import Insights from "./components/insights";
import CardModule from "./components/CardModule";
import ZoomIcon from "../../icons/zoomWhite.png";
import WebIcon from "../../icons/webWhite.png";
import UserIcon from "../../icons/userWhite.png";
import FolderIcon from "../../icons/folder.png";
import LoadingFavoriteCompany from "./components/LoadingFavoriteComapany";
import SortIcon from "../../icons/sort.png";
import CardModulev2 from "./components/CardModulev2";
import SearchList from "./components/SearchInput/SearchList";
import HeaderSearchModal from "./components/SearchInput/HeaderSearchModal";
import RecentSearch from "./components/SearchInput/RecentSearch";
import Capitalize from "../../utils/capitalize";
import AreaMetals from "./graph/AreaMetals";
import MetalList from "./components/MetalsList";
import TradeMetalsList from "./components/TradeMetalsList";
import { useLme } from "../../hooks/getLME";
import DashboardMetal from "./components/dashboardMetal";
import DashboardCarouselMetal from "./components/dashboardCarouselMetal";
import NotificationPainel from "./components/NotificationPainel";
import SplineChart from "../metalPriceLme/dashboard/chart";
import WelcomeBanner from "../../icons/welcomeBanner.png"
import { AttFirstLogin, getFirstLogin } from "../../hooks/welcomeControl";

const { size } = ResponsiveMapping();

export default function Home() {
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const gData1 = [1398, 1398, 7800, 4508, 8900];
  const gData2 = [8900, 4508, 7800, 1398, 1398];
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingg, setLoadingg] = useState(true);
  const [companies, setCompanies] = useState("");
  const [toggleDrawer, useTroggleDawer] = useState(true);
  const [favoriteMetals, setFavoriteMetals] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalNotification, setIsModalNotification] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [promotions, setPromotions] = useState([]);

  const { newsData, loading } = useNews();
  const windowWidth = useWindowWidth();
  const { lmeData } = useLme();

  function indicatorRed(ind) {
    setIsNewNotification(ind);
  }

  const getDataAtual = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getUTCDate()).padStart(2, "0");
    const mes = String(dataAtual.getUTCMonth() + 1).padStart(2, "0"); // Os meses em JavaScript são baseados em zero
    const ano = dataAtual.getUTCFullYear();

    return `${ano}/${mes}/${dia}`;
  };

  useEffect(() => {
    console.log("LME");
    console.log(lmeData);
  });

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

  const closeFirstLogin = () => {
    setIsFirstLogin(false);
    AttFirstLogin();
  }

  const closeModal = (modal) => {
    if(modal == "login") {
      setIsFirstLogin(false);
    } else {
      setIsLimitModalVisible(false);
    }
  };

  useEffect(() => {
    console.log(search);
    if (search) setIsLimitModalVisible(true);
  }, [search]);

  useEffect(() => {
    if (!loading) {
      const newsArray = newsData ? Object.values(newsData) : [];
      setAllNews(newsArray);
    }
  }, [loading, newsData]);

  // promocoes
  useEffect(() => {
    if (userInfo) {
      getPromotions()
        .then((dados) => {
          const promotionsArray = Object.values(dados);
          setPromotions(promotionsArray);
        })
        .catch((error) => {
          console.error("Erro ao verificar os dados de promotions:", error);
        });

      getFavoriteMetals(userInfo?.uid)
        .then((res) => {
          const favMetals = Object.keys(res).map((key) => res[key].data);

          setFavoriteMetals(favMetals);
        })
        .catch((err) => console.log("Error to fetch metals:", err));
    }
  }, [userInfo]);

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setUserInfo(userData);

          getFirstLogin().then(resp => {
            setIsFirstLogin(resp)
          })

        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData().finally(() => {
        setLoadingg(false);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      const fetchDataC = async () => {
        try {
          const dataUnmapped = await getCompanieFavorite(userInfo.uid);
          const shortObj = dataUnmapped.sort((a, b) => new Date(b.saved_at) - new Date(a.saved_at));
          const mappedData = CompanyMapperInfo(shortObj);
          setCompanies(mappedData);
          
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        } finally {
          setLoadingg(false);
        }
      };

      fetchDataC();
    }
  }, [auth, userInfo]);

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const closeNotification = () => {
    setIsModalNotification(false);
  };

  const openNotification = () => {
    setIsModalNotification(!isModalNotification);
    setIsNewNotification(false)
  };

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  function cleanMetalName(metal) {
    const metalName = metal.split(" ");

    return metalName.length > 0 ? metalName[0] : "";
  }

  function convertStringToNumber(number) {
    if (typeof number === "string") {
      return parseFloat(number?.replace(",", ".")).toFixed(2);
    }

    return parseFloat(number).toFixed(2);
  }

  function CalculatePercentage(firstNumber, finalNumber) {
    const convertedfirst = convertStringToNumber(firstNumber);
    const convertedFinal = convertStringToNumber(finalNumber);

    const percentageVariation =
      ((convertedFinal - convertedfirst) / convertedfirst) * 100;

    return `${percentageVariation.toFixed(2)}%`;
  }

  async function handleDeleteMetal(id) {
    console.log({ id, userId: userInfo?.uid });
    await deleteFavoriteMetal(id, userInfo?.uid);

    getFavoriteMetals(userInfo?.uid)
      .then((res) => {
        const favMetals = Object.keys(res).map((key) => res[key].data);

        setFavoriteMetals(favMetals);
      })
      .catch((err) => console.log(err));
  }

  const formattedDate = new Date().toISOString();

  const infoM = {
    action: `Open Page`,
    date: formattedDate,
    page: "Home",
    keywords: `Market Intelligence`,
    name: userInfo?.userData?.name,
  };

  const infoS = {
    action: `Open Page`,
    date: formattedDate,
    page: "Home",
    keywords: `Simulation`,
    name: userInfo?.userData?.name,
  };

  const infoSustain = {
    action: `Open Page`,
    date: formattedDate,
    page: "Home",
    keywords: `Sustain`,
    name: userInfo?.userData?.name,
  };

  function OpenSimulation() {
    saveAnalytics(userInfo.uid, infoS);
    navigate("/simulation");
  }
  function OpenSustain() {
    saveAnalytics(userInfo.uid, infoSustain);
    navigate("/sustainability");
  }
  function OpenMarket() {
    saveAnalytics(userInfo.uid, infoM);
    navigate("/market-intelligence");
  }

  const openNewTab = (path) => {
    window.open(path, "_blank");
  };

  useEffect(() => {
    const TitlePage = "Home";

    document.title = TitlePage;
  }, []);

  function linkDataRecords() {
    window.open(`/trade-data?dataRecords=${true}`, "_blank");
  }

  return (
    <>
      {auth ? (
        <ContainerHome>
          {isModalNotification ? (
            <BackgroundClose onClick={() => setIsModalNotification(false)} />
          ) : (
            ""
          )}

          <Grid container rowSpacing={1} xs={12} sm={12} md={12} lg={12}>
            <Modal
              open={isFirstLogin}
              onClose={() => closeModal('login')}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>
                <ContainerFirstLogin>
                 
                <Grid container xs={12} sm={12} md={12} lg={12} style={{height: '100%', width: "100%"}}>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                      <ColumnContainer style={{paddingLeft: 10, paddingTop: 20}}>
                        <TextDefault size="35px" color="#4b4b4b" bold="800">Welcome</TextDefault>
                        <TextDefault size="20px" color="#4b4b4b" bold="400" style={{marginTop: 40}}>Welcome to our metals and leads trading platform.</TextDefault>
                        <TextDefault size="20px" color="#4b4b4b" bold="400" style={{marginTop: 10}}>We are here to help you make your trading experience smooth and successful.</TextDefault>
                      </ColumnContainer>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                      <div style={{width: "102.8%", height: "100%", backgroundColor: "#366dfb", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ImgDefault src={WelcomeBanner} width={"70%"} height={"60%"}/>
                        <RowContainer style={{position: "absolute", bottom: 20, right: 20}}>
                          <BtnDefault color="#fff" borderR="6px" hoverColor="#e7edfe" onClick={() => closeFirstLogin()}>
                            <TextDefault size="17px" color="#366dfb">Close</TextDefault>
                          </BtnDefault>
                        </RowContainer>
                      </div>
                  </Grid>
                </Grid>
                 
                </ContainerFirstLogin>
              </>
            </Modal>
            <Grid
              item
              xs={toggleDrawer ? 2 : 1}
              sm={toggleDrawer ? 2 : 1}
              md={toggleDrawer ? 3 : 1}
              lg={toggleDrawer ? 2 : 1}
              style={{ zIndex: 2 }}
            >
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>

            <Grid
              item
              xs={toggleDrawer ? 10 : 11}
              sm={toggleDrawer ? 10 : 11}
              md={toggleDrawer ? 8.6 : 11}
              lg={toggleDrawer ? 9.7 : 11}
              style={{
                height: windowWidth >= 1300 && "100dvh",
                paddingRight: 16,
              }}
            >
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                {/**1ª Row */}
                <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  style={{ zIndex: 9999 }}
                >
                  <SearchInput
                    value={search}
                    isDrawerOpen={toggleDrawer}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>

                

                <Modal
                  open={isLimitModalVisible}
                  onClose={() => closeModal('search')}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <>
                    <ContainerSeachHome>
                      <HeaderSearchModal attModal={closeModal} />
                      <ColumnContainer
                        style={{ height: 270, overflow: "auto" }}
                      >
                        <SearchList target={search} attModal={closeModal} />
                      </ColumnContainer>
                      <RecentSearch attModal={closeModal} />
                    </ContainerSeachHome>
                  </>
                </Modal>

                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Notifications>
                    <NotificationPainel
                      visible={isModalNotification}
                      modal={openNotification}
                      readIndicator={indicatorRed}
                    />

                    {isNewNotification ? <TagNotification /> : ""}

                    <NotificationBtn
                      className="btnNotification"
                      onClick={openNotification}
                    >
                      <svg viewBox="0 0 448 512" className="bell">
                        <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                      </svg>
                    </NotificationBtn>
                  </Notifications>
                </Grid>

                <Grid item xs={9} sm={9} md={9} lg={9}>
                  {/**2ª Row */}
                  <Grid
                    container
                    spacing={3}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ marginLeft: -5, marginTop: -15 }}
                  >
                    <Grid item xs={3.963} sm={3.963} md={3.963} lg={3.963}>
                      <CardModulev2
                        img={ZoomIcon}
                        title="Trade Data"
                        subTitle="Find new business partners worldwide."
                        click={() => openNewTab("/trade-data")}
                      />
                    </Grid>
                    <Grid item xs={3.963} sm={3.963} md={3.963} lg={3.963}>
                      <CardModulev2
                        img={WebIcon}
                        title="Market Intelligence"
                        subTitle="Search for any metal and view the prices of the last
                        three days."
                        click={() => openNewTab("/market-intelligence")}
                      />
                    </Grid>
                    <Grid item xs={3.963} sm={3.963} md={3.963} lg={3.963}>
                      <CardModulev2
                        img={UserIcon}
                        title="Leads Enrichment"
                        subTitle="Search for any potential clients you want and access to their contact data."
                        click={() => openNewTab("/leadsenrichment")}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <DashboardCarouselMetal />
                  </Grid>

                  {/**5ª Row */}
                  <Grid
                    container
                    spacing={2}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ marginTop: -16, height: 200 }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      {/*<AreaMetals/>*/}
                      <SplineChart hideTradeBar={true} isOnHome={true} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <FavoriteCompaniesContainer>
                    <ColumnContainer style={{ height: 795 }}>
                      <RowContainer>
                        <ColumnContainer>
                          <TextDefault color={"#4b4b4b"} size={"19px"}>
                            Favorite Companies
                          </TextDefault>
                          <TextDefault
                            color={"#8a97aa"}
                            size={"12px"}
                            style={{ paddingBottom: 8 }}
                          >
                            Supplier and Buyer
                          </TextDefault>
                        </ColumnContainer>
                        <ImgDefault
                          src={FolderIcon}
                          style={{ marginLeft: "20%" }}
                        />
                      </RowContainer>

                      <FavoriteCompanies>
                        <ColumnContainer
                          style={{ alignItems: "center", width: "100%" }}
                        >
                          {Array.isArray(companies) &&
                            companies.slice(0, 9).map((item, index) => (
                              <div key={index} style={{ width: "100%" }}>
                                <Partner data={item} />
                              </div>
                            ))}

                          {companies.length === 0 ? (
                            <LoadingFavoriteCompany />
                          ) : (
                            ""
                          )}

                          <BtnDefault
                            borderR="6px"
                            width="110px"
                            height="35px"
                            marginTop="30px"
                            padding="0px 0px"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => linkDataRecords()}
                          >
                            <TextDefault color="#fff" bold="800">
                              More{" "}
                            </TextDefault>
                            <ImgDefault
                              src={SortIcon}
                              width="15px"
                              height="15px"
                              style={{ marginLeft: 12 }}
                            />
                          </BtnDefault>
                        </ColumnContainer>
                      </FavoriteCompanies>
                    </ColumnContainer>
                  </FavoriteCompaniesContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
