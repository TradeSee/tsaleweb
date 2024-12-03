/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { StyleSheet } from "@react-pdf/renderer";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

import { Table } from "./styles";
import ShipmentsCompany from "../../../../../../../service/Shipments";
import Capitalize from "../../../../../../../utils/capitalize";

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
export default function Content({ company }) {
  const [shipments, setShipments] = useState([]);

  const textStyle = { color: "#4D6484", fontWeight: "bold", height: "100%" };

  function filterShipments() {
    if (company?.shipment?.length === 0 || company?.shipments?.length === 0) {
      ShipmentsCompany(
        company?.profile?.id || company?.companyId,
        company?.companyName,
        company?.country
      ).then((res) => setShipments(res));
      return;
    }

    return setShipments(company?.shipment || company?.shipments);
  }

  useEffect(() => {
    filterShipments();
  }, [company]);

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
          Shipments
        </h3>
        <span
          style={{
            color: "#A7A7A7",
            fontSize: 12,
          }}
        >
          {company?.profile?.companyName.toUpperCase()}
        </span>
      </div>

      <Table colspan={3}>
        <tr>
          <th style={{ borderLeft: "1px solid #ccc" }}></th>
          <th>Company Name</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Country</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Shipment Date</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Transportation</th>
          <th style={{ borderRight: "1px solid #ccc" }}>ShipperName</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Port of Landing</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Port of Unlanding</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Shipment Value</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Shipment Weight</th>
        </tr>

        {shipments.map((shipment, index) => (
          <>
            <tr key={shipment.companyID}>
              <td style={{ borderLeft: "1px solid #ccc" }}>{index + 1}</td>
              <td>
                {shipment.consigneeName === ""
                  ? "-"
                  : Capitalize(shipment.consigneeName)}
              </td>
              <td style={{ borderRight: "1px solid #ccc" }}>
                {shipment.consigneeCountry === ""
                  ? "-"
                  : Capitalize(shipment.consigneeCountry)}
              </td>
              <td>{format(new Date(shipment.shipmentDate), "MM/dd/yyyy")}</td>
              <td style={{ borderRight: "1px solid #ccc" }}>
                {shipment.modeOfTransportation === ""
                  ? "-"
                  : Capitalize(shipment.modeOfTransportation)}
              </td>
              <td style={{ borderRight: "1px solid #ccc" }}>
                {shipment.shipperName === ""
                  ? "-"
                  : Capitalize(shipment.shipperName)}
              </td>
              <td>
                {shipment.portOfLading === "" ? "-" : shipment.portOfLading}
              </td>
              <td style={{ borderRight: "1px solid #ccc" }}>
                {shipment.portOfUnlading === "" ? "-" : shipment.portOfUnlading}
              </td>
              <td>{shipment.shipmentValue < 0 ? 0 : shipment.shipmentValue}</td>
              <td style={{ borderRight: "1px solid #ccc" }}>
                {shipment.shipmentWeight < 0 ? 0 : shipment.shipmentWeight}
              </td>
            </tr>
          </>
        ))}
      </Table>
    </div>
  );
}
