import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AssuredWorkloadOutlined,
  LanguageOutlined,
  LinkedIn,
  Mail,
  PhoneOutlined,
} from "@mui/icons-material";
import axios from "axios";

import { ContainerHome, TextDefault } from "../../../../../assets/styles";
import { Container } from "../../../search/style";
import { authScreen } from "../../../../../contexts/auth";

import Logo from "../../../../../icons/T-Logo.png";

import Drawer from "../../../../../components/Drawer";
import LoadingPage from "../../../../../components/LoadingPage";
import AllModal from "../../../../../components/AllModal";
import { ContactInfo, Header } from "./styles";
import Spinner from "../../../../../components/Spinner";

export default function LinkedinProfile() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(false);
  const [linkedin, setLinkedin] = useState();
  const [dataEmail, setDataEmail] = useState();
  const [isLeadsLoading, setIsLeadsLoading] = useState(true);

  const navigate = useNavigate();
  const { state } = useLocation();

  const contact = useMemo(() => {
    return {
      ...state,
    };
  }, [state]);

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
      fetchDataCompany();
    }
  }, [auth]);

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  async function fetchDataCompany() {
    setIsLeadsLoading(false);
    try {
      const response = await axios.post(
        //LinkedIn Profile URL Finder API
        "https://api.cufinder.io/v1/lpuf",
        {
          apiKey: "5j5rnrAbllkY2zku98ophd49uNpxqUjMfCmSCx77",
          personName: contact?.name,
          companyName: "t sale metals",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLinkedin(response.data);

      const response2 = await axios.post(
        "https://api.cufinder.io/v1/cone",
        {
          apiKey: "5j5rnrAbllkY2zku98ophd49uNpxqUjMfCmSCx77",
          linkedin: response.data?.url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDataEmail(response2.data);
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
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <AllModal
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              message={
                "Proceeding will consume 1 credit from your balance. Confirm?"
              }
              title={"View full data"}
              onConfirm={() =>
                navigate("/leads-enrichment-linkedin", {
                  state: selectedContact,
                })
              }
            />
            <>
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                marginLeft={toggleDrawer ? 35 : 10}
                marginTop={3}
                container
              >
                <TextDefault color={"#17283E"} bold={"700"} size={"34px"}>
                  Linkedin Enrichment
                </TextDefault>
                {isLeadsLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "90dvh",
                      width: "100dvw",
                    }}
                  >
                    {<Spinner size={120} />}
                  </div>
                ) : (
                  <Container>
                    <Header>
                      <img src={Logo} alt="Logo" />

                      <div className="head_title">
                        <h1>
                          {dataEmail?.first_name} {dataEmail?.last_name}
                        </h1>

                        <span>
                          {dataEmail?.job_title} at{" "}
                          {dataEmail?.job_company_name}
                        </span>
                      </div>
                    </Header>

                    <ContactInfo>
                      <div>
                        <LanguageOutlined sx={{ color: "#17283E" }} />
                        <strong>Company Website: </strong>{" "}
                        <span>
                          {contact?.companyName
                            .replace(/\s/g, "")
                            .toLowerCase()}
                          .com
                        </span>
                      </div>
                      <div>
                        <LinkedIn />
                        <strong>Linkedin: </strong> <span>{linkedin?.url}</span>
                      </div>
                      <div>
                        <PhoneOutlined sx={{ color: "#17283E" }} />
                        <strong>Phone: </strong>{" "}
                        {dataEmail?.phones.map((phones, index) => (
                          <span key={index}>
                            {phones}
                            {index !== dataEmail?.phones.length - 1 && (
                              <span>,&nbsp;&nbsp;</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <div>
                        <Mail />
                        <strong>Email: </strong>
                        {dataEmail?.emails.map((email, index) => (
                          <span key={index}>
                            {contact?.email}
                            {email}
                            {index !== dataEmail?.emails.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                      <div>
                        <AssuredWorkloadOutlined sx={{ color: "#17283E" }} />
                        <strong>Confidence Level: </strong>{" "}
                        <span>{dataEmail?.confidence_level}</span>
                      </div>
                      {/* <div>
                      <PublicOutlined sx={{ color: "#17283E" }} />
                      <strong>Add List: </strong>
                    </div> */}
                    </ContactInfo>
                  </Container>
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
