/* eslint-disable react/prop-types */

import Content from "./Components/Content";
import Footer from "../../components/Footer";
import BasicData from "../../components/BasicData";
import { Container, ContentContainer } from "./styles";

// Create Document Component
export default function ThirdPage({
  role,
  company,
  general,
  type,
  fromDate,
  toDate,
}) {
  return (
    <Container>
      <ContentContainer>
        <BasicData
          role={role}
          company={company}
          type={type}
          fromDate={fromDate}
          toDate={toDate}
        />
        <Content role={role} company={company} />
      </ContentContainer>
      <Footer />
    </Container>
  );
}
