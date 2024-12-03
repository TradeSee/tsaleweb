/* eslint-disable react/prop-types */

import Content from "./Components/Content";
import Footer from "../../components/Footer";
import BasicData from "../../components/BasicData";
import { Container, ContentContainer } from "./styles";

// Create Document Component
export default function ThirdPage({ role, company, general, type }) {
  return (
    <Container>
      <ContentContainer>
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* <Criteria role={role} company={company} type={type} /> */}
          <BasicData role={role} company={company} type={type} />
        </div>
        <Content role={role} company={company} />
      </ContentContainer>
      <Footer />
    </Container>
  );
}
