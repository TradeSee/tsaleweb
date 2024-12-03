import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getMetalPrice } from "../../../../hooks/metalPrice";
import CircularProgress from "@mui/material/CircularProgress";

const AreaChart = ({ metalData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMetalPrice().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        // pegando o primeiro objeto do array
        const firstData = metalData || res[0];
        if (firstData) {
          const convertedData = {
            MetalName: firstData.MetalName || "N/A",
            value1: parseFloat(firstData.value1?.replace(",", ".") || "0"),
            value2: parseFloat(firstData.value2?.replace(",", ".") || "0"),
            value3: parseFloat(firstData.value3?.replace(",", ".") || "0"),
            value4: parseFloat(firstData.value4?.replace(",", ".") || "0"),
          };

          setData(convertedData);
          setLoading(false);
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
  }, [metalData]);

  const options = {
    chart: {
      id: "basic-area",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["", data?.MetalName],
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [data?.value1, data?.value2, data?.value3, data?.value4],
    },
  ];

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={280}
          width={700}
        />
      )}
    </div>
  );
};

export default AreaChart;
