import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import CarbonCredit from "../icons/CarbonCredit.svg";
import { Grid, Paper } from "@mui/material";

import { StatusToTag } from "../../../utils/statusToTag";
import ForestIcon from "@mui/icons-material/Forest";

import LoadingPage from "../../../components/LoadingPage";
import { Link, useNavigate } from "react-router-dom";
import { authScreen } from "../../../contexts/auth";

import { abundanceService } from "../../../service/apiAbund";
import getUserInfo from "../../../hooks/getUsers";
import { getIdCarbonCredit } from "../../../hooks/carbonCredit";
import {
  ArrowRightAltRounded,
  InfoRounded,
  LeaderboardRounded,
  ShoppingCart,
} from "@mui/icons-material";
import {
  FootCard,
  Footer,
  Icons,
  Marketplace,
  Header,
  HeaderCard,
} from "./styles";

export default function CarbonCreditDashboard() {
  const [toggleDrawer, useTroggleDawer] = useState(true);
  const [inputValue, setInputValue] = useState("");
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

  const [clientDetails, setClientDetails] = useState(null);

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

  const quantity = inputValue;
  const country = "Brasil";
  const taxIdentificationNumber = "123456";
  const returnUrl = "google.com";

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await abundanceService.getDetails(userInfo?.uid, id);
        setClientDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do cliente:", error);
      }
    }

    fetchDetails();
  }, [userInfo]);

  async function fetchBuyTree() {
    try {
      const response = await abundanceService.createPaymentTree(
        id,
        quantity,
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

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Remove não-numéricos usando uma expressão regular
    const numericValue = value.replace(/[^0-9]/g, "");

    setInputValue(numericValue);
  };

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
            <Grid
              item
              xs={10}
              container
              marginLeft={toggleDrawer ? "280px" : ""}
              alignItems="center"
            >
              <TextDefault color={"#4b4b4b"} size={"32px"}>
                Carbon Offset
                <h5>Overview</h5>
              </TextDefault>
              <br />

              <Header>
                <HeaderCard>
                  <br />
                  <InfoRounded style={{ fontSize: 48, color: "#089981" }} />
                  <br />
                  <br />
                  <TextDefault bold={100}> Subscription: </TextDefault>
                  <TextDefault>
                    {" "}
                    {clientDetails
                      ? clientDetails?.subscriptionPlan?.name
                      : "None"}{" "}
                  </TextDefault>
                  <br />
                  <TextDefault bold={100}> Status: </TextDefault>
                  <TextDefault>
                    {" "}
                    <StatusToTag
                      status={
                        clientDetails?.subscriptionPlan?.status === true
                          ? "true"
                          : "false"
                      }
                    />{" "}
                  </TextDefault>
                </HeaderCard>
                <HeaderCard>
                  <br />
                  <ForestIcon style={{ fontSize: 48, color: "#089981" }} />
                  <br />
                  <br />
                  <TextDefault bold={100}> Tree: </TextDefault>
                  <TextDefault>
                    {" "}
                    {clientDetails?.subscriptionPlan?.units
                      ? clientDetails?.subscriptionPlan?.units
                      : 0}{" "}
                    units{" "}
                  </TextDefault>
                  <br />
                  <TextDefault bold={100}> Bonus: </TextDefault>
                  <TextDefault>
                    {" "}
                    {clientDetails?.subscriptionPlan?.bonusUnits
                      ? clientDetails?.subscriptionPlan?.bonusUnits
                      : 0}{" "}
                    units{" "}
                  </TextDefault>
                </HeaderCard>
                <HeaderCard>
                  <br />
                  <img
                    src={CarbonCredit}
                    style={{ fontSize: 48, color: "#089981" }}
                    alt="Carbon credits"
                  />
                  <br />
                  <br />
                  <TextDefault bold={100}> Carbon: </TextDefault>
                  <TextDefault>
                    {" "}
                    {clientDetails?.subscriptionPlan?.tons
                      ? clientDetails?.subscriptionPlan?.tons
                      : 0}{" "}
                  </TextDefault>
                </HeaderCard>
                <HeaderCard>
                  <br />
                  <LeaderboardRounded
                    style={{ fontSize: 48, color: "#089981" }}
                  />
                  <br />
                  <br />
                  <TextDefault bold={100}>Potential in 2032: </TextDefault>
                  <TextDefault>
                    {" "}
                    {clientDetails?.subscriptionPlan?.tonsUntil2032
                      ? clientDetails?.subscriptionPlan?.tonsUntil2032
                      : 0}{" "}
                  </TextDefault>
                  <br />
                  <TextDefault bold={100}>Potential in 2052 </TextDefault>
                  <TextDefault>
                    {" "}
                    {clientDetails?.subscriptionPlan?.tonsUntil2052
                      ? clientDetails?.subscriptionPlan?.tonsUntil2052
                      : 0}
                  </TextDefault>
                </HeaderCard>
              </Header>

              <Footer>
                <Marketplace>
                  <Link to={"/carboncredit-plan"}>
                    <h2>Collaborate with carbon offsetting</h2>

                    <p>
                      Help combat carbon emissions by purchasing carbon credits
                      and contribute to a more sustainable planet
                    </p>

                    <Icons>
                      <ShoppingCart
                        style={{ color: "#fafafa", fontSize: 32 }}
                      />

                      <ArrowRightAltRounded
                        style={{ color: "#fafafa", fontSize: 32 }}
                      />
                    </Icons>
                  </Link>
                </Marketplace>

                <FootCard>
                  <header />

                  <div>
                    <h3>Certificate</h3>

                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been...
                    </p>

                    <button>Download</button>
                  </div>
                </FootCard>

                <FootCard>
                  <header />

                  <div>
                    <h3>Show your commitment</h3>

                    <p>
                      Promote your environmental contribution on your social
                      media....
                    </p>

                    <button>Download</button>
                  </div>
                </FootCard>
              </Footer>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
