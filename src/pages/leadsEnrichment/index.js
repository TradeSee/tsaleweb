import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid } from "@mui/material";

import ButtonBlue from "../../components/myButton";
import { InitialIcon } from "../../components/InitialIcons";
import { ContainerHome, TextDefault } from "../../assets/styles";
import { BtnsContainer, SecondaryBtn, StartContainer } from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../contexts/auth";
import Drawer from "../../components/Drawer";
import LoadingPage from "../../components/LoadingPage";

import LeadsDemo from "./assets/leads.gif";

export default function LeadsEnrichment() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
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
              <Grid item xs={4}>
                <StartContainer>
                  <TextDefault color={"#4b4b4b"} size={"32px"}>
                    Leads Enrichment
                  </TextDefault>
                  <br />
                  <TextDefault
                    color={"#8a97aa"}
                    size={"18px"}
                    bold={"400"}
                    style={{ marginTop: 20, width: "20%" }}
                  >
                    Search for any potential clients you want and access to
                    their contact data.
                  </TextDefault>
                  <BtnsContainer>
                    <ButtonBlue
                      width="250px"
                      onClick={() => {
                        window.location.href = "/leadsenrichment-search";
                      }}
                    >
                      Get started{" "}
                      <ArrowForwardIcon
                        sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                      />
                    </ButtonBlue>
                  </BtnsContainer>
                </StartContainer>
              </Grid>
              <Grid item xs={4}>
                <InitialIcon>
                  <img src={LeadsDemo} alt="All companies" />
                </InitialIcon>
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
