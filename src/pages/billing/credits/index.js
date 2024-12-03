import React, { useEffect, useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled, { ThemeContext } from "styled-components";
import {
  CheckCircleOutline,
  East,
  ErrorOutline,
  History,
  ShoppingCart,
} from "@mui/icons-material";
import { format, isAfter, subDays } from "date-fns";
import { Space, Table as TableHistory } from "antd";
import axios from "axios";

import getUserInfo, { getHistoryCredits } from "../../../hooks/getUsers";
import { viewCredit } from "../../../hooks/credits";

import { authScreen } from "../../../contexts/auth";
import Cart from "./assets/cart";
import CreditsPrice from "./assets/CreditsPrices";
import PlansPrice from "./assets/PlansPrices";
import Benefits from "./assets/Benefits";

import { ContainerHome, TextDefault } from "../../../assets/styles";
import {
  ActualPlan,
  BuyContainer,
  Checkout,
  Container,
  FilterButton,
  Header,
  HistoryContainer,
  PeriodButton,
  PlansBenefits,
  PlansContainer,
  Table,
} from "./styles";

import Drawer from "../../../components/Drawer";
import LoadingPage from "../../../components/LoadingPage";
import PurchaseModalCredits from "../components/Modal";
import PurchaseModal from "../components/purchaseModal";
import Spinner from "../../../components/Spinner";
import { PopOver } from "../../../components/PopOver";
import { OptionsContainer } from "../../leadsEnrichment/search/style";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { stripeService } from "../../../service/apiStripe";
import ModalCancelSubs from "./modalCancel";

const stripePromise = loadStripe(
  "a"
);

const StyledTable = styled(TableHistory)`
  .ant-table-tbody > tr > td {
    padding: 0px;
    padding-left: 20px;
    height: 5px;
  }
`;

const Credits = () => {
  const theme = useContext(ThemeContext);

  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblePlan, setModalVisiblePlan] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);

  const [filter, setFilter] = useState(0);
  const [priceId, setPriceId] = useState("price_1OzHSRJcSI08Gr0KDBth9uWf");
  const [historyC, setHistoryC] = useState([]);
  const [cardDetail, setCardDetail] = useState();
  const [allCards, setAllCards] = useState();
  const [payValue, setPayValue] = useState();
  const [isBuying, setIsBuying] = useState(false);
  const [periodSelected, setPeriodSelected] = useState("monthly");
  const [creditsSelected, setCreditsSelected] = useState("100");
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({
    planName: "Trade Data",
    type: "monthly",
    pay: 199,
    credits: "100",
    priceId: "price_1OzHSRJcSI08Gr0KDBth9uWf",
  });

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const navigate = useNavigate();

  const closeModalCancel = () => {
    setModalCancel(false);
  };

  useEffect(() => {
    const TitlePage = "Subscription";

    document.title = TitlePage;
  }, []);

  useEffect(() => {
    if (userInfo) {
      const fetchCredits = async () => {
        try {
          const userCredits = await viewCredit(userInfo?.uid);
          setCredits(userCredits);
        } catch (error) {
          console.error("Erro ao buscar os créditos do usuário:", error);
        }
      };

      getHistoryCredits(userInfo?.uid)
        .then((dados) => {
          if (dados) {
            const historyArray = Object.values(dados);
            setHistoryC(historyArray);
          } else {
            setHistoryC(["No history"]);
          }
        })
        .catch((error) => {
          console.error("Erro ao verificar os dados do histórico:", error);
        });

      fetchCredits();
    }
  }, [userInfo]);

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

  const filteredCredits = useMemo(
    () =>
      historyC.filter((credits) => {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

        if (regex.test(credits.date)) {
          if (filter !== 0) {
            const actualDate = new Date();
            const expenseDate = new Date(credits.date);

            const limitDate = subDays(actualDate, filter);

            const filteredDate = isAfter(expenseDate, limitDate);

            return filteredDate;
          }

          return credits;
        }

        return null;
      }),
    [filter, historyC]
  );

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  function handleGoBack() {
    window.history.back();
  }

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
      setAllCards(cards);
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
            setCardDetail(cards[0]?.id);
          })
          .catch((error) => {
            console.error("Erro ao obter os cartões do cliente:", error);
          });
      }
    };
    fetchCard();
  }, [userInfo]);

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
  const cardId = cardDetail;

  function getClientSecret(pay, credits) {
    fetch("https://api4242/payment-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, pay, address }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // if (data.status === "succeeded") {
        //   setIsBuying(false);
        //   const stateData = {
        //     userId: userInfo?.uid,
        //     credits: credits,
        //   };
        //   const stateParam = encodeURIComponent(JSON.stringify(stateData));

        //   window.open(
        //     `https://api3000/successCredits?state=${stateParam}`,
        //     "_self"
        //   );
        // }
      })
      .catch((error) => {
        console.error("Erro ao obter o clientSecret:", error);
      });
  }

  function getClientSecretPlan() {
    fetch("https://api4242/create-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, priceId, address }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // if (cardId && data.status === "active") {
        //   setIsBuying(false);

        //   const stateData = {
        //     userId: userInfo?.uid,
        //     credits: creditsPlan,
        //     priceId: priceId,
        //   };

        //   const stateParam = encodeURIComponent(JSON.stringify(stateData));

        //   window.open(
        //     `https://api3000/success?state=${stateParam}`,
        //     "_self"
        //   );
        // }
      })
      .catch((error) => {
        console.error("Erro ao obter o clientSecret:", error);
      });
  }

  const subscriptionId = subscriptions[0]?.id;

  async function handlePurchaseClick(pay, credits) {
    await getClientSecret(pay, credits);
    setPayValue(pay);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  async function handlePurchaseClickPlan() {
    await getClientSecretPlan(priceId);
    setModalVisiblePlan(true);
  }

  function closeModalPlan() {
    setModalVisiblePlan(false);
  }

  function FormatDate(date) {
    const correctDate = new Date(date);

    return format(correctDate, "MMM dd, yyyy");
  }

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(
          "https://api4242/subscription-active",
          {
            params: {
              customerId: userInfo?.userData?.customerId,
            },
          }
        );
        setSubscriptions(response.data.subscriptions.data);
      } catch (error) {
        console.error("Erro ao buscar faturas:", error);
      }
    };

    fetchSubscription();
  }, [userInfo]);

  function formattedStartDate(startTimestamp) {
    const startDate = new Date(startTimestamp);

    return `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
  }

  function obterNomeDoPlano(priceId) {
    switch (priceId) {
      case "price_1OzHSRJcSI08Gr0KDBth9uWf": // 100 creditos mês
        return "Trade Data Monthly";
      case "price_1OzHSgJcSI08Gr0K9D6lV0Uh": // 200 creditos mês
        return "Trade Data Monthly";
      case "price_1OzHSlJcSI08Gr0KK3ZbnrrI": // 500 creditos mês
        return "Trade Data Monthly";
      case "price_1OzHSpJcSI08Gr0K7nBDzSsh": // 100 creditos ano
        return "Trade Data Yearly";
      case "price_1OzHStJcSI08Gr0KFoVWoteD": // 200 creditos ano
        return "Trade Data Yearly";
      case "price_1OzHSwJcSI08Gr0KrQMeLKJR": // 500 creditos ano
        return "Trade Data Yearly";
      default:
        return "No plan";
    }
  }

  const priceToCredits = {
    price_1OzHSRJcSI08Gr0KDBth9uWf: 100,
    price_1OzHSpJcSI08Gr0K7nBDzSsh: 100,
    price_1OzHSgJcSI08Gr0K9D6lV0Uh: 200,
    price_1OzHStJcSI08Gr0KFoVWoteD: 200,
    price_1OzHSlJcSI08Gr0KK3ZbnrrI: 500,
    price_1OzHSwJcSI08Gr0KrQMeLKJR: 500,
  };

  // pegar o valor dos credits com base no priceId
  function getCreditsFromPriceId(priceId) {
    return priceToCredits[priceId] || 0;
  }

  const creditsFromPriceId = getCreditsFromPriceId(priceId);

  const creditsPlan = creditsFromPriceId;

  async function handleSelectedPlan(credits, period) {
    const planSelected = PlansPrice.filter(
      (plan) =>
        plan.credits === credits &&
        plan.type.toLowerCase() === period.toLowerCase()
    );

    setCreditsSelected(credits);
    setPeriodSelected(period);
    setSelectedPlan(planSelected[0]);
    setPriceId(planSelected[0].priceId);
  }

  const ordenateDate = (data1, data2) => {
    const date1 = new Date(data1);
    const date2 = new Date(data2);

    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  };

  async function createPortal() {
    if (userInfo) {
      try {
        const response = await stripeService.createportal(
          userInfo?.userData?.customerId
        );
        const newWindow = window.open(response?.data?.url, "_blank");
        newWindow.focus();
      } catch (error) {
        console.error("Erro ao gerar o token:", error);
      }
    }
  }

  const OpenModalCancel = async () => {
    setModalCancel(true);
  };

  const valorEmDolar = selectedPlan.pay.toFixed(2) * 12;
  const valorFormatado = valorEmDolar.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

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
              xs={toggleDrawer ? 9 : 10}
              marginTop="48px"
              position={"relative"}
            >
              <TextDefault color={theme.colors.gray[800]} size={"32px"}>
                <ArrowBackIcon
                  onClick={handleGoBack}
                  style={{
                    cursor: "pointer",
                  }}
                />{" "}
                Subscription
              </TextDefault>

              {isBuying === true ? (
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
                  <Spinner size={90} />
                </div>
              ) : (
                <>
                  <Container>
                    {subscriptions.length <= 0 && (
                      <div className="noPlan">
                        <ErrorOutline />
                        <h4>
                          It seems you don't have any subscription. Set your
                          plan and start now!
                        </h4>
                      </div>
                    )}

                    <BuyContainer style={{ gridRow: 2 }}>
                      <PlansContainer>
                        <div className="headPlan">
                          <h2>Trade Date Plan</h2>
                          <span>Web & Mobile</span>
                        </div>

                        <PlansBenefits>
                          <div>
                            <h3>Company Data</h3>

                            {Benefits.CompanyData.subcategorias.map((sub) => (
                              <p key={sub.titulo}>
                                <CheckCircleOutline
                                  sx={{
                                    fontSize: 16,
                                    color: `${theme.colors.main[500]}`,
                                  }}
                                />{" "}
                                {sub.titulo}
                              </p>
                            ))}
                          </div>
                          <div>
                            <h3>Enrichment leads</h3>

                            {Benefits.EnrichmentLeads.subcategorias.map(
                              (sub) => (
                                <p key={sub.titulo}>
                                  <CheckCircleOutline
                                    sx={{
                                      fontSize: 16,
                                      color: `${theme.colors.main[500]}`,
                                    }}
                                  />{" "}
                                  {sub.titulo}
                                </p>
                              )
                            )}
                          </div>
                          <div>
                            <h3>Market Intelligence</h3>

                            {Benefits.MarketIntelligence.subcategorias.map(
                              (sub) => (
                                <p key={sub.titulo}>
                                  <CheckCircleOutline
                                    sx={{
                                      fontSize: 16,
                                      color: `${theme.colors.main[500]}`,
                                    }}
                                  />{" "}
                                  {sub.titulo}
                                </p>
                              )
                            )}
                          </div>
                        </PlansBenefits>
                      </PlansContainer>
                    </BuyContainer>

                    <Checkout style={{ gridRow: 2 }}>
                      <div className="period">
                        <PeriodButton
                          className="monthly"
                          isActive={periodSelected === "monthly"}
                          onClick={() =>
                            handleSelectedPlan(creditsSelected, "monthly")
                          }
                        >
                          Monthly
                        </PeriodButton>

                        <PeriodButton
                          className="annual"
                          isActive={periodSelected === "annual"}
                          onClick={() =>
                            handleSelectedPlan(creditsSelected, "annual")
                          }
                        >
                          Annual
                        </PeriodButton>
                      </div>

                      <div className="planData">
                        <h2>Trade Data</h2>

                        <select
                          className="headSelect"
                          onChange={(e) =>
                            handleSelectedPlan(e.target.value, periodSelected)
                          }
                        >
                          <option value={"100"}>100 Credits</option>
                          <option value={"200"}>200 Credits</option>
                          <option value={"500"}>500 Credits</option>
                        </select>

                        <span>
                          <CheckCircleOutline
                            sx={{
                              fontSize: 16,
                              color: `${theme.colors.main[500]}`,
                            }}
                          />{" "}
                          Web & Mobile
                        </span>
                        <span>
                          <CheckCircleOutline
                            sx={{
                              fontSize: 16,
                              color: `${theme.colors.main[500]}`,
                            }}
                          />{" "}
                          Market Intelligence
                        </span>
                        <span>
                          <CheckCircleOutline
                            sx={{
                              fontSize: 16,
                              color: `${theme.colors.main[500]}`,
                            }}
                          />{" "}
                          Enrichment Leads
                        </span>

                        <p>{selectedPlan.credits} Credits/month</p>
                        <TextDefault size={"20px"}>
                          US$ {selectedPlan.pay}/month
                        </TextDefault>
                        <TextDefault
                          color={`#454343`}
                          size={"14px"}
                          bold={"300"}
                        >
                          Total: US$ {valorFormatado}/year
                        </TextDefault>
                      </div>
                      <br />

                      <button
                        onClick={handlePurchaseClickPlan}
                        className="checkoutBtn"
                      >
                        Check Out{" "}
                        <ShoppingCart
                          sx={{
                            fontSize: 24,
                            color: "#fff",
                          }}
                        />
                      </button>
                    </Checkout>

                    <ActualPlan>
                      {subscriptions.map((subs) => (
                        <>
                          <div className="PlanTitle">
                            <h3>Currently Subscription</h3>
                            <h3 style={{ justifySelf: "center" }}>
                              Start Date
                            </h3>
                            <h3 style={{ justifySelf: "center" }}>End Date</h3>
                            <div />
                          </div>

                          <div className="planInfo">
                            <span>
                              <h2>{obterNomeDoPlano(subs.plan.id)}</h2>
                              <small>100 Credits / month</small>
                            </span>
                            <span style={{ justifySelf: "center" }}>
                              <span>
                                {" "}
                                {formattedStartDate(
                                  subs.current_period_start * 1000
                                )}
                              </span>
                            </span>
                            <span style={{ justifySelf: "center" }}>
                              <span>
                                {" "}
                                {formattedStartDate(
                                  subs.current_period_end * 1000
                                )}
                              </span>
                            </span>
                            <span style={{ justifySelf: "end" }}>
                              <Space size="middle">
                                <PopOver.Root>
                                  <PopOver.Trigger>
                                    <MoreHorizIcon sx={{ cursor: "pointer" }} />
                                  </PopOver.Trigger>
                                  <PopOver.Content>
                                    <OptionsContainer>
                                      <p
                                        style={{ cursor: "pointer" }}
                                        onClick={createPortal}
                                      >
                                        Upgrade/Downgrade
                                      </p>
                                      <p
                                        style={{ cursor: "pointer" }}
                                        onClick={OpenModalCancel}
                                      >
                                        Cancel Subscription
                                      </p>
                                    </OptionsContainer>
                                  </PopOver.Content>
                                </PopOver.Root>
                              </Space>
                            </span>
                          </div>
                        </>
                      ))}
                      <ModalCancelSubs
                        visible={modalCancel}
                        onCancel={closeModalCancel}
                        subscriptionId={subscriptionId}
                        customerId={userInfo?.userData?.customerId}
                        userId={userInfo?.uid}
                      />
                    </ActualPlan>

                    <Header>
                      <div className="desc">
                        <Cart />
                        <div>
                          <h2>
                            {subscriptions.length > 0
                              ? "T-Sale Metals Credits"
                              : "Usage Credits"}
                          </h2>
                          <small>
                            {subscriptions.length <= 0
                              ? "You need a plan to buy credits"
                              : " Easily replenish your current balance as needed"}
                          </small>
                        </div>
                      </div>
                      <div className="creditQty">
                        <span>Your balance</span>
                        <h3>
                          {credits} {credits === 1 ? "Credit" : "Credits"}
                        </h3>
                      </div>
                    </Header>

                    {subscriptions.length > 0 && (
                      <BuyContainer
                        style={{
                          marginBottom: 24,
                          gridColumn: "1/-1",
                        }}
                      >
                        <Header>
                          <div className="desc">
                            <Cart />
                            <div>
                              <h2>T-Sale Metals Credits</h2>
                              <small></small>
                            </div>
                          </div>
                          <div className="creditQty">
                            <span>Your balance</span>
                            <h3>
                              {credits} {credits === 1 ? "Credit" : "Credits"}
                            </h3>
                          </div>
                        </Header>

                        <Table>
                          <tr className="head">
                            <th>Credits amount</th>
                            <th>Unit price</th>
                            <th>Total price</th>
                            <th></th>
                          </tr>
                          {CreditsPrice.map((credit) => (
                            <tr key={credit.credits}>
                              <td>{credit.credits} Credits</td>
                              <td>US$ {credit.unitPrice}</td>
                              <td>US$ {credit.pay}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    handlePurchaseClick(
                                      credit.pay,
                                      credit.credits
                                    )
                                  }
                                >
                                  Buy <East />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </Table>
                      </BuyContainer>
                    )}

                    <HistoryContainer style={{ gridRow: 5 }}>
                      <header>
                        <span>
                          <History />
                          <h4>Usage Credits</h4>
                        </span>

                        <div>
                          <FilterButton
                            onClick={() => setFilter(0)}
                            isFilterSelected={filter === 0}
                          >
                            <p>All</p>
                          </FilterButton>

                          <FilterButton
                            onClick={() => setFilter(7)}
                            isFilterSelected={filter === 7}
                          >
                            <p>Last 7 days</p>
                          </FilterButton>
                          <FilterButton
                            onClick={() => setFilter(15)}
                            isFilterSelected={filter === 15}
                          >
                            <p>Last 15 days</p>
                          </FilterButton>
                          <FilterButton
                            onClick={() => setFilter(30)}
                            isFilterSelected={filter === 30}
                          >
                            <p>Last 30 days</p>
                          </FilterButton>
                        </div>
                      </header>

                      <StyledTable
                        dataSource={filteredCredits}
                        columns={[
                          {
                            dataIndex: "date",
                            key: "date",
                            title: "Date",
                            flex: 1,
                            editable: false,
                            render: (_, record) => `${FormatDate(record.date)}`,
                            defaultSortOrder: "descend",
                            sorter: (a, b) => ordenateDate(a.date, b.date),
                          },
                          {
                            dataIndex: "text",
                            title: "Activities",
                            flex: 1,
                            editable: false,
                          },
                          {
                            dataIndex: "credits",
                            title: "Credits",
                            flex: 1,
                            editable: false,
                            render: (_, record) => {
                              const sign =
                                record.type === "increase" ? "+" : "-";
                              const styleText =
                                record.type === "increase"
                                  ? { color: `${theme.colors.sucess.main}` }
                                  : { color: `${theme.colors.danger.main}` };
                              return (
                                <p style={{ fontWeight: "bold", ...styleText }}>
                                  {sign}
                                  {record.credits}
                                </p>
                              );
                            },
                          },
                        ]}
                      />
                    </HistoryContainer>
                  </Container>
                </>
              )}
            </Grid>
          </Grid>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PurchaseModalCredits
                visible={modalVisible}
                onCancel={closeModal}
                credits={credits}
                userId={userInfo.uid}
                clientSecret={clientSecret}
                cards={allCards}
                info={info}
                address={address}
                pay={payValue}
              />
              <PurchaseModal
                visible={modalVisiblePlan}
                onCancel={closeModalPlan}
                priceId={priceId}
                userId={userInfo?.uid}
                clientSecret={clientSecret}
                cards={allCards}
                info={info}
                address={address}
              />
            </Elements>
          )}
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
export default Credits;
