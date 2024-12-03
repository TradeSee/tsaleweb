import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { authScreen } from "../../contexts/auth";
import getUserInfo from "../../hooks/getUsers";
import { stripeService } from "../../service/apiStripe";
import { Table, Empty } from "antd";
import CardDetails from "./components/cardDetails";
import ModalSaveCard from "./components/modalCard";
import axios from "axios";
import formatsDate from "../../utils/formats";
import { PaidStatusTag } from "../../utils/paidStatusTag";
import { BillingButton, CustomButton } from "./style";

export default function Billing() {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

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

  const goSubs = () => {
    navigate("/credits");
  };

  const NoDataComponent = () => (
    <>
      <Empty description={<span>No data</span>}></Empty>
      <BillingButton type="primary" onClick={goSubs}>
        Get subscription
      </BillingButton>
    </>
  );

  const [userInfo, setUserInfo] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setCustomerId(userData?.userData?.customerId);
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
    const TitlePage = "Billing";

    document.title = TitlePage;
  }, []);

  const [cardDetail, setCardDetail] = useState();

  async function fetchCustomerCards(customerId) {
    try {
      const response = await fetch(
        `https://api4242/api/customers/${customerId}/cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao obter os cartões do cliente");
      }

      const cards = await response.json();
      return cards;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchCard = async () => {
      if (userInfo) {
        fetchCustomerCards(userInfo?.userData?.customerId)
          .then((cards) => {
            setCardDetail(cards);
          })
          .catch((error) => {
            console.error("Erro ao obter os cartões do cliente:", error);
          });
      }
    };
    fetchCard();
  }, [userInfo]);

  async function createPortal() {
    if (customerId) {
      try {
        const response = await stripeService.createportal(customerId);
        const newWindow = window.open(response?.data?.url, "_blank");
        newWindow.focus();
      } catch (error) {
        console.error("Erro ao gerar o token:", error);
      }
    }
  }

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("https://api4242/invoices", {
          params: {
            customerId: userInfo?.userData?.customerId,
          },
        });
        setInvoices(response.data.invoices.data);
      } catch (error) {
        console.error("Erro ao buscar faturas:", error);
      }
    };

    fetchInvoices();
  }, [userInfo]);

  const columns = [
    {
      title: "Invoice Amout",
      dataIndex: "total",
      key: "total",
      render: (text) => formatarParaReal(text),
    },
    {
      title: "Payment Status",
      key: "status",
      dataIndex: "status",
      render: (text) => <PaidStatusTag status={text} />,
    },
    {
      title: "Date",
      dataIndex: "created",
      key: "created",
      render: (text) => formatsDate(text),
    },
    {
      title: "Invoice Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Download Invoice",
      dataIndex: "invoice_pdf",
      key: "invoice_pdf",
      render: (text, record) => {
        if (record.status === "open") {
          return (
            <>
              <a href={text}>Download</a>
              <a href={record?.hosted_invoice_url} target="_blank">
                {" | "}
                Pay now
              </a>
            </>
          );
        } else {
          return <a href={text}>Download</a>;
        }
      },
    },
  ];

  const handleAddCard = async () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function formatarParaReal(valor) {
    const valorEmDolares = (valor / 100).toFixed(2);

    return `US$${valorEmDolares.replace(".", ",")}`;
  }

  const info = {
    name: userInfo?.userData?.name,
    customerId: userInfo?.userData?.customerId,
    email: userInfo?.email,
    userId: userInfo?.uid,
  };

  const address = {
    city: userInfo?.userData?.address?.city,
    country: userInfo?.userData?.address?.country,
    line1: userInfo?.userData?.address?.line1,
    postalCode: userInfo?.userData?.address?.postalCode,
    state: userInfo?.userData?.address?.state,
  };

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            width={"100%"}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid
              sx={[
                {
                  marginLeft: "20px",
                  marginTop: "30px",
                },
                toggleDrawer
                  ? {
                      width: "70%",
                    }
                  : {
                      width: "85%",
                    },
              ]}
            >
              <TextDefault color={"#17283E"} size={"32px"} bold={"700"}>
                Billing
              </TextDefault>
              <br />
              <br />
              <TextDefault color={"#17283E"} size={"24px"} bold={"600"}>
                Wallet
              </TextDefault>
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextDefault color={"#17283E"} size={"18px"} bold={"500"}>
                  Saved Payment Methods
                </TextDefault>
                <div style={{ marginLeft: "auto", marginBottom: "8px" }}>
                  <CustomButton onClick={handleAddCard}>
                    Add new card
                  </CustomButton>
                </div>
              </div>
              <ModalSaveCard
                visible={modalVisible}
                onCancel={closeModal}
                info={info}
                address={address}
              />

              <CardDetails cards={cardDetail} />
              <br />
              <TextDefault color={"#17283E"} size={"24px"} bold={"600"}>
                Current Balance
              </TextDefault>
              <Table
                columns={columns}
                dataSource={invoices}
                locale={{ emptyText: <NoDataComponent /> }}
              />
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
