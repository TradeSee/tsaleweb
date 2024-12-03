import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import { ThemeContext } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";

function CustomPaper({ data }) {
  const themeContext = useContext(ThemeContext);

  const paperStyles = {
    width: "35%",
    height: 350,
    backgroundColor: themeContext.colors.dark[950],
    padding: "20px",
    borderRadius: "20px",
  };

  const iconStyles = {
    verticalAlign: "middle",
    marginLeft: "5px",
  };

  const buttonStyles = {
    width: "30%",
    backgroundColor: themeContext.colors.darker[950],
    color: "#fff",
    textTransform: "none",
    borderRadius: "10px",
  };

  const buttonContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
  };

  const rectangleStyles = {
    width: "90%",
    backgroundColor: themeContext.colors.darker[950],
    padding: "10px",
    borderRadius: "12px",
    margin: "5px",
  };

  const contentStyles = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxHeight: "1.5em",
    color: "white",
  };

  const items = Object.values(data).slice(0, 3);

  return (
    <Paper style={paperStyles}>
      <Typography
        variant="subtitle1"
        sx={{ color: "white", fontSize: 16, fontWeight: "bold" }}
      >
        Trending news
        <InsightsIcon style={iconStyles} />
      </Typography>

      <Box sx={buttonContainerStyles}>
        <Button sx={buttonStyles}>News</Button>
        <Button sx={buttonStyles}>Market</Button>
        <Button sx={buttonStyles}>Analysis</Button>
      </Box>

      {items.map((item, index) => (
        <Paper key={index} style={rectangleStyles}>
          <Typography
            sx={{ color: "white", fontWeight: "bold" }}
            variant="caption"
          >
            {item.text}
          </Typography>
          <Typography variant="body2" sx={contentStyles}>
            {item.content}
          </Typography>
          <Typography sx={{ color: "white" }} variant="caption">
            published: {item.published}
          </Typography>
        </Paper>
      ))}
    </Paper>
  );
}

export default CustomPaper;
