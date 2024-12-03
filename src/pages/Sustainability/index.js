import React, { useRef, useState } from "react";
import {
  ColumnContainer,
  ContainerHome,
  TextDefault,
  IconServices,
} from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import ButtonBlue from "../../components/myButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SustainabilityImg from "../../icons/sustainIcon.png";
import { Link } from "react-router-dom";
import { Divider, Tour } from "antd";
import Dashboard from "./imgs/dashboard.png";
import Score from "./imgs/scoreT.png";
import Mode from "./imgs/esg.png";
import Questions from "./imgs/questions.png";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";

export default function Sustainability() {
  const [toggleDrawer, useTroggleDawer] = useState(true);
  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "Dashboard",
      description: "",
      cover: <img alt="tour.png" src={Dashboard} />,
      target: () => ref1.current,
    },
    {
      title: "Your score",
      description: "This is where your total ESG score appears.",
      target: () => ref2.current,
      cover: <img alt="tour.png" src={Score} />,
    },
    {
      title: "ESG",
      description: "ESG category to answer and get the score.",
      cover: <img alt="tour.png" src={Mode} />,
      target: () => ref3.current,
    },
    {
      title: "Edit Answer",
      description:
        "Here you select a category to proceed or change the answers.",
      cover: <img alt="tour.png" src={Questions} />,
      target: () => ref4.current,
    },
  ];

  return (
    <ContainerHome>
      <Grid
        container
        rowSpacing={1}
        style={{
          height: "100%",
        }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={toggleDrawer ? 2 : 1}>
          <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
        </Grid>
        <Grid item xs={toggleDrawer ? 10 : 11} container alignItems="center">
          <Grid item xs={7}>
            <ColumnContainer style={{ marginLeft: 50 }}>
              <TextDefault color={"#4b4b4b"} size={"32px"}>
                Sustainability
              </TextDefault>
              <TextDefault
                color={"#8a97aa"}
                size={"18px"}
                bold={"400"}
                style={{ marginTop: 20, width: "75%" }}
              >
                Fill out this form to receive validation of your company's
                environmental, social, and governance (ESG) practices.
              </TextDefault>
              <Link to={"/dashboard-sustainability"}>
                <ButtonBlue width="250px" marginTop="50px">
                  Get started{" "}
                  <ArrowForwardIcon
                    sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                  />
                </ButtonBlue>
              </Link>
              {/* <>
                <ButtonBlue
                  width="250px"
                  marginTop="12px"
                  onClick={() => setOpen(true)}
                >
                  Begin Tour{" "}
                  <ConnectingAirportsIcon
                    sx={{ fontSize: "1.4rem", verticalAlign: "middle" }}
                  />
                </ButtonBlue>

                <Divider />

                <Tour
                  open={open}
                  onClose={() => setOpen(false)}
                  steps={steps}
                />
              </> */}
            </ColumnContainer>
          </Grid>
          <Grid item xs={4}>
            <IconServices iconUrl={SustainabilityImg} />
          </Grid>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}
