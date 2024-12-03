/* eslint-disable react/prop-types */
import { StyleSheet } from "@react-pdf/renderer";
import { Chart } from "react-google-charts";
import ReactApexChart from "react-apexcharts";

import Capitalize from "../../../../utils/capitalize";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

const styles = StyleSheet.create({
  Container: {
    paddingBottom: 48,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    width: "100%",
    height: "55dvh",
  },
  Logo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  TitleBold: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
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
    marginTop: 64,
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
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
  result: {
    fontSize: 20,
  },
  info: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  infoMargin: {
    display: "flex",
    alignItems: "center",
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

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

export default function GeneralData({ companies, general, maxCompanies }) {
  const theme = useContext(ThemeContext);

  function calculateCompanyRevenue(company) {
    return (
      (company.shipmentValue / company.numberOfShipments) *
      (company.tradingPartnerCount * 2)
    );
  }

  const newCompanies = companies.map((company) => ({
    ...company,
    relevance: calculateCompanyRevenue(company),
  }));

  const SortedCompanies = newCompanies
    .sort((a, b) => b.relevance - a.relevance)
    .filter((_, index) => index <= 4);

  const tradingPartners = SortedCompanies.map(
    (company) => company.tradingPartnerCount
  );

  const companiesNames = SortedCompanies.map((company) => company.companyName);

  const formattedCompanyNames = companiesNames.map((company) => {
    const words = company.split(" ");
    return Capitalize(words.slice(0, 2).join(" "));
  });

  const ChartOptionsMovings = {
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Top 5 Companies",
        align: "center",
      },
      subtitle: {
        text: "Scored by: Shipment value, Volume and Trade parters",
        align: "center",
      },
      grid: {
        row: {
          colors: [`${theme.colors.gray[50]}`, "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: theme.colors.main[100],
              colorTo: theme.colors.main[400],
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
          fomratter: function (name) {
            Capitalize(name);
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (name, val) {
              Capitalize(name);

              const value = val.series[0][val.dataPointIndex];

              if (value >= 1000000000) {
                return value / 1000000000 + " B";
              } else if (value >= 1000000) {
                return value / 1000000 + " M";
              } else if (value >= 1000) {
                return value / 1000 + " K";
              } else {
                return value;
              }
            },
          },
        },
        categories: formattedCompanyNames,
      },
    },
  };

  const qtyCompanies = maxCompanies || 0;
  return (
    <div style={styles.Container}>
      <div style={styles.Section}>
        <div style={styles.Content}>
          <div style={{ height: "100%", width: "2px", background: "#fff" }} />
        </div>
      </div>

      <div style={styles.ContentNinety}>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
              },
            },
          ]}
          chartType="GeoChart"
          width={400}
          height="450px"
          legendToggle
          options={{
            colorAxis: { colors: [theme.colors.main[400]], minValue: 0 },
            datalessRegionColor: theme.colors.main[100],
            legend: {
              position: "none",
            },
          }}
          data={[
            ["Country", "Qty. Companies"],
            [
              `${Capitalize(companies[0].country)}`,
              qtyCompanies === 0 ? companies.length : qtyCompanies,
            ],
          ]}
        />

        <ReactApexChart
          options={ChartOptionsMovings.options}
          series={[
            {
              name: "Qty. Partners",
              data: tradingPartners,
            },
          ]}
          type="bar"
          height={400}
          width={window.innerWidth >= 1400 ? "200%" : "100%"}
        />
      </div>
    </div>
  );
}
