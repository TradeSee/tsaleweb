import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import Drawer from "../../../../components/Drawer";

import Country from "../../../../components/Flag";

import {
  ContainerHome,
  ColumnContainer,
  RowContainer,
  TextDefault,
} from "../../../../assets/styles";
import { InfoCard, SimulationContainer } from "./styles";
import Simulations from "./Simulation";

export default function Simu() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState("");

  const { state } = useLocation();
  const { simulations } = state;

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const getFlag = (country) => {
    let filter = Country.filter((item) => {
      return item.country === country;
    });
    return filter[0].src;
  };

  const navigate = useNavigate();

  return (
    <ContainerHome>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={toggleDrawer ? 2 : 1}>
          <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
        </Grid>

        <Grid item xs={toggleDrawer ? 10 : 11} container>
          <ColumnContainer
            style={{ marginLeft: 20, marginTop: 50, width: "100%" }}
          >
            <RowContainer
              style={{
                width: 55,
                position: "fixed",
                left: "5%",
                top: 40,
              }}
            >
              <button
                class="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                title="Go Back"
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  width: "100%",
                  justifyContent: "flex-start",
                  display: "flex",
                }}
                onClick={() => navigate("/saved-operations")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  className="stroke-blue-300"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M11 6L5 12M5 12L11 18M5 12H19"
                  ></path>
                </svg>
              </button>
            </RowContainer>
            <TextDefault color={"#4b4b4b"} size={"32px"}>
              Result
            </TextDefault>
            <TextDefault
              color={"#8a97aa"}
              size={"18px"}
              bold={"400"}
              style={{ marginTop: 10, width: "75%" }}
            >
              Saved Simulations
            </TextDefault>

            {selectedSimulation === "" ? (
              <SimulationContainer>
                {simulations.map((simulation) => (
                  <InfoCard
                    className="country"
                    key={simulation.id}
                    onClick={() => setSelectedSimulation(simulation)}
                  >
                    <div className="From">
                      <h2>From:</h2>
                      <h3>{simulation.oCountry}</h3>
                      <img
                        src={getFlag(simulation.oCountry)}
                        alt={simulation.oCountry}
                      />
                    </div>
                    <div className="To">
                      <h2>To:</h2>
                      <h3>{simulation.dCountry}</h3>
                      <img
                        src={getFlag(simulation.dCountry)}
                        alt={simulation.dCountry}
                      />
                    </div>

                    <strong>Date: {simulation.date}</strong>
                  </InfoCard>
                ))}
              </SimulationContainer>
            ) : (
              <Simulations allSpec={selectedSimulation} />
            )}
          </ColumnContainer>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}
