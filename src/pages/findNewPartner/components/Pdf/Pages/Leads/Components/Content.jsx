import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LanguageOutlined } from "@mui/icons-material";
import FactoryIcon from "@mui/icons-material/Factory";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Table, Tag } from "antd";
import { publicIpv4 } from "public-ip";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "axios";

import {
  ContactInfo,
  Container,
  InRow,
  SearchButton,
  AllContainer,
} from "./styles";
import { TextDefault } from "../../../../../../../assets/styles";
import { authScreen } from "../../../../../../../contexts/auth";
import LoadingPage from "../../../../../../../components/LoadingPage";
import ModalList from "../../../../../../leadsEnrichment/components/modalList";
import getUserInfo from "../../../../../../../hooks/getUsers";
import { getAllDataHunter } from "../../../../../../../service/apiHunter";
import { SnovAllEmails } from "../../../../../../../service/Snov";
import Capitalize from "../../../../../../../utils/capitalize";

export default function Content({ url }) {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowSelected, setRowSelect] = useState([]);
  const [dataEmails, setDataEmails] = useState();
  const [companyLinkedin, setCompanyLinkedin] = useState();
  const [isLeadsLoading, setIsLeadsLoading] = useState(true);
  const [userIP, setUserIP] = useState("");
  const [userName, setUserName] = useState();
  const [allData, setAllData] = useState();
  const [phonesCompany, setPhonesCompany] = useState();

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
    fetchDataCompany();
    fetchPhoneCompany();
  }, [url]);

  async function fetchDataCompany() {
    setIsLeadsLoading(true);
    try {
      const limit = 10;
      const response = await getAllDataHunter(url, limit);

      setDataEmails(response.data);
      const arrayEmails = response?.data?.emails;
      const companiesWithKeys = arrayEmails.map((company, index) => ({
        ...company,
        key: index,
      }));
      setCompanyLinkedin(companiesWithKeys);

      const emails = companiesWithKeys.map((company) => `${company.value}`);
      const response2 = await SnovAllEmails(emails);

      const combinedResponse = response2.data.map((lead, index) => ({
        ...lead,
        ...companiesWithKeys[index],
      }));

      setAllData(combinedResponse);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLeadsLoading(false);
    }
  }

  const teste = "dental morelli";
  async function fetchPhoneCompany() {
    try {
      const response = await axios.post(
        "https://api.cufinder.io/v1/ntp",
        {
          apiKey: "5j5rnrAbllkY2zku98ophd49uNpxqUjMfCmSCx77",
          companyName: teste,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPhonesCompany(response.data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        const fullName = `${record.first_name} ${record.last_name}`;
        return fullName !== "null null" ? fullName : <em>Not Found</em>;
      },
      // filters: companyLinkedin?.map((item) => ({
      //   text: `${item.first_name} ${item.last_name}}`,
      //   value: `${item.first_name} ${item.last_name}}`,
      // })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        `${record.first_name} ${record.last_name}`.startsWith(value),
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "value",
    },
    {
      title: "Role",
      dataIndex: "position",
      render: (_, record) => {
        return record?.position ? record?.position : <em>Not found</em>;
      },
    },
    {
      title: "Linkedin",
      dataIndex: "linkedin",
      render: (_, record) => {
        console.log(record);

        return record?.success ? (
          <a href={record?.social[0]?.link} target="_blank" rel="noreferrer">
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
      render: (_, record) => {
        return Capitalize(record?.type);
      },
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

  return (
    <Container>
      {auth ? (
        <AllContainer>
          <Grid item xs={16} marginTop={3} container>
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <ContactInfo>
                  <div>
                    <FactoryIcon sx={{ color: "#17283E" }} />
                    <strong>Company Name: </strong>{" "}
                    <span>
                      {dataEmails?.organization != null ? (
                        dataEmails?.organization
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
                    <FmdGoodIcon sx={{ color: "#17283E" }} />
                    <strong>Address: </strong>
                    <span>
                      {" "}
                      {dataEmails?.country && dataEmails?.city != null ? (
                        `${dataEmails?.country}, ${dataEmails?.city}`
                      ) : (
                        <i>Not Found</i>
                      )}
                    </span>
                  </div>
                  <div style={{ gridColumn: "1/3" }}>
                    <InfoIcon sx={{ color: "#17283E" }} />
                    <strong>Description: </strong>{" "}
                    <span>
                      {" "}
                      {dataEmails?.industry != null ? (
                        dataEmails?.industry
                      ) : (
                        <i>Not Found</i>
                      )}{" "}
                      -{" "}
                      {dataEmails?.description != null ? (
                        dataEmails?.description
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>

                  <div>
                    <LocalPhoneIcon sx={{ color: "#17283E" }} />
                    <strong>Phone Number: </strong>
                    <span>
                      {phonesCompany?.phones.length > 0 ? (
                        phonesCompany?.phones.join(" | ")
                      ) : (
                        <i>Not Found</i>
                      )}
                    </span>
                  </div>
                </ContactInfo>
              </div>

              <Table
                columns={columns}
                dataSource={allData}
                pagination={false}
                style={{ width: "100%" }}
              />
            </>
          </Grid>
        </AllContainer>
      ) : (
        <LoadingPage />
      )}
    </Container>
  );
}
