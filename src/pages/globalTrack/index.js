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
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import { BtnsContainer, SecondaryBtn } from "../findNewPartner/styles";
import ModalSavedTracking from "./components/modal";
import getUserInfo from "../../hooks/getUsers";

export default function GlobalTrack() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
            style={{
              height: "100%",
            }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid item xs={toggleDrawer ? 8 : 8} container alignItems="center">
            <ModalSavedTracking
                visible={isModalOpen}
                onCancel={CloseModal}
                userId={userInfo?.uid}
              />
              <Grid container xs={12}>
                <Grid item xs={7}>
                  <ColumnContainer style={{ width: "100%", marginLeft: 100 }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <TextDefault color={"#4b4b4b"} size={"32px"}>
                     Global Track
                    </TextDefault>
                    <TextDefault
                      color={"#8a97aa"}
                      size={"18px"}
                      bold={"400"}
                      style={{ marginTop: 20, width: "75%" }}
                    >
                     Tracing system enabling containers to be tracked throughout the world. Find your freight fast.
                    </TextDefault>
                 
                    
                    <BtnsContainer>
                      <ButtonBlue width="250px"    onClick={() => {
                          window.location.href = "/globaltrack-search";
                        }}>
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
                     
                   
                  </ColumnContainer>
                </Grid>
                <Grid item xs={2} style={{ marginLeft: 200 }}>
                  <IconServices iconUrl={MetalPrice} />
                </Grid>
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
