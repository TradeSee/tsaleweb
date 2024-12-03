import React, { useEffect, useState } from "react";
import { Grid, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Table, Modal, Button, message } from "antd";
import Select from "react-select";

import { ContainerHome, GroupInput, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { authScreen } from "../../contexts/auth";
import LoadingPage from "../../components/LoadingPage";
import { getAllLogs } from "../../hooks/logsControl";
import ButtonBlue from "../../components/myButton";
import {
  FunctionActiveStatus,
  FunctionTestStatus,
  getFunctionStatus,
} from "../../hooks/controlFuncions";
import { Box, Divider } from "./styles";
import { addProductData } from "../../hooks/HsCodeList";
import getUserInfo from "../../hooks/getUsers";

const tradeOptions = [
  { value: "api", label: "API" },
  { value: "db", label: "Database" },
];

export default function LogsControlPage() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState(null);
  const [functionActive, setFunctionActive] = useState("");
  const [functionTest, setFunctionTest] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [hsName, setHsName] = useState("");

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  async function fetchFunctionStatus() {
    try {
      const snapshot = await getFunctionStatus();

      setFunctionActive(snapshot.val().ativo);
      setFunctionTest(snapshot.val().test);
    } catch (error) {
      console.error("Erro ao buscar status da função:", error);
    }
  }

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchFunctionStatus();

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

  const handleOpenModal = (rowDetails) => {
    setSelectedRowDetails(rowDetails);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRowDetails(null);
    setModalVisible(false);
  };

  useEffect(() => {
    getAllLogs()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Erro ao obter dados de Analytics:", error);
      });
  }, []);

  const convertToDate = (DateStr) => {
    const parts = DateStr.split(" ");
    const dateParts = parts[0].split("-");
    const hourParts = parts[1].split(":");
    return new Date(
      dateParts[2],
      dateParts[1] - 1,
      dateParts[0],
      hourParts[0],
      hourParts[1],
      hourParts[2]
    );
  };

  const removeRepeatedValues = (array) => {
    const group = new Set();
    const newArray = [];

    for (const obj of array) {
      // Verifica se o valor já existe no conjunto
      if (!group.has(obj.value)) {
        // Se não existir, adiciona ao conjunto e ao novo array
        group.add(obj.value);
        newArray.push(obj);
      }
    }

    return newArray;
  };

  const separatedIpSystem = Object.values(data)
    .filter((info) => info.ipSystem !== "" && typeof info.ipSystem === "string")
    .map((usr) => ({
      text: usr.ipSystem,
      value: usr.ipSystem,
    }));

  const separatedNames = Object.values(data)
    .filter((info) => info.user !== "" && typeof info.user === "string")
    .map((usr) => ({
      text: usr.user,
      value: usr.user,
    }));

  const separatedUid = Object.values(data)
    .filter((info) => info.userId !== "" && typeof info.userId === "string")
    .map((usr) => ({
      text: usr.userId,
      value: usr.userId,
    }));

  const separatedUserIp = Object.values(data)
    .filter((info) => info.userIp !== "" && typeof info.userIp === "string")
    .map((usr) => ({
      text: usr.userIp,
      value: usr.userIp,
    }));

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      defaultSortOrder: "descend",
      sorter: (a, b) => convertToDate(a.date) - convertToDate(b.date),
    },
    {
      title: "IP System",
      dataIndex: "ipSystem",
      key: "ipSystem",
      filters: removeRepeatedValues(separatedIpSystem),
      onFilter: (value, record) => record.ipSystem.indexOf(value) === 0,
    },
    {
      title: "NameAPI",
      dataIndex: "nameAPI",
      key: "nameAPI",
      filters: [
        {
          text: "List",
          value: "Global List",
        },
        {
          text: "Profile & Shipment",
          value: "Profile & Shipment",
        },
        {
          text: "Company Matcher",
          value: "Company Matcher",
        },
      ],
      onFilter: (value, record) => record.nameAPI.indexOf(value) === 0,
    },
    {
      title: "RouteAPI",
      dataIndex: "routeAPI",
      key: "routeAPI",
      filters: [
        {
          text: "Full Request",
          value: "/t-api/v1/full-request",
        },
        {
          text: "Full Data Companies",
          value: "/t-api/v1/fullDataCompanies",
        },
        {
          text: "Company Matcher",
          value: "/t-api/v1/company-matcher",
        },
      ],
      onFilter: (value, record) => record.routeAPI.indexOf(value) === 0,
    },
    { title: "Server", dataIndex: "server", key: "server" },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      filters: removeRepeatedValues(separatedNames),
      onFilter: (value, record) => record.user.indexOf(value) === 0,
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      filters: removeRepeatedValues(separatedUid),
      onFilter: (value, record) => record.userId.indexOf(value) === 0,
    },
    {
      title: "UserIp",
      dataIndex: "userIp",
      key: "userIp",
      filters: removeRepeatedValues(separatedUserIp),
      onFilter: (value, record) => record.userIp.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <a onClick={() => handleOpenModal(record)}>Open</a>
      ),
    },
  ];

  const myData = Object.values(data);

  function controlSelect(selected) {
    setFunctionActive(selected.value);
  }

  function controlSelectTest(selected) {
    setFunctionTest(selected.value);
  }

  function save() {
    if (functionActive === "api") {
      const text = "api";
      FunctionActiveStatus(text);
    } else {
      const text = "db";
      FunctionActiveStatus(text);
    }
  }

  function saveTest() {
    if (hsCode && hsName) {
      addProductData(hsCode, hsName);
      let successMessage = "Adicionado";
      message.success(successMessage);
      setHsName("");
      setHsCode("");
    } else {
      let errorMessage = "Ocorreu algum error";
      message.error(errorMessage);
    }
  }

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

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
      const roleUser = userInfo?.userData?.role;

      if (auth && roleUser !== "admin") {
        navigate("/home");
      }
    }
  }, [auth, userInfo]);

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid container spacing={2}>
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>

            <Grid item xs={toggleDrawer ? 10 : 11}>
              <div style={{ marginRight: 64, marginTop: 48 }}>
                <TextDefault
                  color={"#4b4b4b"}
                  size={"32px"}
                  style={{ marginTop: 40, marginBottom: 5 }}
                >
                  Logs Control
                </TextDefault>

                <Box>
                  <div className="searchType">
                    <GroupInput>
                      <span>
                        Actual Status Prod:{" "}
                        {functionActive === "db" ? "Database" : "API"}
                      </span>
                      <Select
                        placeholder="Production request type"
                        className="basic-select"
                        classNamePrefix="Select a country"
                        name="Function Control"
                        onChange={controlSelect}
                        defaultValue={tradeOptions.filter(
                          (option) => option.label === functionActive
                        )}
                        options={tradeOptions}
                        isSearchable
                        formatOptionLabel={(option) => (
                          <div>{option.label}</div>
                        )}
                      />
                      <ButtonBlue marginTop={"12px"} onClick={save}>
                        Save
                      </ButtonBlue>
                    </GroupInput>

                    <GroupInput style={{ position: "relative" }}>
                      <span>
                        Actual Status Test:{" "}
                        {functionTest === "db" ? "Database" : "API"}
                      </span>
                      <Select
                        placeholder="Test request type"
                        className="basic-select"
                        classNamePrefix="Select a country"
                        name="Function Control"
                        onChange={controlSelectTest}
                        defaultValue={tradeOptions.filter(
                          (option) => option.label === functionTest
                        )}
                        options={tradeOptions}
                        isSearchable
                        formatOptionLabel={(option) => (
                          <div>{option.label}</div>
                        )}
                      />
                      <ButtonBlue
                        style={{ position: "absolute", right: 0 }}
                        marginTop={"12px"}
                        onClick={saveTest}
                      >
                        Save
                      </ButtonBlue>
                    </GroupInput>
                  </div>

                  <Divider />

                  <GroupInput>
                    <div className="inputsContainer">
                      <div className="inputContainer">
                        <label htmlFor="hsCode">
                          <span>HsCode</span>
                        </label>
                        <br />
                        <input
                          type="text"
                          id="hsCode"
                          name="hsCode"
                          value={hsCode}
                          onChange={(e) => setHsCode(e.target.value)}
                        />
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="hsName">
                          <span>HsName</span>
                        </label>
                        <br />
                        <input
                          type="text"
                          id="hsName"
                          name="hsName"
                          value={hsName}
                          onChange={(e) => setHsName(e.target.value)}
                        />
                      </div>
                    </div>

                    <ButtonBlue marginTop={"12px"} onClick={saveTest}>
                      Save
                    </ButtonBlue>
                  </GroupInput>
                </Box>
                <br />

                <Table columns={columns} dataSource={myData} />
                <Modal
                  title="Details"
                  visible={modalVisible}
                  onCancel={handleCloseModal}
                  style={{ maxWidth: "800px" }}
                  width="80%"
                  bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}
                  footer={[
                    <Button key="close" onClick={handleCloseModal}>
                      Fechar
                    </Button>,
                  ]}
                >
                  {selectedRowDetails && (
                    <div>
                      <h3>- Location Ip System</h3>
                      <p>Area: {selectedRowDetails.locationIpSystem?.area}</p>
                      <p>City: {selectedRowDetails.locationIpSystem?.city}</p>
                      <p>
                        Country: {selectedRowDetails.locationIpSystem?.country}
                      </p>
                      <p>
                        Region: {selectedRowDetails.locationIpSystem?.region}
                      </p>
                      <p>
                        Timezone:{" "}
                        {selectedRowDetails.locationIpSystem?.timezone}
                      </p>
                      <p>
                        Ranges: {selectedRowDetails?.locationIpSystem?.range[0]}{" "}
                        | {selectedRowDetails?.locationIpSystem?.range[1]}
                      </p>
                      <p>
                        ll: {selectedRowDetails?.locationIpSystem?.ll[0]} |{" "}
                        {selectedRowDetails?.locationIpSystem?.ll[1]}
                      </p>
                      <hr />
                      <h3>- Request Body</h3>
                      <p>
                        Country:{" "}
                        {selectedRowDetails?.requestBody?.country || "-"}
                      </p>
                      <p>
                        HSCode: {selectedRowDetails?.requestBody?.hsCode || "-"}
                      </p>
                      <p>
                        Number Companies:{" "}
                        {selectedRowDetails?.requestBody?.nCompanies || "-"}
                      </p>
                      <p>
                        Role: {selectedRowDetails?.requestBody?.role || "-"}
                      </p>
                      <p>
                        Size Max: {selectedRowDetails?.requestBody?.sMax || "-"}
                      </p>
                      <p>
                        Size Min: {selectedRowDetails?.requestBody?.sMin || "-"}
                      </p>
                      <h3>- Status Request</h3>
                      <p>{selectedRowDetails.statusRequest}</p>
                    </div>
                  )}
                </Modal>
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
