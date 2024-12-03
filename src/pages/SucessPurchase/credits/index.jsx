import { useEffect, useState } from "react";
import { Container, Header, LogoIcon, Content } from "../styles";
import { Grid } from "@mui/material";

import logo from "../../../icons/T-SaleMetals-03.png";
import { Link, useLocation } from "react-router-dom";
import { addCredit, historyCredits, viewCredit } from "../../../hooks/credits";

export default function SuccessPageCredits() {
  const [toggleDrawer] = useState(true);

  const [creditAdded, setCreditAdded] = useState(false);
  const [priceId, setPriced] = useState(false);






  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const stateParam = urlSearchParams.get("state");

    if (stateParam) {
      const stateData = JSON.parse(decodeURIComponent(stateParam));
      const userId = stateData.userId;
      const credits = stateData.credits;
      const formattedDate = new Date().toISOString();
      console.log(userId, credits, formattedDate)
        const infoC = {
          text: `You purchased a credit package`,
          type: "increase",
          date: formattedDate,
          credits: credits,
        };
      if (userId && credits && !creditAdded) {
        addCredit(userId, credits);
        historyCredits(infoC, userId);
        setCreditAdded(true);
      }
    }
  }, [creditAdded]);

 


  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>       
        <Grid item xs={toggleDrawer ? 10 : 11} container alignItems="center">
          <Content>
            <Header>
              <h1>Congrats for your purchase!</h1>

              <LogoIcon src={logo} alt="T-sale Logo" />
            </Header>

            <div>
              You received credits, check your e-mail to see your receipt and click on
              the button below to enjoy all your new benefits and credits.
            </div>
            <Link to="/billing">

            <button>Enjoy my purchase</button>
            </Link>
          </Content>
        </Grid>
      </Grid>
    </Container>
  );
}
