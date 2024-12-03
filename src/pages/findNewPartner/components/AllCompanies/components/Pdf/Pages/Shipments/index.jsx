/* eslint-disable react/prop-types */

import Content from "./Components/Content";
import Footer from "../../components/Footer";
import { Container } from "./styles";

// Create Document Component
export default function Shipments({ role, company }) {
  return (
    <Container>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* <Criteria role={role} company={company} type={type} /> */}
      </div>
      <Content company={company} />
      <Footer />
    </Container>
  );
}
