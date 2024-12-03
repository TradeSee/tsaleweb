import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAllAnalyticsData } from "../../../hooks/analytics";

const PageChart = () => {
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

  const countPages = () => {
    const rows = Object.keys(data).reduce((acc, key) => {
      const innerValues = Object.values(data[key]);
      acc.push(...innerValues);
      return acc;
    }, []);

    const pageCount = rows.reduce((acc, row) => {
      const page = row.page;
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {});

    return pageCount;
  };

  const pageCount = countPages();

  const labels = Object.keys(pageCount);
  const series = Object.values(pageCount);

  const chartData = {
    series,
    options: {
      chart: {
        type: "donut",
      },
      labels,
      title: {
        text: "Pages",
        align: "center",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="450"
      />
    </div>
  );
};

export default PageChart;
