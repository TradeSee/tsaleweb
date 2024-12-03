/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet } from "@react-pdf/renderer";
import AllCompaniesTable from "../../../../../../../../assets/DataGrid";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import country from "../../../../../../../../../../components/Flag";
import Capitalize from "../../../../../../../../../../utils/capitalize";
import { format } from "date-fns";

import { Table } from "./styles";

const styles = StyleSheet.create({
  Container: {
    padding: "24px 0",
    columnGap: 8,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  Logo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontSize: 20,
    alignSelf: "flex-start",
  },
  TitleBold: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  Section: {
    display: "flex",
    alignItems: "center",
    width: "90%",
  },
  Content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  ContentNinety: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TextContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "20%",
  },
  Subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  infoMargin: {
    marginTop: 24,
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 16,
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
  },
});

//Modelo de teste para tabela

function DataGridDemo({ ...props }) {
  const textStyle = {
    width: 700,
    color: "#4D6484",
    fontSize: 12,
    fontWeight: "bold",
    cursor: "pointer",
  };

  function formatarNumeroEmDolar(numero) {
    if (numero > 0) {
      numero = parseFloat(numero.toString().replace(".", ""));
      return numero.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } else {
      return "-";
    }
  }

  const columns = [
    props.dataType === "New" && {
      field: "rank",
      headerName: "Ranking",
      width: 120,
      editable: false,
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
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
        <a
          href={`https://app.tsalemetals.com/trade-data?companyName=${params.row.companyName}&companyId=${params.id}&country=${params.row.country}&role=${props.role}&isFavorited=${props.dataType}`}
          style={{ fontWeight: 400, color: "#000", textDecoration: "none" }}
        >
          {Capitalize(params.row.companyName)}
        </a>
      ),
    },
    props.dataType === "New" &&
      props.filterBy === "hsCode" && {
        field: "Shipment Value",
        headerName: "Shipment Value (USD)",
        flex: 1,
        editable: false,
        valueGetter: (params) => params.row.shipmentValue,
        renderCell: (params) => (
          <p style={{ fontWeight: 400 }}>
            {formatarNumeroEmDolar(params.row.shipmentValue)}
          </p>
        ),
        sortComparator: (v1, v2) => v1 - v2,
      },
  ];

  const renderFlag = (countryName) => {
    const filterCountry = country.filter(
      (obj) => obj.country.toLocaleLowerCase() === countryName
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

  return (
    <Box sx={{ height: "fit-content", width: "100%", marginTop: 4 }}>
      <DataGrid
        style={textStyle}
        rows={companiesWithIndex}
        columns={columns}
        hideFooter
        hideFooterPagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
          sorting: {
            sortModel: [{ field: "savedAt", sort: "desc" }],
          },
        }}
        pageSizeOptions={[5]}
        density="standard"
        getRowId={getCustomRowId}
        onRowClick={(params) =>
          window.open(
            `/trade-data?companyName=${params.row.companyName}&companyId=${params.id}&country=${params.row.country}&role=${props.role}&isFavorited=${props.dataType}`,
            "_blank"
          )
        }
      />
    </Box>
  );
}

// Create Document Component
export default function Content({
  role,
  companies,
  dataType,
  filterBy,
  qtyCompanies,
}) {
  return (
    <div style={styles.Container}>
      <DataGridDemo
        data={companies}
        dataType={dataType}
        filterBy={filterBy}
        role={role}
      />

      <small style={{ color: "#4D6484" }}>
        Showing {companies?.length} of {qtyCompanies}
      </small>
    </div>
  );
}
