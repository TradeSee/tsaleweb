import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageOutlined } from "@mui/icons-material";
import FactoryIcon from "@mui/icons-material/Factory";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { publicIpv4 } from "public-ip";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { ContactInfo, Container, InRow, SearchButton } from "./styles";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import { authScreen } from "../../../contexts/auth";
import Drawer from "../../../components/Drawer";
import LoadingPage from "../../../components/LoadingPage";
import ModalList from "../components/modalList";
import getUserInfo from "../../../hooks/getUsers";
import Spinner from "../../../components/Spinner";
import { HunterGetEmail } from "../../../service/apiHunter";

export default function ProfileContact({ url, name, finalName, isChildren }) {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCompany = searchParams.get("urlCompany");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataEmails, setDataEmails] = useState();
  const [isLeadsLoading, setIsLeadsLoading] = useState(true);
  const [userIP, setUserIP] = useState("");
  const [userName, setUserName] = useState();

  useEffect(() => {
    (async () => {
      setUserIP(await publicIpv4());
    })();
  }, []);

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

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const user = await getUserInfo();
          setUserName(user?.userData?.name);
          setUserInfo(user);
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
    if (userInfo !== null) {
      fetchDataCompany();
    }
  }, [userInfo]);

  async function fetchDataCompany() {
    setIsLeadsLoading(true);
    try {
      const response = await HunterGetEmail(
        urlCompany || url,
        firstName || name,
        lastName || finalName,
        userName,
        userInfo?.uid,
        userIP
      );

      setDataEmails(response.data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLeadsLoading(false);
    }
  }

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {!isChildren && (
              <Grid item xs={toggleDrawer ? 2 : 1}>
                <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
              </Grid>
            )}
            <>
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                marginLeft={toggleDrawer ? 35 : 10}
                marginTop={3}
                container
              >
                {isLeadsLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "88dvh",
                      width: "100%",
                      marginLeft: "50px",
                      marginTop: "50px",
                    }}
                  >
                    {<Spinner size={120} />}
                  </div>
                ) : (
                  <>
                    <Container>
                      <InRow>
                        <TextDefault
                          color={"#17283E"}
                          bold={"600"}
                          size={"20px"}
                        >
                          Profile Contact
                        </TextDefault>
                        <SearchButton
                          disabled={dataEmails?.email != null}
                          style={{
                            backgroundColor:
                              dataEmails?.email != null ? "#366DFB" : "#C4C4C4",
                            color: "#fff",
                          }}
                          onClick={() => {
                            OpenModal();
                          }}
                        >
                          Add to list{" "}
                          <AddIcon
                            sx={{ fontSize: "1rem", verticalAlign: "middle" }}
                          />
                        </SearchButton>
                      </InRow>
                    </Container>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 48,
                      }}
                    >
                      <ContactInfo
                        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
                      >
                        <div>
                          <AccountCircleIcon sx={{ color: "#17283E" }} />
                          <strong>Name:</strong>{" "}
                          <span>
                            {dataEmails?.first_name && dataEmails?.last_name ? (
                              `${dataEmails?.first_name} ${dataEmails?.last_name}`
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>

                        <div>
                          <FactoryIcon sx={{ color: "#17283E" }} />
                          <strong>Company Name: </strong>{" "}
                          <span>
                            {dataEmails?.company != null ? (
                              dataEmails?.company
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>
                        <div>
                          <LanguageOutlined sx={{ color: "#17283E" }} />
                          <strong>Company Website: </strong>{" "}
                          <span>
                            {" "}
                            {dataEmails?.domain != "Not Found" ? (
                              <a
                                href={
                                  dataEmails?.domain
                                    ? dataEmails?.domain
                                    : `https://${dataEmails?.domain}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {dataEmails?.domain}
                              </a>
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>

                        <div>
                          <ContactMailIcon sx={{ color: "#17283E" }} />
                          <strong>Email: </strong>
                          <span>
                            {dataEmails?.email != null ? (
                              dataEmails?.email
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>
                        <div>
                          <InfoIcon sx={{ color: "#17283E" }} />
                          <strong>Position: </strong>{" "}
                          <span>
                            {dataEmails?.position != null ? (
                              dataEmails?.position
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>

                        <div>
                          <LocalPhoneIcon sx={{ color: "#17283E" }} />
                          <strong>Phone Number: </strong>
                          <span>
                            {dataEmails?.phone_number != null ? (
                              dataEmails?.phone_number
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>
                        <div>
                          <LinkedInIcon sx={{ color: "#17283E" }} />
                          <strong>Linkedin: </strong>
                          <span>
                            {dataEmails?.linkedin_url != null ? (
                              dataEmails?.linkedin_url
                            ) : (
                              <i>Not Found</i>
                            )}
                          </span>
                        </div>
                      </ContactInfo>
                    </div>

                    <ModalList
                      visible={isModalOpen}
                      onCancel={CloseModal}
                      userId={userInfo?.uid}
                      infos={dataEmails}
                    />
                  </>
                )}
              </Grid>
            </>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
