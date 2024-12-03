import React, { useEffect, useState } from "react";
import {
  ColumnContainer,
  ContainerHome,
  TextDefault,
  IconServices,
} from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import ButtonBlue from "../../components/myButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MetalPrice from "../../icons/MetalPrice1.png";
import { Link, useNavigate } from "react-router-dom";
import { authScreen } from "../../contexts/auth";
import LoadingPage from "../../components/LoadingPage";

export default function Sponsor() {
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

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            style={{
              height: "100%",
            }}
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
            >
              <Grid item xs={7}>
                <ColumnContainer style={{ marginLeft: 50 }}>
                  <TextDefault color={"#4b4b4b"} size={"32px"}>
                    International Sponsor
                  </TextDefault>
                  <TextDefault
                    color={"#8a97aa"}
                    size={"18px"}
                    bold={"400"}
                    style={{ marginTop: 20, width: "75%" }}
                  >
                    On this page you can view for any sponsor
                  </TextDefault>
                  <Link to={"/international-sponsor-list"}>
                    <ButtonBlue width="250px" marginTop="50px">
                      Get started{" "}
                      <ArrowForwardIcon
                        sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                      />
                    </ButtonBlue>
                  </Link>
                </ColumnContainer>
              </Grid>
              <Grid item xs={4}>
                <IconServices iconUrl={MetalPrice} />
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
