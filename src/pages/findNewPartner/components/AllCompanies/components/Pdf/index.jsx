import React, { useEffect, useState } from "react";

import SecondPage from "./Pages/SecondPage/Index";
import ThirdPage from "./Pages/ThirdPage/Index";
import Cover from "./Pages/Cover/Index";

import { Container } from "./styles";

export const Pdf = React.forwardRef((props, ref) => {
  const [selectedCompany, setCompany] = useState(props.companies);

  useEffect(() => {
    setCompany(props?.companies);
  }, [props?.companies]);

  return (
    <Container ref={ref}>
      {!selectedCompany ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cover
            role={props.role}
            company={selectedCompany[0]}
            selectedHsCodes={props.hsCodes}
          />
          {props.dataType !== "Favorited" && (
            <SecondPage
              company={selectedCompany}
              generalData={props.generalData}
              general={props.general}
              toDate={props.toDate}
              fromDate={props.fromDate}
              role={props.role}
            />
          )}
          <ThirdPage
            company={selectedCompany}
            generalData={props.generalData}
            general={props.general}
            dataType={props.dataType}
            filterBy={props.filterBy}
            role={props.role}
            toDate={props.toDate}
            fromDate={props.fromDate}
            qtyCompanies={props.maxCompanies}
          />
        </>
      )}
    </Container>
  );
});
