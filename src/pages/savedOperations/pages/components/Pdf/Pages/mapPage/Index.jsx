/* eslint-disable react/prop-types */

import { Criteria } from "../../components/Criteria";
// import Content from "./Components/Content";
import Footer from "../../components/Footer";
import BasicData from "../../components/BasicData";
import { Container } from "./styles";

// Create Document Component
export default function MapPage({ role, company, general, type }) {
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
        <Criteria role={role} company={company} type={type} />
        <BasicData role={role} company={company} type={type} />
      </div>
      {/* <Content role={role} company={company} /> */}
      <Footer />
    </Container>
  );
}