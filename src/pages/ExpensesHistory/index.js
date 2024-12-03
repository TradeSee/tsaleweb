import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { authScreen } from "../../contexts/auth";
import getUserInfo, { getHistoryCredits } from "../../hooks/getUsers";
import HistoryIcon from "@mui/icons-material/History";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Credits from "./Components/Credits";
import { Container, Content } from "./styles";
import Payment from "./Components/Payments";

export default function ExpensesHistory() {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useToggleDawer] = useState(false);

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

  function SetToggle(state) {
    useToggleDawer(state);
  }

  return (
    <>
      {auth ? (
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 1 }}
          >
            <Grid item xs={2}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid
              xs={8}
              sx={{
                marginLeft: toggleDrawer ? "75px" : "0px",
                marginTop: "40px",
              }}
            >
              <TextDefault> Historic Credits & Payments </TextDefault>
              <br />
              <Content>
                <Credits />
                <Payment />
              </Content>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
