/* eslint-disable react/prop-types */
import { Text, StyleSheet } from "@react-pdf/renderer";

import Shipments from "./assets/shipments.svg";
import Partners from "./assets/partners.svg";
import Money from "./assets/money.svg";
import { Container } from "./styles";
import { format } from "date-fns";

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
    padding: "4px 12px ",
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
export default function BasicData({ role, toDate, fromDate }) {
  return (
    <div style={{ width: "80%" }}>
      <Container Role={role}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={styles.Card}>
            <div style={styles.Card.InfoContainer}>
              <Text style={styles.Card.Title}>CarmoDev</Text>
              <Text style={styles.Card.Desc}>Username</Text>
            </div>
          </div>

          <div style={styles.Card}>
            <div style={styles.Card.InfoContainer}>
              <Text style={styles.Card.Title}>{role}</Text>
              <Text style={styles.Card.Desc}>Role</Text>
            </div>
          </div>

          <div style={styles.Card}>
            <div style={styles.Card.InfoContainer}>
              <Text style={styles.Card.Title}>
                {format(new Date(fromDate), "MM/dd/yyyy")} -{" "}
                {format(new Date(toDate), "MM/dd/yyyy")}
              </Text>
              <Text style={styles.Card.Desc}>Period of the data</Text>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
