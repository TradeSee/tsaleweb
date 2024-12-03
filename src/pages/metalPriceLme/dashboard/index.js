import React, { useContext, useEffect, useState } from "react";
import {
  ContainerHome,
  ColumnContainer,
  TextDefault,
} from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid, Paper, Typography } from "@mui/material";
import SplineChart from "./chart";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import { authScreen } from "../../../contexts/auth";
import ButtonBlue from "../../../components/myButton";
import { getFavoriteMetals } from "../../../hooks/metalPrice";
import getUserInfo from "../../../hooks/getUsers";
import { useNews } from "../../../hooks/getNews";
import NewsList from "../../../components/NewsList";
import AllModal from "../../../components/AllModal";
import { historyCredits, viewCredit } from "../../../hooks/credits";
import TableLme from "./table";
import ModalList from "../components/modal";
import { NewsContainer, StyledButton } from "./styleD";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { saveAnalytics } from "../../../hooks/analytics";
import { ThemeContext } from "styled-components";

export default function MetalPriceDashboard() {
  const theme = useContext(ThemeContext);

  const [toggleDrawer, useTroggleDawer] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [favoriteMetals, setFavoriteMetals] = useState([]);

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

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const [userCredit, setUserCredit] = useState(null);
  const custCredit = 5;

  useEffect(() => {
    if (userInfo) {
      const fetchCredits = async () => {
        try {
          const userCredits = await viewCredit(userInfo?.uid);
          setUserCredit(userCredits);
        } catch (error) {
          console.error("Erro ao buscar os créditos do usuário:", error);
        }
      };

      fetchCredits();
    }
  }, [userInfo]);

  const formattedDate = new Date().toISOString();

  const infoA = {
    action: `Search`,
    date: formattedDate,
    page: "Market Intelligence",
    keywords: `${searchValue}`,
    name: userInfo?.userData?.name,
  };

  const infoC = {
    text: `Credits used with research on Market Intelligence`,
    type: "decrease",
    date: formattedDate,
    credits: custCredit,
  };

  const buscar = () => {
    if (userCredit <= custCredit) {
      handleOpenModal();
    } else {
      if (searchValue !== "") {
        const props = {
          search: searchValue,
        };
        historyCredits(infoC, userInfo?.uid);
        saveAnalytics(userInfo?.uid, infoA);
        OpenModal();
      } else {
        console.log("erro");
      }
    }
  };

  useEffect(() => {
    if (userInfo === "") {
      return;
    }

    async function fetchMetals() {
      getFavoriteMetals(userInfo?.uid)
        .then((res) => setFavoriteMetals(res))
        .catch((err) => console.log(err));
    }

    fetchMetals();
  }, [userInfo]);

  const favoriteKeys = Object.values(favoriteMetals);

  const metals = favoriteKeys.map((metal) => {
    if (metal?.data) {
      return metal.data;
    }

    return metal;
  });
  const { newsData } = useNews();

  const newsArray = newsData ? Object.values(newsData) : [];

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmAction = () => {
    navigate(`/credits`);
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

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
              container
              alignItems="center"
              marginBottom={5}
            >
              <Grid item xs={7}>
                <ColumnContainer style={{ marginTop: 32, marginLeft: 30 }}>
                  <TextDefault color={theme.colors.gray[800]} size={"32px"}>
                    Market Intelligence
                  </TextDefault>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.colors.gray[800], marginLeft: "30" }}
                  >
                    Search for any any metal and lood prices of the last 3 days.
                  </Typography>
                </ColumnContainer>
              </Grid>
              <div
                style={{
                  width: "84%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "24px 0",
                }}
              >
                <input
                  className="mainSearch"
                  name="text"
                  placeholder="Aluminum, Zinc, Steel, Scrap, etc..."
                  type="search"
                  style={{
                    marginLeft: 30,
                    width: "100%",
                  }}
                  value={searchValue}
                  onChange={handleInputChange}
                  list="optionsA"
                />
                <datalist id="optionsA">
                  <option value="Aluminiu"></option>
                  <option value="Ferrous"></option>
                  <option value="Stainless"></option>
                  <option value="Steel"></option>
                  <option value="Copper"></option>
                  <option value="Titanium"></option>
                  <option value="Tungsten"></option>
                  <option value="Zinc"></option>
                  <option value="Ferro-chrome"></option>
                  <option value="Ferro-manganese"></option>
                  <option value="Silver"></option>
                  <option value="Iron"></option>
                  <option value="scrap"></option>
                  <option value="6061"></option>
                </datalist>
                <ButtonBlue width="100px" marginLeft="8px" onClick={buscar}>
                  Search
                </ButtonBlue>
              </div>

              <Grid item xs={10} marginLeft={4}>
                <SplineChart />

                <AllModal
                  type={"warning"}
                  visible={modalVisible}
                  onCancel={handleCloseModal}
                  message="You need to add more credits to continue the search"
                  title="No Balance"
                  onConfirm={handleConfirmAction}
                />
                <ModalList
                  visible={isModalOpen}
                  onCancel={CloseModal}
                  metalname={searchValue}
                  userId={userInfo?.uid}
                />
                {/* <TableLme /> */}
              </Grid>

              <Grid item xs={toggleDrawer ? 10 : 11} container>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.colors.gray[800],
                    fontWeight: "bold",
                    marginLeft: "30px",
                    marginTop: "40px",
                  }}
                >
                  News
                </Typography>
              </Grid>

              <NewsContainer>
                <NewsList data={newsArray} />
              </NewsContainer>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
