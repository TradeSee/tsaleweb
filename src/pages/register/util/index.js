import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { ContainerHome, LogoBranca, TextDefault } from "../../assets/styles";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, MenuItem, Radio, Select } from "@mui/material";
import TablePlan from "./table";
import ModalRegister from "./components/Modal";

import SponsorIcon from "../../icons/SponsorImg.svg";
import { SponsorCard } from "./styles";

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

function UtilRegister() {

    // essa página era aquela que registrava e comprava, somente registrava se comprava algum plano
    //por enquanto essa página não será mais usada, o novo formato agora é: registrar sem comprar
  const [isModalVisible, setModalVisible] = useState(false);
  const [sponsor, setSponsor] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

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
      return "price_1NSJw5JcSI08Gr0KCA5KFOvU";
    } else if (selectedPlan === "app" && selectedValue === "monthly") {
      return "price_1NSJw5JcSI08Gr0KPn2j7kit";
    } else if (selectedPlan === "gold" && selectedValue === "annual") {
      return "price_1NioEwJcSI08Gr0K9pXCOOBq";
    } else if (selectedPlan === "gold" && selectedValue === "monthly") {
      return "price_1NioEwJcSI08Gr0KwuGB8QAW";
    } else if (selectedPlan === "premium" && selectedValue === "annual") {
      return "price_1NgTI0JcSI08Gr0KxSOEM4R7";
    } else if (selectedPlan === "premium" && selectedValue === "monthly") {
      return "price_1NgTI0JcSI08Gr0KKXIN4u8I";
    }
  };

  const priceId = getPriceId();

  const [clientSecret, setClientSecret] = useState("");

  function getClientSecret() {
    fetch("https://api4242/create-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        if (clientSecret) {
          showModal();
        }
      })
      .catch((error) => {
        console.error("Erro ao obter o clientSecret:", error);
      });
  }

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
    sponsor: sponsor === "sponsor" ? "price_1NIYBgJcSI08Gr0KBb7BbpP0" : ""
  };

  return (
    <ContainerHome>
      <Grid container rowSpacing={2}>
        <Box
          sx={{
            ...gradientBackground,
            color: "white",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <LogoBranca />

            <Grid item>
              <Typography variant="h5">
                Get access to powerful tools for enhancing your business
              </Typography>
            </Grid>
          </Grid>
        </Box>
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

        <Grid container spacing={2} marginLeft="10px" alignItems="center">
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
                {selectedValue === "annual" ? "US$ 690,00" : "US$ 790,00"}{" "}
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
                {selectedValue === "annual" ? "US$ 490,00" : "US$ 590,00"}{" "}
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
                {selectedValue === "annual" ? "US$ 69,90" : "US$ 99,90"}{" "}
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
                  As a sponsor, you can showcase your company and products to
                  all platform users, including non-subscribers, and earn 40
                  credits
                </p>
              </section>

              <footer>
                <span>US$199,90</span>
                <div>
                  <span>US$99,95</span>
                </div>

                <button onClick={handleAddToPlanClick}>Add to my plan</button>
              </footer>
            </SponsorCard>
          </Grid>
        </Grid>
        <br />
        <Grid container alignItems="center" marginLeft="35px" spacing={2}>
          <Grid item>
            <TextDefault color={"#3C3C3C"}>Resume</TextDefault>
            <Typography>
              {selectedPlan === "app"
                ? "Membership App"
                : selectedPlan === "gold"
                ? "Membership Gold"
                : "Membership Premium"}
              {sponsor ? " & Membership Sponsor" : ""}|{" "}
              {selectedValue === "monthly" ? "Monthly Plan" : "Annual Plan"}{" "}
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
              <ModalRegister
                visible={isModalVisible}
                onClose={handleCancel}
                priceId={priceId}
                priceSponsor={priceSponsor}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}

export default UtilRegister;
