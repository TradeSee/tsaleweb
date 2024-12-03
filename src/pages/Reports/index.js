import React, { useState } from "react";
import { ContainerHome } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { Container } from "./styles";

export default function Reports() {
  const [toggleDrawer, useTroggleDawer] = useState(true);
  function SetToggle(state) {
    useTroggleDawer(state);
  }
  return (
    <ContainerHome>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={toggleDrawer ? 2 : 1}>
          <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
        </Grid>
        <Grid item xs={toggleDrawer ? 10 : 11} container alignItems="center">
          <Container>
            <iframe
              frameBorder={0}
              scrolling="no"
              title="T-Sale metals - Reports"
              src="https://relatoriotsale.vercel.app/"
            />
          </Container>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}
