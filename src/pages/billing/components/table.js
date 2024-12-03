import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const data = [
  { label: "Plans", value1: "Premium", value2: "Gold", value3: "App" },
  { label: "Credits", value1: 1000, value2: 500, value3: 100 },
  { label: "Users", value1: 5, value2: 3, value3: 1 },
  {
    label: "Trade Data",
    value1: <CheckIcon sx={{ color: "#089981" }} />,
    value2: <CheckIcon sx={{ color: "#089981" }} />,
    value3: <CheckIcon sx={{ color: "#089981" }} />,
  },
  {
    label: "Simulator",
    value1: <CheckIcon sx={{ color: "#089981" }} />,
    value2: <CheckIcon sx={{ color: "#089981" }} />,
    value3: <CheckIcon sx={{ color: "#089981" }} />,
  },
  {
    label: "News",
    value1: <CheckIcon sx={{ color: "#089981" }} />,
    value2: <CheckIcon sx={{ color: "#089981" }} />,
    value3: <CheckIcon sx={{ color: "#089981" }} />,
  },
  {
    label: "Report & Analytics",
    value1: <CheckIcon sx={{ color: "#089981" }} />,
    value2: <CheckIcon sx={{ color: "#089981" }} />,
    value3: <ClearIcon sx={{ color: "#DE4B1D" }} />,
  },
  {
    label: "CarbonCredit",
    value1: <CheckIcon sx={{ color: "#089981" }} />,
    value2: <CheckIcon sx={{ color: "#089981" }} />,
    value3: <ClearIcon sx={{ color: "#DE4B1D" }} />,
  },
];

const TablePlan = () => {
  return (
    <TableContainer
      style={{ width: "65%", marginLeft: "50px" }}
      component={Paper}
    >
      <Table style={{ width: "100%" }}>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#E9EDF8",
                },
                "&:nth-of-type(even)": {
                  backgroundColor: "#FFFFF",
                },
              }}
            >
              <TableCell style={{ width: "3%" }}>{row.label}</TableCell>
              <TableCell style={{ width: "6%" }}>{row.value1}</TableCell>
              <TableCell style={{ width: "5%" }}>{row.value2}</TableCell>
              <TableCell style={{ width: "4%" }}>{row.value3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePlan;
