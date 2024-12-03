/* eslint-disable react/prop-types */
import { Text, StyleSheet } from "@react-pdf/renderer";

import Shipments from "./assets/shipments.svg";
import Partners from "./assets/partners.svg";
import Money from "./assets/money.svg";
import { Container } from "./styles";

// Create styles
const styles = StyleSheet.create({
  Header: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
  },
  Role: {
    title: {
      fontSize: 16,
      color: "#fafafa",
      fontWeight: "bold",
    },
    display: "flex",
    flexDirection: "column",
    paddingLeft: 8,
    borderRadius: 8,
    paddingBottom: 8,
    paddingTop: 8,
  },

  Card: {
    display: "flex",
    alignItems: "center",
    padding: 4,
    borderRadius: 8,
    backgroundColor: "#fafafa",

    InfoContainer: {
      display: "flex",
      flexDirection: "column",
    },

    Title: {
      fontWeight: "bold",
    },

    Desc: {
      fontSize: 12,
    },
  },
});

// Create Document Component
export default function BasicData({ role, company, general, type }) {
  function formatCurrency(valor) {
    if (valor >= 1000000000) {
      return "USD " + (valor / 1000000000)?.toFixed(2) + " B";
    } else if (valor >= 1000000) {
      return "USD " + (valor / 1000000)?.toFixed(2) + " M";
    } else if (valor >= 1000) {
      return "USD " + (valor / 1000)?.toFixed(2) + " K";
    } else if (valor > 99999.99) {
      return "USD " + valor?.toFixed(2).substr(0, 5);
    } else {
      return "USD " + valor?.toFixed(2);
    }
  }

  function formatShip(valor) {
    if (valor >= 1000000000) {
      return (valor / 1000000000)?.toFixed(0) + " B";
    } else if (valor >= 1000000) {
      return (valor / 1000000)?.toFixed(0) + " M";
    } else if (valor >= 1000) {
      return (valor / 1000)?.toFixed(0) + " K";
    } else if (valor > 99999.99) {
      return valor?.toFixed(0).substr(0, 5);
    } else {
      return valor?.toFixed(0);
    }
  }

  return (
    <div style={{ width: "80%" }}>
      <Container Role={role}>
        <div style={styles.Role}>
          <Text style={styles.Role.title}>As {role}:</Text>
          <Text style={{ fontWeight: "bold", color: "#fafafa", fontSize: 12 }}>
            *Last 12 months.
          </Text>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {type !== "byName" && (
            <div style={styles.Card}>
              <img
                src={Shipments}
                style={{ marginRight: 8 }}
                width={32}
                height={32}
                alt="Shipments"
              />

              <div style={styles.Card.InfoContainer}>
                <Text style={styles.Card.Title}>
                  {formatShip(
                    company.totalShipmentsExportedCount +
                      company.totalShipmentsImportedCount
                  )}
                </Text>
                <Text style={styles.Card.Desc}>Total number of shipments</Text>
              </div>
            </div>
          )}

          <div style={styles.Card}>
            <img
              src={Partners}
              style={{ marginRight: 8 }}
              width={32}
              height={32}
              alt="Partners"
            />

            <div style={styles.Card.InfoContainer}>
              <Text style={styles.Card.Title}>
                {formatShip(
                  company?.importTradingPartnerCount +
                    company?.exportTradingPartnerCount
                )}
              </Text>
              <Text style={styles.Card.Desc}>
                Total number of trading partners
              </Text>
            </div>
          </div>

          {type !== "byName" && (
            <div style={styles.Card}>
              <img
                src={Money}
                style={{ marginRight: 8 }}
                width={32}
                height={32}
                alt="Money"
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
