import React, { useEffect, useState } from "react";
import {
  ColumnContainer,
  ContainerHome,
  TextDefault,
  RowContainer,
} from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../contexts/auth";
import LoadingPage from "../../components/LoadingPage";
import Card from "./assets/Card";
import FindIcon from "../../icons/companies.png";
import SimuIcon from "../../icons/port.png";
import MetalIcon from "../../icons/MetalPrice1.png";
import SustIcon from "../../icons/sustainIcon.png";
import SancIcon from "../../icons/Sanctions.png";
import getUserInfo from "../../hooks/getUsers";
import { getBySimulations } from "../../hooks/simulations";
import { getCompanieFavorite } from "../../hooks/findNewPartner";
import { getFavoriteMetals } from "../../hooks/metalPrice";
import ModalSavedMp from "./components/modal";
import { getCompliance } from "../../hooks/compliance";
import ModalCompliance from "./components/modalCompliance";
import { getSanction } from "../../hooks/sanction";

export default function SavedOperations() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  const [auth, setAuth] = useState(false);
  const [step, setStep] = useState(0);
  const [animatedStep, setAnimatedStep] = useState("staticStep");
  const [simulations, setSimulations] = useState("");
  const [companies, setCompanies] = useState("");
  const [metalPrice, setMetalPrice] = useState("");
  const [compliance, setCompliance] = useState("");
  const [sanction, setSanction] = useState("");

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

  const moveStepAnimation = (animation, step) => {
    //animation next = Direita para Esquerda
    //animation back = Esqueda pra direita
    //step = condicional da tela de exibição
    scrollTop();

    if (animation == "next") {
      setAnimatedStep("nextStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    } else {
      setAnimatedStep("backStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    }
  };

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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

  useEffect(() => {
    if (userInfo) {
      getBySimulations(userInfo.uid)
        .then((item) => {
          setSimulations(item || []);
        })
        .catch((error) => {
          console.error("Erro ao buscar as simulações:", error);
          setSimulations([]);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      getCompanieFavorite(userInfo.uid)
        .then((item) => {
          setCompanies(item || []);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setCompanies([]);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      getFavoriteMetals(userInfo.uid)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setMetalPrice(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setMetalPrice([]);
        });
    }
  }, [userInfo]);
  useEffect(() => {
    if (userInfo) {
      getCompliance(userInfo.uid)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setCompliance(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setCompliance([]);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      getSanction(userInfo.uid)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setSanction(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setSanction([]);
        });
    }
  }, [userInfo]);

  const totalLength = compliance?.length + sanction?.length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const OpenModalC = () => {
    setModalOpen(true);
  };

  const CloseModalC = () => {
    setModalOpen(false);
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
            <Grid item xs={toggleDrawer ? 10 : 11} container>
              <ModalSavedMp
                visible={isModalOpen}
                onCancel={CloseModal}
                userId={userInfo?.uid}
              />
              <ModalCompliance
                visible={modalOpen}
                onCancel={CloseModalC}
                userId={userInfo?.uid}
              />
              <Grid item xs={12}>
                <RowContainer
                  style={{ width: 55, position: "fixed", left: "5%", top: 40 }}
                >
                  <button
                    className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                    title="Go Back"
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: 0,
                      width: "100%",
                      justifyContent: "flex-start",
                      display: "flex",
                    }}
                    onClick={() => moveStepAnimation("back", step - 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50px"
                      height="50px"
                      viewBox="0 0 24 24"
                      className="stroke-blue-300"
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M11 6L5 12M5 12L11 18M5 12H19"
                      ></path>
                    </svg>
                  </button>
                </RowContainer>

                <ColumnContainer style={{ marginTop: 40 }}>
                  <TextDefault color={"#4b4b4b"} size={"32px"}>
                    Data Records
                  </TextDefault>
                  <TextDefault
                    color={"#8a97aa"}
                    size={"18px"}
                    bold={"400"}
                    style={{ marginTop: 10, width: "75%" }}
                  >
                    Here are all data records of the services available on the
                    platform.
                  </TextDefault>
                </ColumnContainer>

                <RowContainer style={{ marginTop: 50 }}>
                  <Grid item xs={2}>
                    <Card
                      src={FindIcon}
                      width={"300"}
                      height={"400px"}
                      value={companies?.length}
                      name={"Find New Partner"}
                      next={() => navigate("/saved-operations/fnp")}
                    />
                  </Grid>
                  <Grid item xs={2} style={{ marginLeft: 12 }}>
                    <Card
                      src={SimuIcon}
                      width={"300"}
                      height={"400px"}
                      value={simulations?.length}
                      name={"Simulation"}
                      next={() =>
                        navigate("/saved-operations/simu", {
                          state: {
                            simulations,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={2} style={{ marginLeft: 12 }}>
                    <Card
                      src={MetalIcon}
                      imgW={"130px"}
                      imgH={"150px"}
                      width={"300"}
                      height={"400px"}
                      value={metalPrice?.length}
                      name={"Metal Price"}
                      next={OpenModal}
                    />
                  </Grid>
                  <Grid item xs={2} style={{ marginLeft: 12 }}>
                    <Card
                      src={SustIcon}
                      width={"300"}
                      height={"400px"}
                      name={"Sustainability"}
                      next={() => navigate("/dashboard-sustainability")}
                    />
                  </Grid>
                  <Grid item xs={2} style={{ marginLeft: 12 }}>
                    <Card
                      src={SancIcon}
                      width={"300"}
                      height={"400px"}
                      name={"Compliance"}
                      value={totalLength}
                      next={OpenModalC}
                    />
                  </Grid>
                </RowContainer>
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
