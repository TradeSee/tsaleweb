import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import { authScreen } from "../../../contexts/auth";
import getUserInfo from "../../../hooks/getUsers";

export default function DashboardSaveOperations() {
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

  useEffect(() => {
    if(auth) {
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
  

  return (
    <>
      {auth ? (
        <ContainerHome>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={toggleDrawer ? 2 : 1}>
            <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
          </Grid>
          <Grid     sx={{ marginLeft: "75px", marginTop: "30px" }}>
              <TextDefault color={"#4b4b4b"} size={"32px"}>
                Hello, {userInfo?.userData?.name} {userInfo?.userData?.lastName}
              </TextDefault>

              
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
