import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid } from "@mui/material";
import { Space, Table, Tag, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  Container,
  InRow,
  Mr8,
  SearchButton,
  OptionsContainer,
  HeaderFilter,
  MyCardContent,
} from "./style";
import country from "../utils/flag";
import { authScreen } from "../../../contexts/auth";
import getUserInfo from "../../../hooks/getUsers";
import LoadingPage from "../../../components/LoadingPage";
import Select from "react-select";
import { deleteListByName, getAllLists } from "../../../hooks/leads";
import { PopOver } from "../../../components/PopOver";
import ModalRenameList from "../components/modalRename";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { publicIpv4 } from "public-ip";
import { finderLink } from "../../../service/apiHunter";
import LinksTable from "../components/tableCompany";
import TableContact from "../components/tableContact";
import LoadingBar from "../../../components/PercentLoading";

function Option({ country }) {
  return (
    <div
      className="country-option"
      style={{ display: "flex", alignItems: "center" }}
    >
      <img src={country.src} alt={country.label} width={20} height={20} />
      <strong style={{ marginLeft: 12 }}>{country.label}</strong>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SearchLeads() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [listName, setListName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countrySel, setCountrySel] = useState("");
  const [lists, setLists] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListName, setSelectedListName] = useState("");
  const [userIP, setUserIP] = useState("");
  const [selectedInfo, setSelectedInfo] = useState(0);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    (async () => {
      setUserIP(await publicIpv4());
    })();
  }, []);

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

  function handleCompanyName(event) {
    setCompanyName(event.target.value);
  }

  const handleListName = (e) => {
    const { value } = e.target;
    setListName(value);
    if (value) {
      const filtered = lists.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(lists);
    }
  };

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleCountrySelect(selected) {
    setCountrySel(selected.value);
  }

  const handleSelectInfo = (event, newValue) => {
    if (newValue) {
      return setSelectedInfo(newValue);
    }

    setSelectedInfo((prevState) => (prevState === 0 ? 1 : 0));
  };

  function buscar() {
    if (selectedInfo === 0) {
      if (!companyName || !countrySel) {
        let errorMessage = "Please fill in the following fields:";
        if (!companyName) errorMessage += " Company Name -";
        if (!countrySel) errorMessage += " Country";

        message.error(errorMessage);
      } else {
        finderUrl();
      }
    } else if (selectedInfo === 1) {
      if (!companyName || !countrySel || !firstName || !lastName) {
        let errorMessage = "Please fill in the following fields:";
        if (!companyName) errorMessage += " Company Name";
        if (!firstName || !lastName) errorMessage += " First or Last name";
        if (!countrySel) errorMessage += " Country";

        message.error(errorMessage);
        return;
      } else {
        finderUrl();
      }
    }
  }

  async function fetchLists() {
    try {
      const listsData = await getAllLists(userInfo?.uid);
      setLists(listsData);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  }

  useEffect(() => {
    fetchLists();
  }, [auth, userInfo]);

  const handleDeleteClick = async (userId, listId) => {
    try {
      console.log(listId);
      const deleteSuccess = await deleteListByName(userId, listId);
      if (deleteSuccess) {
        let successMessage = "List deleted successfully!";
        message.success(successMessage);
        fetchLists();
      } else {
        let errorMessage = "Error when deleting list!";
        message.error(errorMessage);
      }
    } catch (error) {
      let errorMessage = "Error when deleting list!";
      message.error(errorMessage);
    }
  };

  const handleRename = (name) => {
    setSelectedListName(name);
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const columnsList = [
    {
      title: "List Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/leadsenrichment-listPage?name=${record.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Created on",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return formatDate(created_at);
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <PopOver.Root>
            <PopOver.Trigger>
              <MoreHorizIcon sx={{ cursor: "pointer" }} />
            </PopOver.Trigger>
            <PopOver.Content>
              <OptionsContainer>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(userInfo?.uid, record.name)}
                >
                  Delete
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRename(record.name)}
                >
                  Rename
                </p>
              </OptionsContainer>
            </PopOver.Content>
          </PopOver.Root>
        </Space>
      ),
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${year}`;
    return formattedDate;
  };

  async function finderUrl() {
    try {
      setLoadingLinks(true);
      const response = await finderLink(companyName, countrySel);
      setLinks(response);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setTimeout(() => setLoadingLinks(false), 2000);
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
            <>
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                marginLeft={toggleDrawer ? 35 : 10}
                marginTop={3}
                container
              >
                <TextDefault color={"#17283E"} bold={"700"} size={"34px"}>
                  Leads Enrichment
                </TextDefault>
                <MyCardContent>
                  <Tabs
                    value={selectedInfo}
                    onChange={handleSelectInfo}
                    aria-label="Filter by"
                    style={{
                      width: "98%",
                      borderBottom: "1px solid #d9d9d9",
                      marginTop: "8px",
                    }}
                  >
                    <Tab label="Search Company" {...allyProps(0)} />
                    <Tab label="Search Contact" {...allyProps(1)} />
                    <Tab label="Search List" {...allyProps(2)} />
                  </Tabs>

                  <CustomTabPanel value={selectedInfo} index={0}>
                    <HeaderFilter>
                      <Select
                        placeholder="Select the country"
                        className="basic-select"
                        classNamePrefix="Select a country"
                        name="Country"
                        defaultValue={countrySel}
                        onChange={handleCountrySelect}
                        value={country.country}
                        options={country}
                        isSearchable
                        formatOptionLabel={(country) => (
                          <Option country={country} />
                        )}
                      />
                      <input
                        type="text"
                        placeholder="Company Name*"
                        value={companyName}
                        onChange={handleCompanyName}
                      />
                      <SearchButton onClick={buscar}>Search</SearchButton>
                    </HeaderFilter>
                  </CustomTabPanel>
                  <CustomTabPanel value={selectedInfo} index={1}>
                    <HeaderFilter>
                      <Select
                        placeholder="Select the country"
                        className="basic-select"
                        classNamePrefix="Select a country"
                        name="Country"
                        defaultValue={countrySel}
                        onChange={handleCountrySelect}
                        value={country.country}
                        options={country}
                        isSearchable
                        formatOptionLabel={(country) => (
                          <Option country={country} />
                        )}
                      />
                      <InRow>
                        <input
                          type="text"
                          placeholder="First Name*"
                          value={firstName}
                          onChange={handleFirstName}
                        />
                        <input
                          type="text"
                          placeholder="Last Name*"
                          value={lastName}
                          onChange={handleLastName}
                        />
                        <Mr8 />

                        <input
                          type="text"
                          placeholder="Company name*"
                          value={companyName}
                          onChange={handleCompanyName}
                        />
                      </InRow>
                      <SearchButton onClick={buscar}>Search</SearchButton>
                    </HeaderFilter>
                  </CustomTabPanel>
                  <CustomTabPanel value={selectedInfo} index={2}>
                    <HeaderFilter>
                      <input
                        type="text"
                        placeholder="List Name"
                        value={listName}
                        onChange={handleListName}
                      />
                      <SearchButton onClick={buscar}>Search</SearchButton>
                    </HeaderFilter>
                  </CustomTabPanel>
                </MyCardContent>

                <Container>
                  <>
                    {loadingLinks && (
                      <div style={{ margin: "20px 0" }}>
                        <LoadingBar isLoading={loadingLinks} />
                      </div>
                    )}

                    {selectedInfo === 0 && !loadingLinks ? (
                      <LinksTable
                        data={links}
                        companyName={companyName}
                        userId={userInfo?.uid}
                        userName={userInfo?.userData?.name}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                </Container>
                <Container>
                  {selectedInfo === 1 && !loadingLinks ? (
                    <TableContact
                      data={links}
                      companyName={companyName}
                      userId={userInfo?.uid}
                      userName={userInfo?.userData?.name}
                      firstName={firstName}
                      lastName={lastName}
                    />
                  ) : (
                    <></>
                  )}
                </Container>

                {selectedInfo === 2 && (
                  <Container style={{ padding: "0 20px" }}>
                    <Table
                      columns={columnsList}
                      dataSource={
                        filteredData.length > 0 ? filteredData : lists
                      }
                    />
                  </Container>
                )}

                <ModalRenameList
                  visible={isModalOpen}
                  onCancel={CloseModal}
                  userId={userInfo?.uid}
                  listId={selectedListName}
                />
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
