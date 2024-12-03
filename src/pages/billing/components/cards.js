import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PurchaseModal from "./purchaseModal";
import {
  BoxBilling,
  BoxBillingC,
  BoxCreditImg,
  BoxImg,
  Container,
  CustomButton,
} from "../style";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "a"
);

const Cards = ({ info, address, priceId, userId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  function getClientSecret() {
    fetch("https://api4242/create-sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, priceId, address }),
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

  const handlePurchaseClick = async () => {
    await getClientSecret();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function goCredtis() {
    navigate("/credits");
  }

  return (
    <Grid container spacing={3} marginLeft={1}>
      <Container>
        <BoxBilling>
          <BoxImg />

          <div className="content">
            <h3>Show your company</h3>
            <Typography
              variant="body2"
              sx={{
                marginTop: '20px',
                color: "#1F1F1F",
                fontSize: "0.80rem",
                textAlign: "center",
              }}
            >
              As a sponsor, you can showcase your company and products to all
              platform users, including non-subscribers, and earn more credits
            </Typography>
            <CustomButton onClick={handlePurchaseClick}>
              Add to my plan
            </CustomButton>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <PurchaseModal
                  visible={modalVisible}
                  onCancel={closeModal}
                  priceId={priceId}
                  userId={userId}
                  clientSecret={clientSecret}
                />
              </Elements>
            )}
          </div>
        </BoxBilling>

        <BoxBillingC>
          <BoxCreditImg />

          <div className="content">
            <h3>Get more credits</h3>
            <Typography
              variant="body2"
              sx={{
                marginTop: '20px',
                color: "#1F1F1F",
                fontSize: "0.80rem",
                textAlign: "center",
              }}
            >
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been...
            </Typography>
            <CustomButton onClick={goCredtis}>Add to my plan</CustomButton>
          </div>
        </BoxBillingC>
      </Container>
    </Grid>
  );
};

export default Cards;
