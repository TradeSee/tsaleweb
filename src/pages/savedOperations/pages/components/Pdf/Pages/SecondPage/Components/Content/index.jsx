/* eslint-disable react/prop-types */
import { StyleSheet } from "@react-pdf/renderer";
import ReactApexChart from "react-apexcharts";

import { Table } from "./styles";

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
  const selectedHsCodes =
    role === "Supplier"
      ? company?.exported6DigitHsCodes?.filter((_, index) => index <= 9)
      : company?.imported6DigitHsCodes?.filter((_, index) => index <= 9);

  const hsCodesLabel = selectedHsCodes.map((code) => code.hscode);
  const hsCodesData = selectedHsCodes.map((code) => code.percentageShare);

  const ChartOptionsColumn = {
    labels: hsCodesLabel,
    fill: {
      colors: ["#4e5c67"],
    },
    dataLabels: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 80,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FFD700", "#FFA500"],
    },
  };

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
          width: "90%",
        }}
      >
        <h3
          style={{
            color: "#4B4B4B",
            fontSize: 16,
          }}
        >
          Top 10 Hs Codes
        </h3>
        <span
          style={{
            color: "#A7A7A7",
            fontSize: 12,
          }}
        >
          {company.companyName.toUpperCase()}
        </span>
      </div>
      <Table colspan={3}>
        <tr>
          <th style={{ borderLeft: "1px solid #ccc" }}></th>
          <th>Hs Code</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Shipment Value</th>
        </tr>
        {selectedHsCodes.map((code, index) => (
          <>
            {index <= 9 && (
              <tr key={code.key}>
                <td style={{ borderLeft: "1px solid #ccc" }}>{index + 1}</td>
                <td>{code.hscode}</td>
                <td style={{ borderRight: "1px solid #ccc" }}>
                  {formatCurrency(code.percentageShare)}
                </td>
              </tr>
            )}
          </>
        ))}
      </Table>

      <ReactApexChart
        options={ChartOptionsColumn}
        type="bar"
        series={[{ name: ["Hs Codes"], data: hsCodesData }]}
        height={200}
        width={650}
      />

      {role === "Supplier" ? (
        <p
          style={{
            fontSize: 12,
            maxWidth: "90%",
            background: "#F4F4F4",
            padding: 8,
            borderRadius: 4,
          }}
        >
          <strong>TOP 10 HS CODES: </strong>is the relation quantity in US$ per
          HS Code, that this company exported as a Supplier in the last 12
          months. The chart is presented in a pareto form according to the
          sales/exports made.
        </p>
      ) : (
        <p
          style={{
            fontSize: 12,
            maxWidth: "90%",
            marginRight: 48,
            background: "#F4F4F4",
            padding: 8,
            borderRadius: 4,
          }}
        >
          <strong>TOP 10 HS CODES: </strong>is the quantity relation in US$ per
          HS code this company imported as a buyer in the last 12 months. The
          chart is present in a pareto form according to the purchases/imports
          made.
        </p>
      )}
    </div>
  );
}
