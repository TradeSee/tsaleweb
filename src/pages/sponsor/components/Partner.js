import React, { useEffect, useState } from "react";
import { Chip, Paper, Typography } from "@mui/material";

const Partner = ({ data }) => {
  const country = [
    {
      src: require("../../../flag/united-states.png"),
      country: "United States",
    },
    { src: require("../../../flag/canada.png"), country: "Canada" },
    { src: require("../../../flag/brazil.png"), country: "Brazil" },
    { src: require("../../../flag/china.png"), country: "China" },
    { src: require("../../../flag/germany.png"), country: "germany" },
    { src: require("../../../flag/japan.png"), country: "japan" },
    {
      src: require("../../../flag/united-kingdom.png"),
      country: "united kingdom",
    },
    { src: require("../../../flag/france.png"), country: "france" },
    { src: require("../../../flag/netherlands.png"), country: "netherlands" },
    { src: require("../../../flag/belgium.png"), country: "belgium" },
    { src: require("../../../flag/india.png"), country: "india" },
    { src: require("../../../flag/vietnam.png"), country: "vietnam" },
    { src: require("../../../flag/turkey.png"), country: "turkey" },
  ];
  const [png, setPng] = useState(null);

  useEffect(() => {
    country.forEach((item) => {
      if (data.companyN === item.country) {
        setPng(item.src);
        return;
      }
    });
  }, []);

  return (
    <Paper style={{ padding: "16px", display: "flex" }}>
      <div style={{ marginRight: "16px" }}>
        <img
          style={{ width: "64px", height: "64px" }}
          src={png}
          alt="Company Logo"
        />
      </div>

      <div>
        <Typography variant="h6">
          {data.fantasy ? data.fantasy : data.corporateName}
        </Typography>
        <Chip label={data.activity} color="primary" size="small" />
        <br />
        <Typography variant="caption" noWrap>
          Learn more about this company...
        </Typography>
      </div>
    </Paper>
  );
};

export default Partner;
