import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ReactApexChart from "react-apexcharts";

export default function ChartMixed() {
  const theme = useContext(ThemeContext);

  const data = {
    series: [
      {
        name: "Contacts Partners",
        type: "column",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },
      {
        name: "Published products",
        type: "area",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 23],
      },
      {
        name: "Interested Customers",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 12],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      colors: [theme.colors.main[500], "#4abc96", "#ff9800"],
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "2023-01-01",
        "2023-02-01",
        "2023-03-01",
        "2023-04-01",
        "2023-05-01",
        "2023-06-01",
        "2023-07-01",
        "2023-08-01",
        "2023-09-01",
        "2023-10-01",
        "2023-11-01",
        "2023-12-01",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Company",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
      },
    },
  };
  return (
    <div id="chart" style={{ width: "100%" }}>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}
