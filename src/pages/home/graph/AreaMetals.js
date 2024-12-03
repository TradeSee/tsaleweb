import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ReactApexChart from "react-apexcharts";

export default function AreaMetals() {
  const theme = useContext(ThemeContext);

  const data = {
    series: [
      {
        name: "Aluminium",
        type: "area",
        data: [23, 45, 31, 57, 12, 33, 11, 31, 46, 17, 33, 13],
      },
      {
        name: "Aluminium LME",
        type: "area",
        data: [64, 75, 61, 87, 42, 63, 41, 61, 76, 47, 63, 43],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      colors: ["#3961BC", "#A7C1F2"],
      stroke: {
        width: [2, 2],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.25, 0.25],
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
          text: "Price US$",
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
    <div id="chart" style={{ width: "100%", height: '100%' }}>
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
