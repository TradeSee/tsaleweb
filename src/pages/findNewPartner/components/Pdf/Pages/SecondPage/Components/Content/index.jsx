/* eslint-disable react/prop-types */
import { StyleSheet } from "@react-pdf/renderer";
import { Table } from "./styles";
import useFNP from "../../../../../../useFNP";
import { useCallback, useMemo } from "react";

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 4,
  },
  Logo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontSize: 28,
    alignSelf: "flex-start",
  },
  TitleBold: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  Section: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
  },
  Content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  TextContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "20%",
  },
  Subtitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  infoMargin: {
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
  },
});

// Create Document Component
export default function Content({ role, company }) {
  const { allHsCodes } = useFNP();

  const handleGetHsName = useCallback(
    (code) => allHsCodes.filter((hs) => hs.hsCode === code)[0]?.hsName,
    [allHsCodes]
  );

  const selectedHsCodes =
    role === "Supplier"
      ? company?.exported6DigitHsCodes
      : company?.imported6DigitHsCodes;

  function formatCurrency(valor) {
    if (valor >= 1000000000) {
      return "$ " + (valor / 1000000000)?.toFixed(2) + " B";
    } else if (valor >= 1000000) {
      return "$ " + (valor / 1000000)?.toFixed(2) + " M";
    } else if (valor >= 1000) {
      return "$ " + (valor / 1000)?.toFixed(2) + " K";
    } else if (valor > 99999.99) {
      return "$ " + valor?.toFixed(2).substr(0, 5);
    } else {
      return "$ " + valor?.toFixed(2);
    }
  }

  return (
    <div style={styles.Container}>
      <div
        style={{
          width: "80%",
        }}
      >
        <h3
          style={{
            color: "#4B4B4B",
            fontSize: 16,
          }}
        >
          Top Hs Codes
        </h3>
        <span
          style={{
            color: "#A7A7A7",
            fontSize: 12,
          }}
        >
          {company?.companyName?.toUpperCase()}
        </span>
      </div>
      <Table colspan={3}>
        <tr>
          <th style={{ borderLeft: "1px solid #ccc" }}></th>
          <th>Hs Code</th>
          <th>Hs Name</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Market Share</th>
        </tr>
        {selectedHsCodes?.length > 0 &&
          selectedHsCodes?.map((code, index) => (
            <>
              {index < 10 && (
                <tr key={code.key}>
                  <td style={{ borderLeft: "1px solid #ccc" }}>{index + 1}</td>
                  <td>{code?.hscode}</td>
                  <td>{handleGetHsName(code?.hscode?.slice(0, 4))}</td>

                  <td style={{ borderRight: "1px solid #ccc" }}>
                    {code?.percentageShare.toFixed(2)}%
                  </td>
                </tr>
              )}
            </>
          ))}
      </Table>

      {role === "Supplier" ? (
        <p
          style={{
            fontSize: 12,
            maxWidth: "85%",
            marginLeft: 40,
            background: "#F4F4F4",
            padding: 8,
            borderRadius: 4,
          }}
        >
          <strong>TOP HS CODES: </strong>is the relation quantity in US$ per HS
          Code, that this company exported as a Supplier in the last 12 months.
          The chart is presented in a pareto form according to the sales/exports
          made.
        </p>
      ) : (
        <p
          style={{
            fontSize: 12,
            marginLeft: 40,
            maxWidth: "85%",
            marginRight: 48,
            background: "#F4F4F4",
            padding: 8,
            borderRadius: 4,
          }}
        >
          <strong>TOP HS CODES: </strong>is the quantity relation in US$ per HS
          code this company imported as a buyer in the last 12 months. The chart
          is present in a pareto form according to the purchases/imports made.
        </p>
      )}
    </div>
  );
}
