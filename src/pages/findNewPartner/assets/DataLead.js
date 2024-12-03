import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import country from "../../../components/Flag";
import Capitalize from "../../../utils/capitalize";

//Modelo de teste para tabela

export default function DataLead({ ...props }) {
  const textStyle = { color: "#4D6484", fontWeight: "bold", height: "100%" };

  const leadsDemo = [
    {
      id: 1,
      name: "Taylor Johnson",
      email: "taylor.johnson@mycompany.com",
      title: "Marketing Data Analyst",
    },
    {
      id: 2,
      name: "Samantha Parker",
      email: "samantha.parker@mycompany.com",
      title: "Fashion Publicist",
    },
    {
      id: 3,
      name: "Joshua Davis",
      email: "joshua.davis@mycompany.com",
      title: "Financial Advisor",
    },
    {
      id: 4,
      name: "Emily Anderson",
      email: "emily.anderson@mycompany.com",
      title: "Graphic Designer",
    },
    {
      id: 5,
      name: "Brandon Wilson",
      email: "brandon.wilson@mycompany.com",
      title: "Civil Engineer",
    },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
      editable: false,
    },
    {
      field: "title",
      headerName: "Office",
      flex: 1,
      editable: false,
    },
  ];

  function title() {
    return (
      <div style={{ borderBottom: "1px solid #e0e0e0", paddingLeft: 8 }}>
        <h3>{props.tableTitle}</h3>
      </div>
    );
  }

  return (
    <Box sx={{ height: "100%", width: "98%" }}>
      <DataGrid
        style={textStyle}
        rows={props.data || leadsDemo}
        columns={props.columns || columns}
        // components={{ Toolbar: title }}
        autoHeight={false}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        getRowId={() => Math.random()}
      />
    </Box>
  );
}
