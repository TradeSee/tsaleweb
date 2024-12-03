import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid, Paper, Typography, styled } from "@mui/material";
import LoadingPage from "../../../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../../contexts/auth";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { getSustainabilityDataByUserId } from "../../../hooks/sustainability";
import CardsSustain from "../components/Cards";
import getUserInfo from "../../../hooks/getUsers";
import ThemeBar from "../components/ThemeBar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#14585b",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#cef9f5",
  },
}));

export default function DashboardSustainability() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [resGov, setResGov] = useState({});
  const [resSocial, setResSocial] = useState({});
  const [resMa, setResMa] = useState({});
  const [resDilig, setResDilig] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const data = await getSustainabilityDataByUserId(userInfo?.uid);
        setResGov(data?.resGov || []);
        setResSocial(data?.resSocial || []);
        setResMa(data?.resMa || []);
        setResDilig(data?.resDilig || []);
      } catch (error) {
        console.error("Erro ao verificar os dados de sustentabilidade:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);

  useEffect(() => {
    const soma =
      parseFloat(resGov?.result || 0) +
      parseFloat(resSocial?.result || 0) +
      parseFloat(resMa?.result || 0) +
      parseFloat(resDilig?.result || 0);

    setTotal(parseInt((soma / 152) * 100));
  }, [resGov, resSocial, resMa, resDilig]);

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
              sx={[
                {
                  marginLeft: "75px",
                  marginTop: "20px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
                toggleDrawer && {
                  paddingLeft: 8,
                },
              ]}
              xs={12}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  rowGap: 12,
                  width: "70%",
                  maxWidth: "1800px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextDefault
                  color={"#4B4B4B"}
                  size={"32px"}
                  style={{ gridRow: "1" }}
                >
                  {" "}
                  Sustainability
                </TextDefault>

                <Paper
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    backgroundColor: "#1AACAC",
                    padding: "20px",
                    color: "#fff",
                    gridRow: "2",
                    gridColumn: "1/-1",
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                  >
                    <Typography variant="h5">Your Score</Typography>
                    <Typography variant="body2">{total || "0"}%</Typography>
                  </Grid>

                  <BorderLinearProgress variant="determinate" value={total} />
                </Paper>

                <CardsSustain />

                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="#4B4B4B"
                  style={{ gridRow: 4, gridColumn: "1/-1" }}
                >
                  Select a category to proceed or change answers
                </Typography>

                <ThemeBar />
                <br />
              </div>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
