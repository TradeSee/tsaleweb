import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllAnalyticsData } from "../../../hooks/analytics";
import { TagAction } from "../utils/tagAction";
import { ClearButton, InRow, MainFilter, Underline } from "./style.js";
import { DatePicker } from "antd";
import ClearIcon from "@mui/icons-material/Clear";
import { TextDefault } from "../../../assets/styles.js";
import ExcelExport from "../utils/pdfExport.js";
import * as XLSX from "xlsx";

const CustomTable = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAction, setSelectedAction] = useState("");
  const [filterPage, setFilterPage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    getAllAnalyticsData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Erro ao obter dados de Analytics:", error);
      });
  }, []);

  const rows = Object.keys(data).reduce((acc, key) => {
    const innerValues = Object.values(data[key]);
    acc.push(...innerValues);
    return acc;
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleFilterPage = (event) => {
    setFilterPage(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleClear = () => {
    setSelectedAction("");
    setFilterPage("");
    setStartDate(null);
    setEndDate(null);
    setSelectedUser("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${year}`;
    return formattedDate;
  };

  const filteredRows = rows
    .filter((row) => selectedAction === "" || row.action === selectedAction)
    .filter((row) => filterPage === "" || row.page === filterPage)
    .filter((row) => {
      if (startDate && endDate) {
        const rowDate = new Date(row.date);
        return rowDate >= startDate && rowDate <= endDate;
      }
      return true;
    })
    .filter((row) => selectedUser === "" || row.name === selectedUser);

  const sheetName = "Analytics Users";
  const excel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, sheetName + ".xlsx");
  };

  return (
    <div>
      <ExcelExport excel={excel} />
      <MainFilter>
        <TextDefault color={"#000000"} size={"20px"}>
          Filters
          <Underline />
        </TextDefault>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FormControl style={{ width: "130px" }}>
            <Select
              value={selectedUser}
              onChange={handleUserChange}
              style={{ height: "30px", marginLeft: "5px", marginRight: "5px" }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">All users</MenuItem>
              {Array.from(new Set(rows.map((row) => row.name))).map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "130px" }}>
            <Select
              value={selectedAction}
              onChange={handleActionChange}
              displayEmpty
              style={{ height: "30px" }}
            >
              <MenuItem value="">All Actions</MenuItem>
              <MenuItem value="Open Page">Open Page</MenuItem>
              <MenuItem value="Search">Search</MenuItem>
              <MenuItem value="Favorite">Favorite</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "130px" }}>
            <Select
              value={filterPage}
              onChange={handleFilterPage}
              style={{ height: "30px", marginLeft: "5px", marginRight: "5px" }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">All Pages</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Find new partner">Find new partner</MenuItem>
              <MenuItem value="Leads Enrichment">Leads Enrichment</MenuItem>
              <MenuItem value="Market Intelligence">
                Market Intelligence
              </MenuItem>
              <MenuItem value="Metal Price Details">
                Metal Price Details
              </MenuItem>
              <MenuItem value="LME">LME</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InRow>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
              />

              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
              />
            </InRow>
          </FormControl>
          <ClearButton onClick={handleClear}>
            {" "}
            <ClearIcon sx={{ fontSize: "1.2rem" }} />
            Clear
          </ClearButton>
        </div>
      </MainFilter>

      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Page</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <TagAction action={row.action} />
                  </TableCell>
                  <TableCell>{row.keywords}</TableCell>
                  <TableCell>{row.page}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
