import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Alert, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { authScreen } from "../../contexts/auth";
import getUserInfo from "../../hooks/getUsers";
import { getSustainabilityDataByUserId } from "../../hooks/sustainability";
import { getPromotions } from "../../hooks/notifications";
import { viewCredit } from "../../hooks/credits";

export default function Notifications() {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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

  const [sustainForm, setSustainForm] = useState(false);
  const [promotions, setPromotions] = useState([]);

  // cadastro no sustain
  useEffect(() => {
    if (userInfo) {
      getSustainabilityDataByUserId(userInfo?.uid)
        .then((temDados) => {
          setSustainForm(temDados);
        })
        .catch((error) => {
          console.error(
            "Erro ao verificar os dados de sustentabilidade:",
            error
          );
        });
    }
  }, [userInfo]);

  // promocoes
  useEffect(() => {
    getPromotions()
      .then((dados) => {
        const promotionsArray = Object.values(dados);
        setPromotions(promotionsArray);
      })
      .catch((error) => {
        console.error("Erro ao verificar os dados de sustentabilidade:", error);
      });
  }, []);

  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      if (userInfo) {
        try {
          const userCredits = await viewCredit(userInfo?.uid);
          setCredits(userCredits);
        } catch (error) {
          console.error("Erro ao buscar os créditos do usuário:", error);
        }
      }
    };

    fetchCredits();
  }, [userInfo]);


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
              <TextDefault color={"#4b4b4b"} size={"14px"} bold={400}>
              This will be where all the news will be displayed, such as: promotions and system updates, new messages and important news.
              </TextDefault>
              <br />
              <Stack spacing={2} sx={{ width: "100%" }}>
                {credits > 10 ? (
                  <Alert severity="info">
                    Credit amount has been updateds: {credits}
                  </Alert>
                ) : (
                  <Alert severity="error">
                    {" "}
                    Your credits are running out: {credits}
                  </Alert>
                )}

                {sustainForm ? (
                  " "
                ) : (
                  <Alert severity="warning">
                    {" "}
                    Don't forget to fill out the sustainability form!{" "}
                  </Alert>
                )}

                {promotions.map((promotion, index) => {
                  return <Typography>{promotion.title}</Typography>;
                })}
              </Stack>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
