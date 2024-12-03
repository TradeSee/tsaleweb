import { useState } from "react";
import { Grid } from "@mui/material";
import { Container, LogoIcon } from "./styles";
import Drawer from "../../components/Drawer";
import MenuAllSolutions from "./components";
import Logo from "../../icons/T-SaleMetals-07.png";
export default function Services() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  function SetToggle(state) {
    setIsDrawerOpen(state);
  }

  return (
    <Container>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={isDrawerOpen ? 2 : 1}>
        <Drawer handleToggle={SetToggle} initState={isDrawerOpen} />
      </Grid>

      <Grid
        item
        xs={10}
        container
        marginLeft={isDrawerOpen ? "280px" : ""}
      >
        <LogoIcon src={Logo} alt="T-sale Logo" />
        <h1>Solutions</h1>

        <MenuAllSolutions />
      </Grid>
    </Grid>
  </Container>
  );
}
