import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAllAnalyticsData } from "../../../hooks/analytics";

const UserChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllAnalyticsData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Erro ao obter dados de Analytics:", error);
      });
  }, []);

  const countNames = () => {
    const rows = Object.keys(data).reduce((acc, key) => {
      const innerValues = Object.values(data[key]);
      acc.push(...innerValues);
      return acc;
    }, []);

    const nameCount = rows.reduce((acc, row) => {
      const name = row.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    return nameCount;
  };

  const nameCount = countNames();
  const labels = Object.keys(nameCount);
  const series = Object.values(nameCount);
  const total = series.reduce((a, b) => a + b, 0);

  const chartData = {
    series: labels.map((label, index) => ({
      x: label,
      y: series[index],
    })),
    chart: {
      height: 350,
      type: "treemap",
    },
    title: {
      text: `Total: ${labels?.length}`,
      align: "center",
    },
    colors: [
      "#3AA6B9",
      "#05BFDB",
      "#64CCC5",
      "#C1ECE4",
      "#97FEED",
      "#35A29F",
      "#85E6C5",
      "#C8FFE0",
      "#FF9551",
      "#FF4A4A",
      "#9A86A4",
      "#FBF46D",
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#151515"],
      },
    },
  };

  return (
    <div>
      <Chart
        options={{
          chart: chartData.chart,
          title: chartData.title,
          colors: chartData.colors,
          plotOptions: chartData.plotOptions,
          dataLabels: chartData.dataLabels,
        }}
        series={[{ data: chartData.series }]}
        type="treemap"
        width="400"
      />
    </div>
  );
};

export default UserChart;
