import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { Container, CostCard, Footer, InfoCard } from "./styles";
import { Grid } from "@mui/material";

import {
  ColumnContainer,
  TextDefault,
  RowContainer,
  ContainerHome,
} from "../../../../../assets/styles";

import Country from "../../../../../components/Flag";
import Capitalize from "../../../../../utils/capitalize";
import FormatNumber from "../../../../../utils/formatNumber";
import Drawer from "../../../../../components/Drawer";

export default function Simulations({ allSpec }) {
  const [isInfoCardActive, setIsInfoCardActive] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);

  const pdfRef = useRef(null);

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  function TaxesSum(tx1, tx2) {
    return tx1 + tx2 + " %";
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
        <Grid item xs={toggleDrawer ? 10 : 11} container>
          <Grid item xs={12}>
            <ColumnContainer style={{ marginLeft: 20, marginTop: 50 }}>
              <RowContainer
                style={{
                  width: 55,
                  position: "fixed",
                  left: "5%",
                  top: 40,
                }}
              >
                <button
                  className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
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
                Simulation Dashboard
              </TextDefault>
              <TextDefault
                color={"#8a97aa"}
                size={"13px"}
                bold={"400"}
                style={{ marginTop: 10, width: "75%" }}
              >
                The screen will display a simulation dashboard, showing graphs
                and information about the results obtained from the previously
                filled form responses. Essential information will be included,
                such as the total value of the simulation, interest rates, and
                other relevant data.
              </TextDefault>

              <Container ref={pdfRef}>
                <InfoCard
                  onClick={() => setIsInfoCardActive((prevState) => !prevState)}
                >
                  <h2>General Info</h2>

                  <p>
                    Hs Code: {allSpec.spec.product.hsCode} -{" "}
                    {Capitalize(allSpec.spec.product.hsName)}
                  </p>
                  <p>
                    Total Operation: US$ {FormatNumber(allSpec.budget.priceAll)}
                  </p>

                  {/* <p>Shipment Volume: {allSpec.containers.volume}</p> */}
                  {/* <p>Price/Ton: {allSpec.shipPrice}</p> */}
                </InfoCard>

                <InfoCard
                  onClick={() => setIsInfoCardActive((prevState) => !prevState)}
                  className="country"
                >
                  <div className="From">
                    <h2>From:</h2>
                    <h3>{allSpec.oCountry}</h3>
                    <img
                      src={getFlag(allSpec.oCountry)}
                      alt={allSpec.oCountry}
                    />
                  </div>
                  <div className="To">
                    <h2>To:</h2>
                    <h3>{allSpec.dCountry}</h3>
                    <img
                      src={getFlag(allSpec.dCountry)}
                      alt={allSpec.dCountry}
                    />
                  </div>
                </InfoCard>

                <CostCard
                  onClick={() => setIsInfoCardActive((prevState) => !prevState)}
                  isCostActive={isInfoCardActive}
                >
                  <h2>Costs</h2>

                  <p>Incoterm: {allSpec.budget.incoterms}</p>
                  <p>
                    Total Taxes:{" "}
                    {TaxesSum(allSpec.budget.taxN, allSpec.budget.taxI)}
                  </p>

                  <p>Cost Calculation: US$ {FormatNumber(allSpec.priceAll)}</p>

                  {/* <p>Net Price: {allSpec.totalNetPrice}</p> */}

                  {isInfoCardActive && (
                    <>
                      <h3>
                        <hr /> Net Prices <hr />
                      </h3>
                      <p>LME Percentage: {allSpec.budget.lmeP}</p>

                      <p>
                        Exchange Rate Variation: {allSpec.budget.netExchange}
                      </p>

                      <p>Award: {allSpec.budget.award}</p>

                      <h3>
                        <hr /> Taxes <hr />
                      </h3>
                      <p>National: {allSpec.budget.taxN}</p>

                      <p>International: {allSpec.budget.taxI}</p>

                      <h3>
                        <hr className="cost" /> Cost Calculation{" "}
                        <hr className="cost" />
                      </h3>
                      <p>Origin Freight: {allSpec.budget.freOrigin}</p>

                      <p>Maritime Freight: {allSpec.budget.marFre}</p>

                      <p>Broker: {allSpec.budget.broker}</p>

                      <p>Import Services: {allSpec.budget.iService}</p>

                      <p>Port Storage: {allSpec.budget.portStorage}</p>

                      {/* <p>Transp. Destination: {allSpec.budget.costTrasp}</p> */}
                    </>
                  )}
                </CostCard>

                <InfoCard
                  onClick={() => setIsInfoCardActive((prevState) => !prevState)}
                >
                  <h2>Containers</h2>

                  <p>20" Quantity: {allSpec.spec.allc20}</p>

                  <p>40" Quantity: {allSpec.spec.allc40}</p>
                </InfoCard>

                <Footer>
                  <button onClick={handlePrint}>Exportar PDF</button>
                </Footer>
              </Container>
            </ColumnContainer>
          </Grid>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}
