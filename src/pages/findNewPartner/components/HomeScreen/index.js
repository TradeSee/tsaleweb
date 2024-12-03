import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid } from "@mui/material";

import ButtonBlue from "../../../../components/myButton";
import { InitialIcon } from "../../../../components/InitialIcons";

import FnpDemo from "./assets/demoTradeData.gif";
import { TextDefault } from "../../../../assets/styles";
import { BtnsContainer, SecondaryBtn, StartContainer } from "./styles";
import { Check } from "@mui/icons-material";

export default function HomeScreen({
  toggleDrawer,
  animatedStep,
  moveStepAnimation,
  setSelectedDataType,
  fetchFavoritedCompanies,
}) {
  return (
    <Grid
      item
      xs={toggleDrawer ? 10 : 11}
      container
      alignItems="center"
      className={animatedStep}
    >
      <Grid item xs={4}>
        <StartContainer>
          <TextDefault color={"#4b4b4b"} size={"32px"}>
            Trade Data
          </TextDefault>
          <br />
          <TextDefault
            color={"#8a97aa"}
            size={"18px"}
            bold={"400"}
            style={{ marginTop: 20, width: "20%" }}
          >
            <ul
              style={{
                listStylePosition: "inside",
                paddingLeft: 0,
                listStyle: "none",
              }}
            >
              <li>
                <Check /> Trade data consisting of over 190 countries
              </li>
              <li>
                <Check /> Identify Global Supply Chain Trends
              </li>
              <li>
                <Check /> Discover Opportunities Across The Globe
              </li>
              <li>
                <Check /> Supply Chain Diversification and Optimization
              </li>
            </ul>
          </TextDefault>
          <BtnsContainer>
            <ButtonBlue
              width="250px"
              onClick={() => {
                setSelectedDataType("New");
                moveStepAnimation("next", 1);
              }}
            >
              Get started{" "}
              <ArrowForwardIcon
                sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
              />
            </ButtonBlue>

            <SecondaryBtn
              onClick={() => {
                fetchFavoritedCompanies();
                setSelectedDataType("Favorited");
                moveStepAnimation("next", 4);
              }}
            >
              Open Data Records
            </SecondaryBtn>
          </BtnsContainer>
        </StartContainer>
      </Grid>
      <Grid item xs={4}>
        <InitialIcon>
          <img src={FnpDemo} alt="All companies" />
        </InitialIcon>
      </Grid>
    </Grid>
  );
}
