import Box from "@mui/material/Box";
import { Table } from "antd";

import Capitalize from "../../../../../../utils/capitalize";

export default function TradePartnersTable({ data, renderFlag, role }) {
  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "Ranking",
      flex: 1,
      editable: false,
      render: (_, record, index) => `${index + 1}`,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      editable: false,
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            alt={record.country}
            src={renderFlag(record.country)}
            style={{
              width: 40,
              height: 40,
              marginLeft: 10,
            }}
          />
          <p style={{ marginLeft: 10 }}>{Capitalize(record.country)}</p>
        </div>
      ),
    },
    {
      dataIndex: "companyName",
      key: "companyName",
      title: "Company Name",
      flex: 1,
      editable: false,
      render: (_, record) => `${Capitalize(record.companyName)}`,
    },
    {
      dataIndex: "percentageShare",
      key: "percentageShare",
      title: "Percentage Share",
      flex: 1,
      render: (_, record) => `${record.percentageShare.toFixed(2)}%`,
    },
  ];

  return (
    <Box sx={{ height: "85%", width: "100%" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{
          cursor: "pointer",
        }}
        onRow={(record) => {
          return {
            onClick: () =>
              window.open(
                `/trade-data?companyName=${record.companyName}&companyId=${record.companyID}&country=${record.country}&role=${role}`,
                "_blank"
              ),
          };
        }}
      />
    </Box>
  );
}
