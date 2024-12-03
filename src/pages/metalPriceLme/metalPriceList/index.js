import React, { useContext, useEffect, useState } from "react";
import { ContainerHome, MainSearchInput } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import { authScreen } from "../../../contexts/auth";
import { getMetalPrice } from "../../../hooks/metalPrice";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import {
  deleteCredit,
  handleLimitCredits,
  historyCredits,
} from "../../../hooks/credits";
import getUserInfo from "../../../hooks/getUsers";
import ButtonBlue from "../../../components/myButton";
import AllModal from "../../../components/AllModal";
import { ThemeContext } from "styled-components";

export default function MetalPriceList() {
  const theme = useContext(ThemeContext);

  const [data, setData] = useState([]);
  const [custCredit, setCustCredit] = useState(5);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);

  const iconStylesUp = {
    marginRight: "8px",
    color: theme.colors.sucess.main,
  };

  const iconStylesDown = {
    marginRight: "8px",
    color: theme.colors.danger.main,
  };

  const { metalname } = useParams();

  const [searchValue, setSearchValue] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

  const [toggleDrawer, useTroggleDawer] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }
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
    getMetalPrice().then((res) => setData(Object.values(res)));
  }, []);

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

  const filtrarRegistrosPorNome = (valorPesquisa) => {
    const keywords = valorPesquisa.toLowerCase().split(" ");

    const registrosFiltrados = data.filter((registro) => {
      const metal = registro?.MetalName?.toLowerCase();

      return keywords.every((keyword) => metal.includes(keyword));
    });
    return registrosFiltrados;
  };

  // atualiza de acordo c a nova pesquisa
  const atualizarRegistrosFiltrados = () => {
    const novoTermoPesquisa = searchValue || metalname;
    const novosRegistrosFiltrados = filtrarRegistrosPorNome(novoTermoPesquisa);
    setRegistrosFiltrados(novosRegistrosFiltrados);
  };

  useEffect(() => {
    if (data.length > 0) {
      //iniciando com metalname
      atualizarRegistrosFiltrados();
    }
  }, [metalname, data]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const buscar = () => {
    if (searchValue !== "") {
      //nova busca
      atualizarRegistrosFiltrados();
    } else {
      console.log("Erro pesquisa vazia");
    }
  };

  const formattedDate = new Date().toISOString();

  const infoC = {
    text: `Credits used with research on Market Intelligence`,
    type: "decrease",
    date: formattedDate,
    credits: custCredit,
  };

  async function handleItemClick(item) {
    if (userInfo) {
      if (await handleLimitCredits(userInfo?.uid)) {
        setIsLimitModalVisible(true);
        return;
      }

      deleteCredit(userInfo?.uid, custCredit);
      historyCredits(infoC, userInfo?.uid);
      navigate("/market-intelligence-details", { state: item });
    }
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
            <Grid item xs={2}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid marginLeft={searchValue ? "150px" : "300px"}>
              <AllModal
                type={"warning"}
                visible={isLimitModalVisible}
                onCancel={() => setIsLimitModalVisible(false)}
                onConfirm={() => setIsLimitModalVisible(false)}
                message="You have reached your daily limit of 1000 credits"
                title="Limit Reached"
              />
              <h2>Search results for: {metalname} </h2>
              <Typography
                variant="caption"
                sx={{ color: theme.colors.gray[800], marginLeft: "10px" }}
              >
                More specific search or click on the card to see more
                information about the metal and prices.
              </Typography>
              <br />
              <MainSearchInput
                className="mainSearch"
                name="text"
                placeholder="6061, Midwest, scrap 10/10..."
                type="search"
                // style={{ marginTop: 20, marginLeft: 60 }}
                value={searchValue}
                onChange={handleInputChange}
              />
              <ButtonBlue width="100px" marginTop="20px" onClick={buscar}>
                Search
              </ButtonBlue>
              <br />

              <List
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {registrosFiltrados.map((value) => (
                  <ListItem
                    key={value}
                    disableGutters
                    sx={{
                      width: "100%",
                      backgroundColor: theme.colors.light[100],
                      borderRadius: 8,
                      padding: 1,
                      marginBottom: "5px",
                    }}
                    secondaryAction={
                      <IconButton aria-label="openlink">
                        {value.value1 > value.value4 ? (
                          <TrendingDownIcon style={iconStylesDown} />
                        ) : value.value1 < value.value4 ? (
                          <TrendingUpIcon style={iconStylesUp} />
                        ) : (
                          <TrendingFlatIcon />
                        )}
                      </IconButton>
                    }
                    onClick={() => {
                      handleItemClick(value);
                    }}
                  >
                    <ListItemText primary={value.MetalName} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
