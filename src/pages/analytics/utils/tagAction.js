import React from "react";
import { Tag } from "antd";

export const TagAction = ({ action }) => {
  switch (action) {
    case "Search":
      return <Tag color="green">Search</Tag>;
    case "Open Page":
      return <Tag color="blue">Open Page</Tag>;
    case "More":
      return <Tag color="red">More</Tag>;
    case "Favorite":
      return <Tag color="yellow">Favorite</Tag>;
    default:
      return <Tag color="gray">No Action</Tag>;
  }
};
