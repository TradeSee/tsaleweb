import React, { useEffect, useState } from "react";
import { ContainerHome, RowContainer, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../contexts/auth";
import LoadingPage from "../../components/LoadingPage";
import CustomTable from "./components/table";
import ActionChart from "./components/actionChart";
import UserChart from "./components/userChart";
import PageChart from "./components/pageChart";
import getUserInfo from "../../hooks/getUsers";

export default function AnalyticsPage() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
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


  useEffect(() => {
    if (userInfo) {
      const roleUser = userInfo?.userData?.role;

      if (auth && roleUser !== "admin") {
        navigate("/home");
      }
    }
  }, [auth, userInfo]);

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid container spacing={2}>
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid item xs={toggleDrawer ? 10 : 11} style={{ marginTop: 20 }}>
              <TextDefault color={"#4b4b4b"} size={"32px"} style={{ marginTop: 40, marginBottom: 5 }}>
                Dashboard Analytics
              </TextDefault>             
              <RowContainer>
              <ActionChart />
              <UserChart />
              <PageChart />
              </RowContainer>
           
              <CustomTable />
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
