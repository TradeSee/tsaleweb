import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLme } from "../../../hooks/getLME";
import { useEffect } from "react";
export default function TableLme() {
  const { lmeData } = useLme();
  const [series, setSeries] = React.useState([]);

  useEffect(() => {
    if (lmeData && lmeData.MtUSD?.cashe_price) {
      const newSeries = lmeData.MtUSD.cashe_price.map((item) => ({
        name: item[0],
        data: item.slice(1).map((value) => {
          const parsedValue = parseFloat(value.replace(",", ""));
          return Number(parsedValue.toFixed(2)).toLocaleString("en-US");
        }),
      }));

      setSeries(newSeries);
    }
  }, [lmeData]);
  const calculateMonthlyAverage = () => {
    const monthlyAverage = {};

    series.forEach((metal) => {
      if (Array.isArray(metal.data) && metal.data.length > 0) {
        const areAllNumbers = metal.data.every(
          (val) => !isNaN(parseFloat(val))
        );

        if (areAllNumbers) {
          const total = metal.data.reduce(
            (acc, val) => acc + parseFloat(val),
            0
          );
          const average = total / metal.data.length;
          monthlyAverage[metal.name] = average;
        } else {
          monthlyAverage[metal.name] = "Invalid data";
        }
      } else {
        monthlyAverage[metal.name] = "No data available";
      }
    });

    return monthlyAverage;
  };

  const monthlyAverage = calculateMonthlyAverage();

  const today = new Date();

  const headerNames = ["Date", ...series.map((item) => item.name)];
  const rows = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (3 - index));

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${month}/${day}`;

    const rowData = series.map((item) => item.data[index]);
    return { id: index, date: formattedDate, data: rowData };
  });

  return (
    <TableContainer component={Paper} sx={{ borderBottom: "none" }}>
      <Table
        sx={{ borderBottom: "none", minWidth: 500, maxWidth: 1400 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "none", backgroundColor: "#7D7C7C" }}>
            {headerNames.map((header, index) => (
              <TableCell
                sx={{ borderBottom: "none", color: "#fff" }}
                key={index}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              {row.data.map((value, index) => (
                <TableCell key={index} align="left">
                  $ {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow sx={{ borderBottom: "none", backgroundColor: "#931A25" }}>
            <TableCell sx={{ borderBottom: "none", color: "#fff" }}>
              Monthly average
            </TableCell>
            {series.map((metal) => (
              <TableCell sx={{ color: "#fff" }} key={metal.name} align="left">
                $ {monthlyAverage[metal.name]}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
