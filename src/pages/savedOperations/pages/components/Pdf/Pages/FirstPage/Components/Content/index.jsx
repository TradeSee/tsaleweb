/* eslint-disable react/prop-types */
import { Text, StyleSheet } from "@react-pdf/renderer";

import { ChartLegend } from "./styles";

const styles = StyleSheet.create({
  Container: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    height: "75dvh",
  },
  Logo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontSize: 20,
    alignSelf: "flex-start",
  },
  TitleBold: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  Section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  Content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ContentNinety: {
    marginTop: 24,
    width: "90%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    padding: "8px 0",
    borderRadius: 8,
  },
  TextContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "30%",
  },
  Subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    fontSize: 16,
  },
  info: {
    display: "flex",
    alignItems: "left",
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 12,
    alignSelf: "flex-start",
  },
  infoMargin: {
    display: "flex",
    alignItems: "left",
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 12,
    alignSelf: "flex-start",
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function Content({ general, filters }) {
  const { companies, qtyCompanies } = filters;

  const qtyCountries = companies?.map(
    (company) =>
      company?.profile?.countriesExportingTo?.length +
      company?.profile?.countriesImportingFrom?.length
  );

  const sumCountries = qtyCountries?.reduce((acc, country) => acc + country, 0);

  const TotalPartners = general?.companies?.reduce(
    (acc, company) => acc + company.tradingPartnerCount,
    0
  );

  const TotalShipmentValue = general?.companies?.reduce(
    (acc, company) => acc + company.shipmentValue,
    0
  );

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
    <div style={styles.Container}>
      <div style={styles.Section}>
        <div style={styles.Content}>
          <div style={styles.TextContent}>
            <Text style={styles.Subtitle}>Total Companies</Text>

            <ChartLegend Color={"#4e5c67"}>Results: {qtyCompanies}</ChartLegend>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={styles.Subtitle}>Total Companies in last 5 years</Text>
          </div>
        </div>
      </div>

      <div style={styles.ContentNinety}>
        <div style={styles.TextContent}>
          <Text style={styles.TitleBold}>
            Total Partners <br />
            <span
              style={{
                whiteSpace: "nowrap",
                fontSize: 12,
                fontWeight: "normal",
              }}
            >
              (Buyers & Suppliers)
            </span>
          </Text>
          <Text style={styles.result}>{TotalPartners}</Text>
        </div>

        <div style={styles.TextContent}>
          <Text style={styles.TitleBold}>Total countries partners</Text>
          <Text style={styles.result}>{sumCountries}</Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.TitleBold}>
            Total Shipment value
            <br />
            <span
              style={{
                whiteSpace: "nowrap",
                fontSize: 12,
                fontWeight: "normal",
              }}
            >
              (US$ - All companies requested)
            </span>
          </Text>
          <Text style={styles.result}>
            {formatCurrency(TotalShipmentValue)}
          </Text>
        </div>
      </div>
    </div>
  );
}
