import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid } from "@mui/material";
import { authScreen } from "../../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import getUserInfo from "../../../hooks/getUsers";
import LoadingPage from "../../../components/LoadingPage";
import { Table, Tag } from "antd";
import { Container } from "../search/style";
import { useLocation } from "react-router-dom";
import { getUniqueList } from "../../../hooks/leads";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ContactInfo } from "../profileCompany/styles";
import { LanguageOutlined } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FactoryIcon from "@mui/icons-material/Factory";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ListPage() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [lists, setLists] = useState([]);
  const [data, setData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

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

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  useEffect(() => {
    async function fetchLists() {
      try {
        const listsData = await getUniqueList(userInfo?.uid, name);
        setCompanyInfo(listsData);
        setLists(Object.values(listsData));
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    }

    fetchLists();
  }, [auth, userInfo, name]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${year}`;
    return formattedDate;
  };

  const columnsList = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Linkedin",
      dataIndex: "linkedin",
      key: "linkedin",
      render: (_, record) => {
        return record.linkedin != "Not Found" ? (
          <a href={record.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon />
          </a>
        ) : (
          <em>Not found</em>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Confidence level",
      dataIndex: "confidence",
      render: (_, record) => {
        let color = "";
        if (record.confidence < 50) {
          color = "yellow";
        } else {
          color = "green";
        }
        return <Tag color={color}>{record.confidence}%</Tag>;
      },
    },
  ];

  useEffect(() => {
    if(lists.length > 0){
      const data = lists[0]
      ?.map((item) => ({
      key: item.id,
      name: `${item?.first_name}  ${item?.last_name}`,
      position: item?.position,
      linkedin: item?.success === true ? item?.social[0]?.link : "Not Found",
      type: item?.type,
      email: item?.value,
      confidence: item?.confidence,      
    }));
    setData(data)
  }
  }, [auth, lists]);


  const contactsQtd = data.length - 2;

  const created_at = lists[lists.length - 2];
  const formattedDate = companyInfo
    ? formatDate(companyInfo.created_at)
    : formatDate(created_at);

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
            <>
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                marginLeft={toggleDrawer ? 35 : 10}
                marginTop={3}
                container
              >
                <div>
                  <Link
                    to={`/leadsenrichment-search`}
                    style={{ textDecoration: "none" }}
                  >
                    <TextDefault color={"#969696"} bold={"400"} size={"12px"}>
                      <KeyboardBackspaceIcon
                        sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                      />{" "}
                      Back to lists
                    </TextDefault>
                  </Link>
                  <br />
                  <br />

                  <TextDefault color={"#17283E"} bold={"700"} size={"34px"}>
                    {name}
                  </TextDefault>
                  <br />
                  <TextDefault color={"#969696"} bold={"400"} size={"16px"}>
                    Created on {formattedDate}
                  </TextDefault>
                  <br />
                  <br />
                  {companyInfo && companyInfo.description ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 48,
                        }}
                      >
                        <ContactInfo>
                          <div>
                            <FactoryIcon sx={{ color: "#17283E" }} />
                            <strong>Company Name: </strong>{" "}
                            <span>
                              {companyInfo?.name != "Not Found" ? (
                                companyInfo?.name
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
                              {companyInfo?.domain != "Not Found" ? (
                                <a
                                  href={
                                    companyInfo?.domain.startsWith("http")
                                      ? companyInfo?.domain
                                      : `https://${companyInfo?.domain}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {companyInfo?.domain}
                                </a>
                              ) : (
                                <i>Not Found</i>
                              )}
                            </span>
                          </div>
                          <div>
                            <FmdGoodIcon sx={{ color: "#17283E" }} />
                            <strong>Address: </strong>
                            <span>
                              {" "}
                              {companyInfo?.country &&
                              companyInfo?.city != null ? (
                                `${companyInfo?.country}, ${companyInfo?.city}`
                              ) : (
                                <i>Not Found</i>
                              )}
                            </span>
                          </div>
                          <div>
                            <HelpCenterIcon sx={{ color: "#17283E" }} />
                            <strong>Industry: </strong>{" "}
                            <span>
                              {" "}
                              {companyInfo?.industry != null ? (
                                companyInfo?.industry
                              ) : (
                                <i>Not Found</i>
                              )}
                            </span>
                          </div>

                          <div>
                            <InfoIcon sx={{ color: "#17283E" }} />
                            <strong>Description: </strong>
                            <span>
                              {" "}
                              {companyInfo?.description != null ? (
                                companyInfo?.description
                              ) : (
                                <i>Not Found</i>
                              )}
                            </span>
                          </div>
                        </ContactInfo>
                      </div>
                      <TextDefault color={"#17283E"} bold={"600"} size={"18px"}>
                        {contactsQtd} contacts
                      </TextDefault>
                    </>
                  ) : (
                    <TextDefault color={"#17283E"} bold={"600"} size={"18px"}>
                      {data.length - 2} contacts
                    </TextDefault>
                  )}
                </div>

                <Container>
                  <Table columns={columnsList} dataSource={data} />
                </Container>
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
