import Box from "@mui/material/Box";
import { Table } from "antd";
import Capitalize from "../../../../../../utils/capitalize";

export default function PortsTable({ data }) {
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
      dataIndex: "port",
      title: "Ports",
      Key: "port",
      flex: 1,
      editable: false,
      render: (_, record) => `${Capitalize(record.port)}`,
    },
    {
      dataIndex: "percentageShare",
      title: "Percentage Share",
      Key: "percentageShare",
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
