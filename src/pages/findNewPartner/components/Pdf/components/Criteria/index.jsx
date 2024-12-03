/* eslint-disable react/prop-types */
import { Text, StyleSheet } from "@react-pdf/renderer";
import { useContext } from "react";

import flagData from "../../../../utils/flag";
import { FlagContainer } from "./styles";

// Create styles
const styles = StyleSheet.create({
  ContainerFirst: {
    display: "flex",
    borderBottom: "1px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "space-evenly",
    paddingLeft: 24,
    backgroundColor: "#35495E",
  },
  Container: {
    display: "flex",
    borderBottom: "1px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "space-evenly",
    paddingLeft: 24,
    backgroundColor: "#ffffff",
  },
  Logo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fafafa",
  },
  CompanyName: {},
  InfoFirst: {
    fontSize: 12,
    textAlign: "left",
    whiteSpace: "nowrap",
    color: "#fafafa",
  },
  Info: {
    fontSize: 12,
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
  },
});

// Create Document Component
export function CriteriaFirst({ filters }) {
  const { role, qtyCompanies, name, lastName, email, hsCode } = filters;

  const pricePerCompany = 9.9;

  const pay = Math.ceil(qtyCompanies / 5) * pricePerCompany;

  function formatCurrency(valor) {
    if (valor >= 1000000000) {
      return "US$ " + (valor / 1000000000)?.toFixed(2) + " B";
    } else if (valor >= 1000000) {
      return "US$ " + (valor / 1000000)?.toFixed(2) + " M";
    } else if (valor >= 1000) {
      return "US$ " + (valor / 1000)?.toFixed(2) + " K";
    } else if (valor > 99999.99) {
      return "US$ " + valor?.toFixed(2).substr(0, 5);
    } else {
      return "US$ " + valor?.toFixed(2);
    }
  }

  return (
    <div style={styles.ContainerFirst}>
      <div style={styles.DocsInfo}>
        <Text style={styles.InfoFirst}>
          <strong>HS Codes:</strong>{" "}
          {hsCode.map((code, index) => (
            <span key={code + index}>{code.value}, </span>
          ))}
        </Text>
        <Text style={styles.InfoFirst}></Text>
        <Text style={styles.InfoFirst}>
          <strong>Role:</strong> {role}
        </Text>

        <Text style={styles.InfoFirst}>
          <strong>Qty of companies requested:</strong> {qtyCompanies}
        </Text>
      </div>

      <div style={styles.DocsInfo}>
        <Text style={styles.InfoFirst}>
          <strong>requester:</strong> {name} {lastName}
        </Text>
        <Text style={styles.InfoFirst}>
          <strong>E-mail:</strong> {email}
        </Text>
        <Text style={styles.InfoFirst}>
          <strong>Total:</strong> US$ {pay}
        </Text>
      </div>
    </div>
  );
}

export function Criteria({ role, company, type, filters }) {
  const label = company?.profile?.country;
  const selectedCountry = flagData.filter(
    (flag) => flag?.label?.toLowerCase() === label?.toLowerCase()
  );

  const Capitalize = (str) => {
    const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalizedStr;
  };

  return (
    <div style={{ display: "flex", width: "80%", marginTop: 12 }}>
      <FlagContainer Bg={selectedCountry[0]?.src} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginLeft: 24,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {company?.profile?.companyName?.toUpperCase()}
        </Text>

        {type !== "byName" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 12,
            }}
          >
            <Text style={styles.Info}>
              <strong>Country:</strong> {Capitalize(company?.country)}
            </Text>
            <Text style={styles.Info}>
              <strong>Role:</strong> {role}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
