import React, { useState } from "react";

import SecondPage from "./Pages/SecondPage/Index";
import ThirdPage from "./Pages/ThirdPage/Index";

import { Container } from "./styles";
import Cover from "./Pages/Cover/Index";
import Shipments from "./Pages/Shipments";
import Leads from "./Pages/Leads";

export const Pdf = React.forwardRef((props, ref) => {
  const [data] = useState(false);
  const [selectedCompany] = useState(props.company[0]);
  const { fromDate, toDate, role, hsCode } = props.filters;

  return (
    <Container ref={ref}>
      {!data && !selectedCompany ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cover
            company={selectedCompany}
            role={role}
            selectedHsCodes={hsCode}
          />
          <div style={{ pageBreakAfter: "always" }} className="page" />
          {/* <FirstPage company={selectedCompany} /> */}
          <Leads urlLeads={props.leadsUrl} />
          <div style={{ pageBreakAfter: "always" }} className="page" />
          <SecondPage
            role={"Supplier"}
            company={selectedCompany}
            type={props.type}
            fromDate={fromDate}
            toDate={toDate}
          />
          <div style={{ pageBreakAfter: "always" }} className="page" />
          <ThirdPage
            role={"Supplier"}
            company={selectedCompany}
            type={props.type}
            fromDate={fromDate}
            toDate={toDate}
          />
          <div style={{ pageBreakAfter: "always" }} className="page" />
          <SecondPage
            role={"Buyer"}
            company={selectedCompany}
            type={props.type}
            fromDate={fromDate}
            toDate={toDate}
          />
          <div style={{ pageBreakAfter: "always" }} className="page" />
          <ThirdPage
            role={"Buyer"}
            company={selectedCompany}
            type={props.type}
            fromDate={fromDate}
            toDate={toDate}
          />
          <div style={{ pageBreakAfter: "always" }} className="page" />
          <Shipments shipments={props.shipments} company={selectedCompany} />
        </>
      )}
    </Container>
  );
});
