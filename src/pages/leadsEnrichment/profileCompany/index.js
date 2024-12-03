import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageOutlined } from "@mui/icons-material";
import FactoryIcon from "@mui/icons-material/Factory";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Table, Tag } from "antd";
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
import {
  createCompanyList,
  saveDataToList,
  saveOneDataToList,
} from "../../../hooks/leads";
import { getAllDataHunter } from "../../../service/apiHunter";
import { SnovAllEmails } from "../../../service/Snov";
import Capitalize from "../../../utils/capitalize";
import axios from "axios";
import filterLeadsDB from "../../../hooks/filterLeadsDB";
import LoadingBar from "../../../components/PercentLoading";

export default function ProfileCompany({ nameCompany, url, isChildren, companyId }) {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get("companyName");
  const urlCompany = searchParams.get("urlCompany");
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
  const [limit, setLimit] = useState(10);

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
      fetchPhoneCompany();
    }
  }, [userInfo, limit]);

  async function fetchDataCompany() {
    setIsLeadsLoading(true);
    try {    
      let response = await filterLeadsDB(urlCompany || url, companyId);
      
      if (!response) {
        response = await getAllDataHunter(companyId || "none", urlCompany || url, limit);
        console.log("dentro if", response)
      setDataEmails(response?.data);
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
      } else {

        
        setDataEmails(response);
        const arrayEmails = response?.emails;
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
    }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLeadsLoading(false);
    }
  }

  const loadMoreData = () => {
    setLimit(limit + 10);
    fetchDataCompany();
  };

  async function fetchPhoneCompany() {
    try {
      const response = await axios.post(
        "https://api.cufinder.io/v1/ntp",
        {
          apiKey: "5j5rnrAbllkY2zku98ophd49uNpxqUjMfCmSCx77",
          companyName: companyName,
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

  const onSelectChange = (newSelectedRowKeys) => {
    const selectedData = newSelectedRowKeys.map((key) => {
      return companyLinkedin.find((item) => item.key === key);
    });
    setSelectedRowKeys(newSelectedRowKeys);
    const combinedData = selectedData.map((item) => ({
      ...item,
    }));
    setRowSelect(combinedData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  const companyDatasSave = {
    name: dataEmails?.organization,
    description: dataEmails?.description,
    domain: dataEmails?.domain,
    city: dataEmails?.city,
    country: dataEmails?.country,
  };

  const handleClickCreate = async () => {
    try {
      const newListName = await createCompanyList(
        userInfo?.uid,
        companyName || nameCompany,
        companyDatasSave
      );

      await saveOneDataToList(userInfo?.uid, newListName, allData);

      console.log("Dados salvos com sucesso na lista:", newListName);
    } catch (error) {
      console.error("Erro ao criar lista e salvar dados:", error);
    }
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
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    {<LoadingBar isLoading={isLeadsLoading} />}

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
                          Profile Company
                        </TextDefault>
                        <SearchButton
                          style={{
                            backgroundColor: "#366DFB",
                            color: "#fff",
                          }}
                          onClick={handleClickCreate}
                        >
                          Save profile
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
                      <ContactInfo>
                        <div>
                          <FactoryIcon sx={{ color: "#17283E" }} />
                          <strong>Company Name: </strong>{" "}
                          <span>
                            {dataEmails?.organization  || dataEmails?.name  != null ? (
                              dataEmails?.organization || dataEmails?.name 
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
                                href={`https://${dataEmails?.domain}`}
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

                    <Container>
                      <hr />
                      <InRow>
                        <TextDefault
                          color={"#17283E"}
                          bold={"600"}
                          size={"20px"}
                        >
                          Contact Leads
                        </TextDefault>
                        <SearchButton
                          disabled={!selectedRowKeys.length}
                          style={{
                            backgroundColor: selectedRowKeys.length
                              ? "#366DFB"
                              : "#C4C4C4",
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
                      <br />
                      <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={allData}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        <SearchButton
                          disabled={allData?.length < 9}
                          style={{
                            backgroundColor:
                              allData?.length < 9 ? "#C4C4C4" : "#366DFB",
                            color: "#fff",
                          }}
                          onClick={loadMoreData}
                        >
                          Load More
                        </SearchButton>
                      </div>
                      <ModalList
                        visible={isModalOpen}
                        onCancel={CloseModal}
                        userId={userInfo?.uid}
                        infos={rowSelected}
                      />
                    </Container>
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
