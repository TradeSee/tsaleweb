import React, { useEffect, useState } from "react";

import SecondPage from "./Pages/SecondPage/Index";
import ThirdPage from "./Pages/ThirdPage/Index";

import { Container } from "./styles";
import ProfileCompany from "../../../../../service/ProfileCompany";
import Cover from "./Pages/Cover/Index";

export const Pdf = React.forwardRef((props, ref) => {
  const [data, setData] = useState(false);
  const { company, role } = props.filters;

  useEffect(() => {
    ProfileCompany(
      company.companyId,
      company.companyName,
      company.country,
      props.user?.userData?.name,
      props.user?.uid,
      props.userIP
    )
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
        console.log("erro no reports:", err);
      });
  }, []);

  return (
    <Container ref={ref}>
      {!data || data === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cover />
          <SecondPage
            role={role}
            company={data?.profile || company}
            type={props.type}
          />
          <ThirdPage
            role={role}
            company={data?.profile || company}
            type={props.type}
          />
          {/* <MapPage role={role} company={selectedCompany[0]} type={props.type} /> */}
        </>
      )}
    </Container>
  );
});
