import React from "react";
import { Tag } from "antd";

export const StatusToTag = ({ status }) => {
  switch (status) {
    case "true":
      return <Tag color="green">Active</Tag>;
    case "false":
      return <Tag color="red">No Active</Tag>;   
    default:
      return <Tag color="gray">No Status</Tag>;
  }
};
