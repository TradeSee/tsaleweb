import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import { authScreen } from "../../../contexts/auth";
import getUserInfo from "../../../hooks/getUsers";
import { getFavoriteMetals } from "../../../hooks/metalPrice";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const iconStylesUp = {
  marginRight: "8px",
  color: "#008170",
};

const iconStylesDown = {
  marginRight: "8px",
  color: "#BB2525",
};

export default function SavedMetalPrice() {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const navigate = useNavigate();

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

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteMetals, setFavoriteMetals] = useState([]);

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

  function handleItemClick(item) {
    navigate("/market-intelligence-details", { state: item });
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
            <Grid sx={{ marginLeft: "75px", marginTop: "30px" }}>
              <TextDefault color={"#4b4b4b"} size={"32px"}>
                Hello, {userInfo?.userData?.name} {userInfo?.userData?.lastName}
              </TextDefault>
              <br />
              <TextDefault
                color={"#8a97aa"}
                size={"12px"}
                bold={"400"}
                style={{ marginTop: 20, width: "75%" }}
              >
                On this page you can check all metal prices saved by you.
              </TextDefault>
              <List
                sx={{
                  width: "70vw",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {metals.map((value) => (
                  <ListItem
                    key={value}
                    disableGutters
                    onClick={() => {
                      handleItemClick(value);
                    }}
                    sx={{
                      width: "100%",
                      backgroundColor: "#e9edf8",
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
