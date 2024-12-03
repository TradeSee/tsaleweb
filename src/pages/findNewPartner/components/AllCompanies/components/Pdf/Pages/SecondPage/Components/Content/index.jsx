/* eslint-disable react/prop-types */
import { StyleSheet } from "@react-pdf/renderer";
import { Table } from "./styles";
import { Chart } from "react-google-charts";
import ReactApexChart from "react-apexcharts";
import Capitalize from "../../../../../../../../../../utils/capitalize";

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

/* eslint-disable react/prop-types */

const stylesTable = StyleSheet.create({
  Container: {
    paddingBottom: 24,
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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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

function GeneralData({ companies, general, maxCompanies }) {
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
        text: "Top 5 Most Relevant Companies",
        align: "center",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
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
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
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
        categories: companiesNames,
      },
    },
  };

  const qtyCompanies = maxCompanies || companies.length;
  return (
    <div style={stylesTable.Container}>
      <div style={stylesTable.Section}>
        <div style={stylesTable.Content}>
          <div style={{ height: "100%", width: "2px", background: "#fff" }} />
        </div>
      </div>

      <div style={stylesTable.ContentNinety}>
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
          width={450}
          height="500px"
          legendToggle
          options={{
            colorAxis: { colors: ["#76BAEC"], minValue: 0 },
            datalessRegionColor: "#4C5B66",
            legend: {
              position: "none",
            },
          }}
          data={[
            ["Country", "Qty. Companies"],
            [`${Capitalize(companies[0].country)}`, qtyCompanies],
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
          width={"250%"}
        />
      </div>
    </div>
  );
}

// Create Document Component
export default function Content({ role, company, general, generalData }) {
  return (
    <div style={styles.Container}>
      <GeneralData
        companies={company}
        general={general}
        maxCompanies={generalData?.totalCompanies}
      />
    </div>
  );
}
