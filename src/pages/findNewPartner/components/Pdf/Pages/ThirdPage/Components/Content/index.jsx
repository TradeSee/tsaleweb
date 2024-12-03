/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet } from "@react-pdf/renderer";

import { Table } from "./styles";

const styles = StyleSheet.create({
  Container: {
    columnGap: 8,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    flex: 1,
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  Section: {
    display: "flex",
    alignItems: "center",
    width: "90%",
  },
  Content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  ContentNinety: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  infoMargin: {
    marginTop: 24,
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 16,
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
  },
});

// Create Document Component
export default function Content({ role, company }) {
  const countries =
    role === "Supplier"
      ? company?.countriesExportingTo
      : company?.countriesImportingFrom;

  return (
    <div style={styles.Container}>
      <div
        style={{
          width: "100%",
        }}
      >
        <h3
          style={{
            color: "#4B4B4B",
            fontSize: 16,
          }}
        >
          {role === "Supplier"
            ? "Top 5 Ports of landing"
            : "Top 5 Ports of unlanding"}
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
          {role === "Supplier"
            ? "Top 5 Buyer Countries (by value)"
            : "Top 5 Supplier Countries (by value)"}
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
          <th>Name</th>
          <th style={{ borderRight: "1px solid #ccc" }}>Market share</th>
        </tr>

        {role === "Supplier" &&
          company?.portsOfLading?.map((company, index) => (
            <>
              {index <= 4 && (
                <tr key={company.companyID}>
                  <td style={{ borderLeft: "1px solid #ccc" }}>{index + 1}</td>
                  <td>{company.port}</td>
                  <td style={{ borderRight: "1px solid #ccc" }}>
                    {company.percentageShare.toFixed(0)}%
                  </td>
                </tr>
              )}
            </>
          ))}
        {role === "Buyer" &&
          company?.portsOfUnlading?.map((company, index) => (
            <>
              {
                <tr key={company.companyID}>
                  <td style={{ borderLeft: "1px solid #ccc" }}>{index + 1}</td>
                  <td>{company.port}</td>
                  <td style={{ borderRight: "1px solid #ccc" }}>
                    {company.percentageShare.toFixed(0)}%
                  </td>
                </tr>
              }
            </>
          ))}
      </Table>

      <Table colspan={3}>
        <tr>
          <th></th>
          <th>Country</th>
          <th>Market Share</th>
        </tr>
        {countries?.map((company, index) => (
          <React.Fragment key={index + 2}>
            {index < 30 && (
              <tr>
                <td>{index + 1}</td>
                <td>{company?.country?.toUpperCase()}</td>
                <td>{company?.percentageShare?.toFixed(0)}%</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </Table>

      {role === "Supplier" ? (
        <p
          style={{
            fontSize: 16,
            maxWidth: "100%",
            background: "#F4F4F4",
            padding: 4,
            borderRadius: 4,
            height: "min-content",
          }}
        >
          <strong>TOP PORTS OF LANDING: </strong>are the ports used by the
          company to ship its cargoes overseas. This criterion can be based on
          your location as well as the distribution center, federal or state
          taxes, and partnership with warehouse and international traders.
        </p>
      ) : (
        <p
          style={{
            fontSize: 12,
            maxWidth: "100%",
            background: "#F4F4F4",
            padding: 4,
            borderRadius: 4,
          }}
        >
          <strong>TOP PORTS OF UNLANDING: </strong>are ports used by the company
          to receive its cargoes sent by its suppliers. This criterion can be
          based on your location as well as the distribution centers, federal or
          state taxes and partnership with warehouse and international traders
        </p>
      )}

      {role === "Supplier" ? (
        <p
          style={{
            fontSize: 16,
            maxWidth: "100%",
            background: "#F4F4F4",
            padding: 12,
            height: "min-content",
            borderRadius: 8,
          }}
        >
          <strong>Top Buyer Countries: </strong> buyers are the main countries
          where the products of this company are being sold/exported.
        </p>
      ) : (
        <p
          style={{
            fontSize: 16,
            maxWidth: "100%",
            background: "#F4F4F4",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <strong>Top Supplier Countries: </strong> are the main countries where
          this company is importing products.
        </p>
      )}
    </div>
  );
}