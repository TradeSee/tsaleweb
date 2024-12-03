import { Text, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  Header: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

// Create Document Component
export default function Footer() {
  return (
    <div style={styles.Header}>
      <Text style={{ fontSize: 8, color: "#B7BCC3" }}>
        Analytics Data managed and offered by T-Sale Metals. -
        www.tsalemetals.com - All rights reserved
      </Text>
    </div>
  );
}
