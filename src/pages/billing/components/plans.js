import React, { useEffect, useState } from "react";
import { authScreen } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import {
  Button,
  Card,
  Box,
  Radio,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Drawer from "../../../components/Drawer";
import LoadingPage from "../../../components/LoadingPage";
import getUserInfo from "../../../hooks/getUsers";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PurchaseModal from "./purchaseModal";
import { stripeService } from "../../../service/apiStripe";
import { SponsorCard } from "./styles";
import SponsorIcon from "../../../icons/SponsorImg.svg";
import TablePlan from "./table";
const stripePromise = loadStripe(
  "a"
);

const cardStyle = {
  background: "#265DD8",
  border: "5px solid #16386D",
  borderRadius: "20px",
  textAlign: "center",
  padding: "16px",
  color: "white",
  width: "200px",
  height: "250px",
};

const cardStyleTwo = {
  background: "#E9EDF8",
  borderRadius: "20px",
  textAlign: "center",
  padding: "16px",
  color: "white",
  width: "200px",
  height: "250px",
  color: "#16386D",
};

const radioStyle = {
  display: "flex",
  alignItems: "center",
};

const Plans = () => {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const navigate = useNavigate();

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

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);

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

  const address = {
    city: userInfo?.userData?.address?.city,
    country: userInfo?.userData?.address?.country,
    line1: userInfo?.userData?.address?.line1,
    postalCode: userInfo?.userData?.address?.postalCode,
    state: userInfo?.userData?.address?.state,
  };

  const info = {
    name: userInfo?.userData?.name,
    customerId: userInfo?.userData?.customerId,
    email: userInfo?.email,
    userId: userInfo?.uid,
  };

  const userId = userInfo?.uid;

  const handleCardClick = async (cardId) => {
    setSelectedPlan(cardId);
    await getClientSecret();
    setModalVisible(true);
  };

  const [clientSecret, setClientSecret] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function getClientSecret() {
    console.log("aq");
    fetch("https://api4242/create-plan", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, priceId, address, priceIdSponsor }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Erro ao obter o clientSecret:", error);
      });
  }

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

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
  const [sponsor, setSponsor] = useState(null);

  const gradientBackground = {
    background: "linear-gradient(to right, #366DFB, #003985)",
  };
  const [selectedValue, setSelectedValue] = useState("annual");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [selectedPlan, setSelectedPlan] = React.useState("premium");

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const getPriceId = () => {
    if (selectedPlan === "app" && selectedValue === "annual") {
      return "price_1NfU4xJcSI08Gr0KxdZsQbjT";
    } else if (selectedPlan === "app" && selectedValue === "monthly") {
      return "price_1NfU7fJcSI08Gr0Kh9Ua7eS3";
    } else if (selectedPlan === "gold" && selectedValue === "annual") {
      return "price_1NhZwUJcSI08Gr0KjQFDebtw";
    } else if (selectedPlan === "gold" && selectedValue === "monthly") {
      return "price_1NhZwUJcSI08Gr0KDA8n3o31";
    } else if (selectedPlan === "premium" && selectedValue === "annual") {
      return "price_1NNcLWJcSI08Gr0KxdCgGR90";
    } else if (selectedPlan === "premium" && selectedValue === "monthly") {
      return "price_1NNby8JcSI08Gr0KZfT3ztfK";
    }
  };

  const priceId = getPriceId();

  const handleGoBack = () => {
    window.history.back();
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function handleAddToPlanClick() {
    setSponsor("sponsor");
  }

  const priceConfig = {
    app: {
      annual: 69.9,
      monthly: 99.9,
    },
    gold: {
      annual: 490,
      monthly: 590,
    },
    premium: {
      annual: 690,
      monthly: 790,
    },
  };

  let price = priceConfig[selectedPlan][selectedValue];

  if (sponsor === "sponsor") {
    price += 99.95;
  }

  const priceSponsor = {
    sponsor: sponsor === "sponsor" ? "price_1NhZxbJcSI08Gr0K3XUEMpYS" : "",
  };

  const priceIdSponsor = priceSponsor?.sponsor || "";
  console.log(priceId, priceIdSponsor);
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
              marginLeft={toggleDrawer ? "250px" : "100px"}
              marginTop="30px"
            >
              <Grid container rowSpacing={2}>
                <br />
                <Box
                  sx={{
                    p: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TextDefault color={"#414141"} size={"15px"} bold={"600"}>
                    Choose a plan and start right now
                  </TextDefault>
                </Box>

                <Grid
                  container
                  spacing={2}
                  marginLeft="10px"
                  alignItems="center"
                >
                  <Grid item>
                    <TextDefault color={"#9D9D9D"} bold={"300"}>
                      {" "}
                      Select plan
                    </TextDefault>{" "}
                    <br />
                    <Select
                      value={selectedValue}
                      onChange={handleSelectChange}
                      sx={{ borderRadius: "20px" }}
                    >
                      <MenuItem value="monthly">Monthly Plan</MenuItem>
                      <MenuItem value="annual">Annual Plan</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <Card sx={cardStyle}>
                      <Typography marginTop={5} variant="h5" fontWeight={600}>
                        Web Premium
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        membership
                      </Typography>

                      <Typography variant="h5" marginTop={8} fontWeight={600}>
                        {" "}
                        {selectedValue === "annual"
                          ? "US$ 690,00"
                          : "US$ 790,00"}{" "}
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        Per Month
                      </Typography>
                    </Card>
                    <Grid item>
                      <Radio
                        xs={6}
                        sx={radioStyle}
                        checked={selectedPlan === "premium"}
                        onChange={handlePlanChange}
                        value="premium"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "PREMIUM" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Card sx={cardStyleTwo}>
                      <Typography variant="h5" marginTop={5} fontWeight={600}>
                        Web Gold
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        membership
                      </Typography>

                      <Typography variant="h5" marginTop={8} fontWeight={600}>
                        {" "}
                        {selectedValue === "annual"
                          ? "US$ 490,00"
                          : "US$ 590,00"}{" "}
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        Per Month
                      </Typography>
                    </Card>
                    <Grid item>
                      <Radio
                        xs={6}
                        sx={radioStyle}
                        checked={selectedPlan === "gold"}
                        onChange={handlePlanChange}
                        value="gold"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "GOLD" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Card sx={cardStyleTwo}>
                      <Typography variant="h5" marginTop={5} fontWeight={600}>
                        App
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        membership
                      </Typography>

                      <Typography variant="h5" marginTop={8} fontWeight={600}>
                        {" "}
                        {selectedValue === "annual"
                          ? "US$ 69,90"
                          : "US$ 99,90"}{" "}
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        Per Month
                      </Typography>
                    </Card>
                    <Grid item>
                      <Radio
                        xs={6}
                        sx={radioStyle}
                        checked={selectedPlan === "app"}
                        onChange={handlePlanChange}
                        value="app"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "APP" }}
                      />
                    </Grid>
                  </Grid>

                  <TablePlan />

                  <Grid item>
                    <SponsorCard>
                      <header>
                        <img src={SponsorIcon} alt="Sponsor icon" />
                      </header>

                      <section>
                        <h3>Show your company</h3>

                        <p>
                          As a sponsor, you can showcase your company and
                          products to all platform users, including
                          non-subscribers, and earn 40 credits
                        </p>
                      </section>

                      <footer>
                        <span>US$199,90</span>
                        <div>
                          <span>US$99,95</span>
                        </div>

                        <button onClick={handleAddToPlanClick}>
                          Add to my plan
                        </button>
                      </footer>
                    </SponsorCard>
                  </Grid>
                </Grid>
                <br />
                <Grid
                  container
                  alignItems="center"
                  marginLeft="35px"
                  spacing={2}
                >
                  <Grid item>
                    <TextDefault color={"#3C3C3C"}>Resume</TextDefault>
                    <Typography>
                      {selectedPlan === "app"
                        ? "Membership App"
                        : selectedPlan === "gold"
                        ? "Membership Gold"
                        : "Membership Premium"}
                      {sponsor ? " & Membership Sponsor" : ""}|{" "}
                      {selectedValue === "monthly"
                        ? "Monthly Plan"
                        : "Annual Plan"}{" "}
                    </Typography>
                    <Typography> </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Total: {price}</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#FDC27B",
                        borderRadius: "12px",
                      }}
                    >
                      <Button
                        onClick={showModal}
                        style={{ color: "#1B3065", fontWeight: "bold" }}
                      >
                        Checkout
                      </Button>
                      <hr />
                      {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                          <PurchaseModal
                            visible={modalVisible}
                            onCancel={closeModal}
                            priceId={priceId}
                            priceSponsor={priceIdSponsor}
                            userId={userId}
                            clientSecret={clientSecret}
                          />
                        </Elements>
                      )}
                    </Button>
                  </Grid>
                
                </Grid>
              </Grid>
              <br />
                  <Button ml={2} variant="text" onClick={createPortal}>
                    Update or cancel your subscription
                  </Button>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
export default Plans;
