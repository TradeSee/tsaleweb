import { Table } from "antd";
import Box from "@mui/material/Box";
import Capitalize from "../../../../../../utils/capitalize";

export default function ProductKeywords({ data }) {
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
      dataIndex: "productKeyword",
      key: "productKeywords",
      title: "Product Keywords",
      flex: 1,
      editable: false,
      render: (_, record) => `${Capitalize(record.productKeyword)}`,
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
