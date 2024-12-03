/* eslint-disable react/prop-types */
import { Text } from "@react-pdf/renderer";

import flagData from "../../../../utils/flag";
import { Container } from "./styles";

// Create Document Component
export default function Introduction({ company, Index }) {
  const label = company?.profile?.country;
  const selectedCountry = flagData.filter(
    (flag) => flag.label.toLowerCase() === label?.toLowerCase()
  );

  return (
    <Container>
      <div
        style={{
          paddingTop: 32,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={selectedCountry[0]?.src}
          alt={selectedCountry[0]?.label}
          width={240}
          height={240}
          style={{
            borderRadius: "100%",
          }}
        />

        <div key={Index + 2} style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 48, fontWeight: "bold", marginLeft: 24 }}>
            {Index + 1}.
          </Text>

          <Text style={{ fontSize: 48, marginLeft: 12 }}>
            {" "}
            {company?.profile?.companyName?.toUpperCase()}
          </Text>
        </div>
      </div>
    </Container>
  );
}
