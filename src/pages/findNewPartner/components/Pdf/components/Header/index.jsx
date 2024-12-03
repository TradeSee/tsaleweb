/* eslint-disable react/prop-types */
import { Text, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

import Logotype from "../../../../assets/LogotypeWhite.png";

// Create styles
const styles = StyleSheet.create({
  Header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #000",
    borderTop: "1px solid #000",
    padding: "12px 32px",
    backgroundColor: "#10293E",
    width: "100%",
  },
  Logo: {
    width: 100,
  },
  Title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fafafa",
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
    color: "#fafafa",
  },
});

// Create Document Component
export default function Header() {
  return (
    <div style={styles.Header}>
      {/* <div>
        <img src={Logotype} style={styles.Logo} />
      </div> */}

      <div>
        <Text style={styles.Title}>Supply Chain - Analytic Data Record</Text>
      </div>

      {/* <div style={styles.DocsInfo}>
        <Text>Date: {format(new Date(), "MM/dd/yyyy")}</Text>
      </div> */}
    </div>
  );
}
