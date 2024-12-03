/* eslint-disable react/prop-types */

import Content from "./Components/Content";

import { Container } from "./styles";

// Create Document Component
export default function SecondPage({ info, company }) {
  return (
    <Container>
      <Content info={info} company={company || false} />
    </Container>
  );
}
