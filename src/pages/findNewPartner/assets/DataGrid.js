import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import country from "../../../components/Flag";
import Capitalize from "../../../utils/capitalize";
import { format } from "date-fns";
import formatToCurrency from "../../../utils/formatToCurrency";
import "./dataGrid.css";
import { Delete } from "@mui/icons-material";
import { ThemeContext } from "styled-components";

import AllModal from "../../../components/AllModal";
import { message } from "antd";
import { DeleteButton } from "./styles";

//Modelo de teste para tabela

export default function DataGridDemo({ ...props }) {
  const theme = React.useContext(ThemeContext);
  const [rowsToDelete, setRowsToDelete] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const textStyle = {
    color: theme.colors.gray[700],
    fontWeight: "bold",
    cursor: "pointer",
  };
  const buttonStyle = {};

  const columnsNew = [
    props.dataType === "New" && {
      field: "rank",
      headerName: "Ranking",
      width: 120,
      editable: false,
    },
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
          {props?.selectedCountry?.toLowerCase() !==
          params.row?.country?.toLowerCase() ? (
            <div className="containerImage">
              <img
                alt={props.selectedCountry}
                src={renderFlag(props.selectedCountry)}
                className="firstImage"
              />
              <img
                alt={params.row.country}
                src={renderFlag(params.row.country)}
                className="secondImage"
              />
            </div>
          ) : (
            <img
              alt={params.row.country}
              src={renderFlag(params.row.country)}
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
          )}

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
    props.filterBy === "hsCode" && {
      field: "Shipment Value",
      headerName: "Shipment Value (USD)",
      flex: 1,
      editable: false,
      valueGetter: (params) => params.row.shipmentValue,
      renderCell: (params) => (
        <p style={{ fontWeight: 400 }}>
          {params.row.shipmentValue === 1 || params.row.shipmentValue === -1
            ? "-"
            : formatToCurrency(params.row.shipmentValue)}
        </p>
      ),
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "companyRole",
      headerName: "Role",
      editable: false,
      width: 140,
      renderCell: (params) => <p style={{ fontWeight: 400 }}>{props.role}</p>,
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
            color: theme.colors.main[500],
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Visit Profile
        </span>
      ),
    },
  ];

  const columnsFavorite = [
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
      field: "savedAt",
      headerName: "Saved At",
      editable: false,
      flex: 1,
      renderCell: (params) => (
        <p style={{ fontWeight: 400 }}>
          {params.row?.savedAt
            ? format(new Date(params.row?.savedAt), "MM/dd/yyyy")
            : "Not Informed"}
        </p>
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
            color: theme.colors.main[500],
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Visit Profile
        </span>
      ),
    },
    props.dataType === "Favorited" && {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 100,
    },
  ];

  const renderFlag = (countryName) => {
    const filterCountry = country.filter(
      (obj) =>
        obj?.country.toLocaleLowerCase() === countryName?.toLocaleLowerCase()
    );
    return filterCountry[0].src;
  };

  const getCustomRowId = (row) => {
    if (row?.companyId) {
      return row.companyId;
    }

    return row.id;
  };

  function calculateCompanyRevenue(company) {
    return (
      (company.shipmentValue / company.numberOfShipments) *
      (company.tradingPartnerCount * 2)
    );
  }

  const newCompanies = props.data.map((company) => ({
    ...company,
    relevance: calculateCompanyRevenue(company),
  }));

  const SortedCompanies = newCompanies.sort(
    (a, b) => b.relevance - a.relevance
  );

  const companiesWithIndex = SortedCompanies.map((company, index) => ({
    ...company,
    rank: index + 1,
  }));

  const handleRedirect = (params) => {
    if (params.field !== "delete" && params.field !== "__check__") {
      return window.open(
        `/trade-data?companyName=${params.row.companyName}&companyId=${params.id}&country=${params.row.country}&role=${props.role}&isFavorited=${props.dataType}`,
        "_blank"
      );
    }
  };

  const DeleteCompanies = () => {
    rowsToDelete.forEach((id) => props.deleteCompany(id));
    setIsModalVisible(false);
    message.success("empresas removidas com sucesso");
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "98%",
        display: "grid",
        transition: "all .2s",
      }}
    >
      <AllModal
        type={"danger"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        message="Have you sure you want to delete those companies?"
        title="Delete companies selected"
        onConfirm={DeleteCompanies}
      />
      {props.dataType !== "New" && (
        <DeleteButton
          onClick={() => setIsModalVisible(true)}
          style={
            rowsToDelete.length > 0 ? { display: "flex" } : { display: "none" }
          }
        >
          Delete {rowsToDelete.length === 1 ? "Company" : "Companies"}
          <Delete />
        </DeleteButton>
      )}
      <DataGrid
        style={
          props.dataType === "Favorited"
            ? {
                ...textStyle,
                height: "fit-content",
                maxWidth: "100%",
                overflow: "hidden",
                transition: "all .2s",
              }
            : textStyle
        }
        rows={companiesWithIndex}
        columns={props.dataType === "New" ? columnsNew : columnsFavorite}
        hideFooter
        hideFooterPagination
        checkboxSelection={props.dataType !== "New"}
        onRowSelectionModelChange={(newRow) => setRowsToDelete(newRow)}
        initialState={{
          sorting: {
            sortModel: [{ field: "savedAt", sort: "desc" }],
          },
        }}
        pageSizeOptions={[5]}
        density="standard"
        getRowId={getCustomRowId}
        onCellClick={handleRedirect}
      />
    </Box>
  );
}
