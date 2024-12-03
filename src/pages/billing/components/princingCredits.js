import React, { useState } from "react";
import {
  Button,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import PurchaseModalCredits from "./Modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "a"
);

const containerStyle = {
  display: "flex",
};

const PricingCard = ({ credits, pay, unitPrice, userInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

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
  };
  const userId = userInfo?.uid;

  const [clientSecret, setClientSecret] = useState("");

  function getClientSecret() {
    fetch("https://api4242/payment-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, pay, address }),
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

  return (
    <>
      <div style={containerStyle}>
        <ListItem>
          <ListItemText
            primary={
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    {`${credits} CREDITS`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography marginRight="5px" variant="body2">
                    ${pay}
                  </Typography>
                </Grid>
              </Grid>
            }
            secondary={
              <Typography variant="body2">(${unitPrice} each)</Typography>
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurchaseClick}
          >
            Add
          </Button>
        </ListItem>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PurchaseModalCredits
            visible={modalVisible}
            onCancel={closeModal}
            credits={credits}
            userId={userId}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
    </>
  );
};

export default PricingCard;
