import React from "react";
import ReactApexChart from "react-apexcharts";

function LineChart({ data }) {
  function getLast4Days() {
    const today = new Date();
    const categories = [];

    for (let i = 0; i < 4; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const formattedDate = `${day.getMonth() + 1}/${day.getDate()}`;
      categories.unshift(formattedDate);
    }

    return categories;
  }
  const last4DaysCategories = getLast4Days();

  const dataValues = data.map((obj) => {
    return {
      name: obj.MetalName,
      data: [obj.value1, obj.value2, obj.value3, obj.value4],
    };
  });

  const chartData = {
    series: dataValues,
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        position: "right",
      },
      stroke: {
        curve: "smooth",
      },
      // title: {
      //   text: "Market Intelligence Chart",
      //   align: "left",
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: last4DaysCategories,
      },
      yaxis: {
        opposite: true,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        width="100%"
        height={"250%"}
        type="line"
      />
    </div>
  );
}

export default LineChart;
