/* eslint-disable react/prop-types */
import { StyleSheet } from "@react-pdf/renderer";
import ReactApexChart from "react-apexcharts";

import { Table } from "./styles";

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
    width: "100%",
  },
  Content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  ContentNinety: {
    marginTop: 64,
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
    marginTop: 24,
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

export default function Content2({ role, company }) {
  const TopPartners =
    role === "Supplier"
      ? company?.exportTradingPartners?.filter((_, index) => index <= 4)
      : company?.importTradingPartners?.filter((_, index) => index <= 4);

  const PartnersLabels = TopPartners?.map((trade) =>
    trade.companyName?.toUpperCase()
  );

  const PartnersData =
    TopPartners && TopPartners?.map((trade) => trade.percentageShare);

  const ChartOptionsCompanies = {
    labels: PartnersLabels,

    dataLabels: {
      enabled: true,
    },
    fill: {
      colors: ["#4e5c67", "#5db888", "#5791c8", "#c35684", "#366dfb"],
    },
    legend: {
      show: true,
      position: "right",
      labels: {
        colors: ["#4e5c67", "#5db888", "#5791c8", "#c35684", "#366dfb"],
      },
      markers: {
        fillColors: ["#4e5c67", "#5db888", "#5791c8", "#c35684", "#366dfb"],
      },
    },
    options: {
      chart: {
        type: "donut",
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "100%",
          },
        },
      },
    },
  };

  const TradingPartners =
    role === "Supplier"
      ? company?.profile?.exportTradingPartners
      : company?.profile?.importTradingPartners;

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
          Top 5 Trade Partners{" "}
          {role === "Supplier" ? "(Clients)" : "(Supplier)"}
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
          <th></th>
          <th>Company Name</th>
          <th>Country</th>
          <th>Market Share</th>
        </tr>
        {TradingPartners?.map((company, index) => (
          <>
            {index <= 4 && (
              <tr key={company?.companyID}>
                <td>{index + 1}</td>
                <td>{company?.companyName?.toUpperCase()}</td>
                <td>{company?.country?.toUpperCase()}</td>
                <td>{company?.percentageShare?.toFixed(0)}%</td>
              </tr>
            )}
          </>
        ))}
      </Table>

      {TopPartners && (
        <ReactApexChart
          options={ChartOptionsCompanies}
          type="pie"
          series={PartnersData}
          width={600}
          height={140}
        />
      )}

      <p
        style={{
          fontSize: 12,
          maxWidth: "80%",
          bottom: 0,
          right: 0,
          background: "#F4F4F4",
          padding: 12,
          borderRadius: 8,
          height: "min-content",
        }}
      >
        <strong>Top 5 Trade Partners: </strong>
        {`are the main business partners and customs responsible for the purchase of this company’s products. In this listing, you can find the market share of each one as well as the partner's location.`}
      </p>
    </div>
  );
}
