import React from "react";
import { Container, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

const Section = styled.section`
  color: #4d8c87;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
`;

const Card = styled.div`
  flex: 0 0 33.3333%;
  max-width: 33.3333%;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const AllServices = [
  {
    name: "Metal Prices",
    icon: require("../Icons/metalPrice.png"),
    route: "/market-intelligence",
    text: "Search for any metal and view the prices...",
  },
  {
    name: "Trade Data",
    icon: require("../Icons/fnp.png"),
    route: "/trade-data",
    text: "Find companies from all around the world...",
  },
  {
    name: "Data Records",
    icon: require("../Icons/savedOperations.png"),
    route: "/saved-operations",
    text: "All data records of the services...",
  },
  {
    name: "Simulator",
    icon: require("../Icons/simulator.png"),
    route: "/simulation",
    text: "Carry out metals commercialization Worldwide...",
  },
  {
    name: "Sustainability",
    icon: require("../Icons/sustainability.png"),
    route: "/sustainability",
    text: "Environmental, social, and governance (ESG) practices.",
  },
  {
    name: "International Sponsor",
    icon: require("../Icons/sponsor.png"),
    route: "/international-sponsor",
    text: "On this page you can view for any sponsor.",
  },
  {
    name: "Highlights",
    icon: require("../Icons/news.png"),
    route: "/stayinformed",
    text: "On this page you can view news about market.",
  },
  {
    name: "Profile",
    icon: require("../Icons/profile.png"),
    route: "/profile",
    text: "View and edit your identification.",
  },
  {
    name: "Billing",
    icon: require("../Icons/billing.png"),
    route: "/billing",
    text: "Manage your balance and subscription.",
  },
];

const MenuAllSolutions = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <Section>
      <Container sx={{ py: 24 }}>
        <FlexContainer>
          {AllServices.map((service, index) => (
            <>
              <Card key={index}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={service.route}
                >
                  <div
                    sx={{
                      border: "1px solid rgba(255, 255, 255, 0.75)",
                      borderRadius: "0.5rem",
                      padding: "1.5rem",
                    }}
                  >
                    <StyledImage src={service.icon} alt={service.name} />

                    <Typography
                      variant="h6"
                      sx={{ color: "#000000", marginBottom: "0.5rem" }}
                    >
                      {service.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4d8c87" }}>
                      {service.text}
                    </Typography>
                  </div>
                </Link>
              </Card>
            </>
          ))}
        </FlexContainer>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            mx: "auto",
            mt: 4,
            backgroundColor: "#3f51b5",
          }}
          onClick={goHome}
        >
          Home
        </Button>
      </Container>
    </Section>
  );
};

export default MenuAllSolutions;
