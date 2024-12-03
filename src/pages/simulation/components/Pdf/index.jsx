import React from "react";

import SecondPage from "./Pages/SecondPage/Index";

import { Container } from "./styles";

export const Pdf = React.forwardRef((props, ref) => {
  return (
    <Container ref={ref}>
      <SecondPage info={props.info} company={props.company || false} />
    </Container>
  );
});
