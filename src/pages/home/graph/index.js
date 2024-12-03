import React, { useEffect, useState } from "react";
import { ChartContainer } from "@mui/x-charts";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import ReactApexChart from "react-apexcharts";

import { getMetalPrice } from "../../../hooks/metalPrice";

const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E"];

export default function GraphDashboardHome({ ...props }) {
  return (
    <div style={props.style}>
      <ChartContainer
        width={props.width}
        height={props.height}
        series={[{ type: "line", data: props.data }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          ".MuiLineElement-root": {
            stroke: props.color,
            strokeWidth: 3,
          },
          ".MuiMarkElement-root": {
            stroke: "#fff",
            scale: "1",
            fill: props.color,
            strokeWidth: 2,
          },
        }}
        disableAxisListener
      >
        <LinePlot />
        <MarkPlot />
      </ChartContainer>
    </div>
  );
}

export function ChartsHome({ ...props }) {
  const [data, setData] = useState([]);

  const ChartOptions = {
    labels: props.labels,
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      show: false,
      categories: [""],
    },
    yaxis: {
      show: false,
    },

    colors: [data[2] < data[3] ? "#4abc96" : "#fd3c4f"],
  };

  function convertStringToNumber(number) {
    if (typeof number === "string") {
      return parseFloat(number?.replace(",", "."));
    }

    return parseFloat(number);
  }

  useEffect(() => {
    getMetalPrice().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        // pegando o primeiro objeto do array
        const firstData = props.metal || res[0];
        if (firstData) {
          const convertedData = [
            convertStringToNumber(firstData.value1 || "0"),
            convertStringToNumber(firstData.value2 || "0"),
            convertStringToNumber(firstData.value3 || "0"),
            convertStringToNumber(firstData.value4 || "0"),
          ];

          setData(convertedData);
        } else {
          console.error(
            "dados incompletos recebidos no primeiro objeto:",
            firstData
          );
        }
      } else {
        console.error("nenhum dado recebido ou formato inválido.");
      }
    });
  }, [props.metal]);

  return (
    <div id="chart" style={props.style}>
      <ReactApexChart
        options={ChartOptions}
        width={"90%"}
        height={"80%"}
        series={[{ name: "Tste", data: data }]}
        type="line"
      />
    </div>
  );
}
