/* eslint-disable no-restricted-globals */
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";
import AppRoutes from "./routes/Routes";
import GlobalStyles from "./globalStyles";
import stripePromise from "./contexts/stripeApi";
import defaultTheme from "./assets/themes/default";

function App() {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <AppRoutes />
      </ThemeProvider>
    </Elements>
  );
}

export default App;
