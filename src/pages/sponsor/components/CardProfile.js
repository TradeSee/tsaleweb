import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

const StyledCard = styled(Card)`
  margin: 20px;
`;

const CompanyDetails = ({ data }) => {
  const {
    corporateName,
    fantasy,
    city,
    state,
    address,
    neighborhood,
  } = data || {};

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5">Corporate name: {corporateName}</Typography>
        <Typography variant="subtitle1">Fantasy Name: {fantasy}</Typography>
        <Typography variant="subtitle1">
          Location: {address}, {city}, {state}
        </Typography>
        <Typography variant="subtitle1">
          Neighborhood: {neighborhood}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default CompanyDetails;
