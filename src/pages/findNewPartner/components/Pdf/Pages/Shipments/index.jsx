/* eslint-disable react/prop-types */

import Content from "./Components/Content";
import Footer from "../../components/Footer";
import { Container } from "./styles";

// Create Document Component
export default function Shipments({ shipments, company }) {
  return (
    <Container>
      <Content shipments={shipments} company={company} />
      <Footer />
    </Container>
  );
}
