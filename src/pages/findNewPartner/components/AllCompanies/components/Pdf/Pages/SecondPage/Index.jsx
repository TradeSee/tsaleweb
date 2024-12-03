/* eslint-disable react/prop-types */

import Content from "./Components/Content";
import Footer from "../../components/Footer";
import BasicData from "../../components/BasicData";
import { Container } from "./styles";

// Create Document Component
export default function SecondPage({
  role,
  company,
  general,
  generalData,
  type,
  toDate,
  fromDate,
}) {
  console.log(role);
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
        <BasicData
          role={role}
          company={company}
          type={type}
          toDate={toDate}
          fromDate={fromDate}
        />
      </div>
      <Content
        role={role}
        company={company}
        general={general}
        maxCompanies={generalData?.totalCompanies}
      />
      <Footer />
    </Container>
  );
}
