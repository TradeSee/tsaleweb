import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import Drawer from "../../../components/Drawer";
import LoadingPage from "../../../components/LoadingPage";

import { authScreen } from "../../../contexts/auth";

import { abundanceService } from "../../../service/apiAbund";
import getUserInfo from "../../../hooks/getUsers";
import { getIdCarbonCredit } from "../../../hooks/carbonCredit";

import {
  Header,
  Content,
  SectionContainer,
  Card,
  Benefits,
  Cta,
} from "./styles";

import Abundance from "../icons/abundance.png";

import Data from "../dashboard/data.json";

import CarbonCredit from "../icons/CarbonCredit.svg";
import { Forest, LeaderboardRounded } from "@mui/icons-material";

export default function CarbonRegister() {
  const [toggleDrawer, useTroggleDawer] = useState(true);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }
  const [auth, setAuth] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
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

  const [id, setId] = useState("");

  useEffect(() => {
    if (userInfo?.uid === "") {
      return;
    }
    async function fetchAbunId() {
      getIdCarbonCredit(userInfo?.uid)
        .then((res) => {
          setId(res);
        })
        .catch((err) => console.log(err));
    }

    fetchAbunId();
  }, [userInfo]);

  const country = "Brasil";
  const taxIdentificationNumber = "123456";
  const returnUrl = "google.com";

  async function fetchBuySubscription() {
    try {
      const response = await abundanceService.createPaymentSubscription(
        id,
        subscriptionId,
        country,
        taxIdentificationNumber,
        returnUrl,
        userInfo?.uid
      );
      const newWindow = window.open(response?.data?.url, "_blank");
      newWindow.focus();
    } catch (error) {
      console.error("Erro ao gerar o token:", error);
    }
  }

  return (
    <>
      {auth ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={toggleDrawer ? 2 : 1}>
            <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
          </Grid>

          <Grid item xs={10} container marginLeft={toggleDrawer ? "280px" : ""}>
            <Content>
              <Header style={{ marginLeft: "80px" }}>
                <h1>Carbon Offset</h1>

                <h3>Marketplace</h3>

                <div>
                  <h3>How do you want to help the planet today?</h3>
                </div>

                <h2 style={{ color: "#000", marginTop: 24 }}>
                  Abundance Brasil
                </h2>
              </Header>

              <SectionContainer>
                <Card>
                  <div>
                    <img src={Abundance} alt={"abundance "} />

                    <strong>Friend</strong>

                    <strong>1 Tree</strong>

                    <span>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been...
                    </span>

                    <strong>U$20.00</strong>
                  </div>

                  <Benefits>
                    <span>
                      <span>
                        <img
                          src={CarbonCredit}
                          alt="carbon"
                          style={{ color: "#366DFB", width: 24, height: 24 }}
                        />
                        <p>Carbon</p>
                      </span>

                      <span>1</span>
                    </span>
                    <span>
                      <span>
                        <Forest style={{ color: "#366DFB" }} />
                        <p>Tree</p>
                      </span>

                      <span>1</span>
                    </span>
                    <span>
                      <span>
                        <LeaderboardRounded
                          style={{ fontSize: 24, color: "#366DFB" }}
                        />
                        <p>Carbon</p>
                      </span>

                      <span>1</span>
                    </span>
                  </Benefits>

                  <Cta>Get a plan</Cta>
                </Card>
              </SectionContainer>
            </Content>
          </Grid>
        </Grid>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
