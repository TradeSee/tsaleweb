import React from "react";
import { Tag } from "antd";

export const NewsTag = ({ status }) => {
  switch (status) {
    case "pending":
      return <Tag color="geekblue">Pending</Tag>;
    case "approved":
      return <Tag color="green">Approved</Tag>;   
    case "reproved":
      return <Tag color="volcano">Reproved</Tag>;   
    default:
      return <Tag color="gray">No Status</Tag>;
  }
};
