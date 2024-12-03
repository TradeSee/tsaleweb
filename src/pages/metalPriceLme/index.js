import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "styled-components";
import { Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

import {
  ColumnContainer,
  ContainerHome,
  TextDefault,
} from "../../assets/styles";
import { BtnsContainer, SecondaryBtn } from "../findNewPartner/styles";

import Drawer from "../../components/Drawer";
import ButtonBlue from "../../components/myButton";
import { authScreen } from "../../contexts/auth";
import LoadingPage from "../../components/LoadingPage";
import { InitialIcon } from "../../components/InitialIcons";
import ModalSavedMp from "../savedOperations/components/modal";

import getUserInfo from "../../hooks/getUsers";

import MktIntelDemo from "./assets/MarketIntelligence.gif";

export default function MetalPriceLme() {
  const theme = useContext(ThemeContext);

  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

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
            <Grid item xs={8} container alignItems="center">
              <Grid item xs={5}>
                <ColumnContainer style={{ width: "100%", marginLeft: 50 }}>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <TextDefault color={theme.colors.gray[800]} size={"32px"}>
                    Market Intelligence
                  </TextDefault>
                  <TextDefault
                    color={"#8a97aa"}
                    size={"18px"}
                    bold={"400"}
                    style={{ marginTop: 20, width: "75%" }}
                  >
                    Search for any metal and view the prices of the last three
                    days.
                  </TextDefault>
                  <BtnsContainer>
                    <ButtonBlue
                      width="250px"
                      onClick={() => {
                        window.location.href = "/market-intelligence-dashboard";
                      }}
                    >
                      Get started{" "}
                      <ArrowForwardIcon
                        sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                      />
                    </ButtonBlue>
                    <SecondaryBtn
                      onClick={() => {
                        OpenModal();
                      }}
                    >
                      Open data records
                    </SecondaryBtn>
                  </BtnsContainer>

                  <ModalSavedMp
                    visible={isModalOpen}
                    onCancel={CloseModal}
                    userId={userInfo?.uid}
                  />
                </ColumnContainer>
              </Grid>

              <Grid item xs={4}>
                <InitialIcon>
                  <img src={MktIntelDemo} alt="Demo Mkt Intel" />
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
