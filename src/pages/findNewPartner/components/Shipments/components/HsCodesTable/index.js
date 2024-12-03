import { Table } from "antd";
import Box from "@mui/material/Box";

export default function HsCodesTable({ data }) {
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
      dataIndex: "hscode",
      key: "hsCode",
      title: "6 Digits HsCodes",
      flex: 1,
      editable: false,
    },
    {
      dataIndex: "percentageShare",
      key: "percentageShare",
      title: "Percentage Share",
      flex: 1,
      editable: false,
      render: (_, record) => `${record.percentageShare.toFixed(2)}%`,
    },
  ];

  return (
    <Box sx={{ height: "85%", width: "100%" }}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Box>
  );
}
