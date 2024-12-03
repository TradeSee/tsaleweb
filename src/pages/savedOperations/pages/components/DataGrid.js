import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import country from "../../../../components/Flag";
import Capitalize from "../../../../utils/capitalize";
import { ActionButton } from "./styles";
//Modelo de teste para tabela

export default function DataGridDemo({ ...props }) {
  const textStyle = { color: "#4D6484", fontWeight: "bold" };

  function formatCurrency(valor) {
    if (valor >= 1000000000) {
      return "USD " + (valor / 1000000000)?.toFixed(2) + " B";
    } else if (valor >= 1000000) {
      return "USD " + (valor / 1000000)?.toFixed(2) + " M";
    } else if (valor >= 1000) {
      return "USD " + (valor / 1000)?.toFixed(2) + " K";
    } else if (valor > 99999.99) {
      return "USD " + valor?.toFixed(2).substr(0, 5);
    } else {
      return "USD " + valor?.toFixed(2);
    }
  }

  const columns = [
    {
      field: "country",
      headerName: "Country",
      width: 300,
      editable: false,
      renderCell: (params) => (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt={params.row.country}
            src={renderFlag(params.row.country)}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
          <p style={{ marginLeft: 10, fontWeight: 400 }}>
            {Capitalize(params.row.country)}
          </p>
        </div>
      ),
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <p style={{ fontWeight: 400 }}>{Capitalize(params.row.companyName)}</p>
      ),
    },

    {
      field: "companyRole",
      headerName: "Role",
      editable: false,
      width: 140,
      renderCell: (params) => (
        <p style={{ fontWeight: 400 }}>{params.row.role}</p>
      ),
    },
    {
      field: "action",
      headerName: "",
      editable: false,
      width: 110,
      renderCell: () => (
        <span
          style={{
            fontWeight: 400,
            color: "#366DFB",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Visit Profile
        </span>
      ),
    },
  ];

  const renderFlag = (countryName) => {
    const filterCountry = country.filter(
      (obj) => obj.country.toLocaleLowerCase() === countryName
    );
    return filterCountry[0].src;
  };

  const getCustomRowId = (row) => {
    return row.id;
  };

  return (
    <Box sx={{ height: "100%", width: "98%" }}>
      <DataGrid
        style={textStyle}
        rows={props.data}
        columns={columns}
        hideFooter
        hideFooterPagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[5]}
        density="standard"
        getRowId={getCustomRowId}
        onRowClick={(e) => props.clickRow(e.id, props.data)}
      />
    </Box>
  );
}
