/* eslint-disable react/prop-types */

import { Criteria } from "../../components/Criteria";
import Content from "./Components/Content";
import Content2 from "./Components/Content2";
import Footer from "../../components/Footer";
import BasicData from "../../components/BasicData";
import { Container } from "./styles";

// Create Document Component
export default function SecondPage({
  role,
  company,
  general,
  type,
  fromDate,
  toDate,
}) {
  return (
    <Container>
      {/* <Criteria role={role} company={company} type={type} /> */}
      <BasicData
        role={role}
        company={company}
        type={type}
        fromDate={fromDate}
        toDate={toDate}
      />
      <Content role={role} company={company} />
      <Content2 role={role} company={company} />
      <Footer />
    </Container>
  );
}
