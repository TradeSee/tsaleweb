import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getAllAnalyticsData } from "../../../hooks/analytics";

const ActionChart = () => {
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
  
    
    const countActions = () => {
        const rows = Object.keys(data).reduce((acc, key) => {
          const innerValues = Object.values(data[key]);
          acc.push(...innerValues);
          return acc;
        }, []);
    
        const actionCount = rows.reduce((acc, row) => {
          const action = row.action;
          acc[action] = (acc[action] || 0) + 1;
          return acc;
        }, {});
    
        return actionCount;
      };
    
      const actionCount = countActions();
    
      const labels = Object.keys(actionCount);
      const series = Object.values(actionCount);
    
      const chartData = {
        series,
        options: {
          chart: {
            type: "polarArea",
          },
          labels,
          title: {
            text: "Actions",
            align: "center",
          },
        },
      };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="polarArea"
        width="400"
      />
    </div>
  );
};

export default ActionChart;
