import React from "react";
import { Tag } from "antd";

export const PaidStatusTag = ({ status }) => {
  switch (status) {
    case "paid":
      return <Tag color="green">Paid</Tag>;
    case "void":
      return <Tag color="gray">Void</Tag>;
    case "open":
      return <Tag color="yellow">Open</Tag>;
    case "uncollectible":
      return <Tag color="red">Uncollectible</Tag>;
    case "draft":
      return <Tag color="blue">Uncollectible</Tag>;
    default:
      return <Tag color="gray">No Status</Tag>;
  }
};
