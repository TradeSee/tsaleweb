import React, { useEffect, useState } from "react";
import {
  ContainerHome,
  TextDefault,
  IconServices,
  ColumnContainer,
} from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import ButtonBlue from "../../components/myButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SustainabilityImg from "../../icons/sustainIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { getIdCarbonCredit } from "../../hooks/carbonCredit";
import { abundanceService } from "../../service/apiAbund";
import getUserInfo from "../../hooks/getUsers";
import { authScreen } from "../../contexts/auth";

export default function CarbonCredit() {
  const [toggleDrawer, useTroggleDawer] = useState(true);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

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
    useTroggleDawer(state);
    console.log(state);
  }
  const [haveId, setHaveId] = useState("");
  const [token, setToken] = useState("");

  const [userInfo, setUserInfo] = useState(null);

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
    if (userInfo?.uid === "") {
      return;
    }
    async function fetchAbunId() {
      getIdCarbonCredit(userInfo?.uid)
        .then((res) => {
          setHaveId(res);
        })
        .catch((err) => console.log(err));
    }

    fetchAbunId();
  }, [userInfo]);

  async function fetchToken() {
    try {
      const response = await abundanceService.getToken(userInfo?.uid);
      console.log(response);
    } catch (error) {
      console.error("Erro ao gerar o token:", error);
    }
  }

  function pagina() {
    if (haveId) {
      fetchToken();
      navigate("/carboncredit-dashboard");
    } else {
      fetchToken();
      navigate("/carboncredit-plan");
    }
  }

  return (
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
        <Grid item xs={toggleDrawer ? 10 : 11} container alignItems="center">
          <Grid item xs={7}>
            <ColumnContainer style={{ marginLeft: 50 }}>
              <TextDefault color={"#4b4b4b"} size={"32px"}>
                Carbon Credit
              </TextDefault>
              <TextDefault
                color={"#8a97aa"}
                size={"18px"}
                bold={"400"}
                style={{ marginTop: 20, width: "75%" }}
              >
                Lorem Ipsum is simply dummy text of <br /> the printing and
                typesetting industry. <br />
                Lorem Ipsum has been the industry's <br />
                standard dummy...
              </TextDefault>

              <ButtonBlue width="250px" marginTop="50px" onClick={pagina}>
                Get started{" "}
                <ArrowForwardIcon
                  sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                />
              </ButtonBlue>
            </ColumnContainer>
          </Grid>
          <Grid item xs={4}>
            <IconServices iconUrl={SustainabilityImg} />
          </Grid>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}
