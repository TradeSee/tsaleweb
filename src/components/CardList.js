import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function PricingCard({ priceData }) {
  const cardStyles = {
    backgroundColor: priceData.status === true ? "#071952" : "#191717",
    color: "white",
    width: "80%",
    height: "300px",
  };

  const buttonStyles = {
    backgroundColor: priceData.status === true ? "#22668D" : "primary",
    color: "primary",
  };
  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Plan {priceData.name}{" "}
          {priceData.status === true && <StarBorderIcon color="white" />}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Status: {priceData.status === true ? "Active" : "No active"}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Description: {priceData.description}
        </Typography>
        <Typography variant="body2">
          Price: {priceData.packagePrice} {priceData.currency} monthly
        </Typography>
        <br />
        <Button
          variant="contained"
          style={buttonStyles}
          disabled={priceData.status === true}
        >
          Purchase
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PricingList({ prices }) {
  return (
    <Grid container spacing={2}>
      {prices.map((priceData, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <PricingCard priceData={priceData} />
        </Grid>
      ))}
    </Grid>
  );
}
