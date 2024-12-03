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
  generalData,
  dataType,
  filterBy,
  toDate,
  fromDate,
  qtyCompanies,
}) {
  function calculateCompanyRevenue(company) {
    return (
      (company.shipmentValue / company.numberOfShipments) *
      (company.tradingPartnerCount * 2)
    );
  }

  const newCompanies = company.map((company) => ({
    ...company,
    relevance: calculateCompanyRevenue(company),
  }));

  const SortedCompanies = newCompanies.sort(
    (a, b) => b.relevance - a.relevance
  );

  const companiesWithIndex = SortedCompanies.map((company, index) => ({
    ...company,
    rank: index + 1,
  }));

  return (
    <Container>
      <ContentContainer>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* <Criteria role={role} company={company} type={type} /> */}
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
          companies={company}
          dataType={dataType}
          filterBy={filterBy}
          qtyCompanies={qtyCompanies}
        />
      </ContentContainer>
      <Footer />
    </Container>
  );
}
