/* eslint-disable react/prop-types */

import Content from "./Components/Content";
import Footer from "../../components/Footer";
import { Container } from "./styles";

// Create Document Component
export default function Leads({ urlLeads }) {
  return (
    <Container>
      <Content url={urlLeads} />
      <Footer />
    </Container>
  );
}
