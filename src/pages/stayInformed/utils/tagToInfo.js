import React, { useContext } from "react";
import { Chip, ThemeProvider, createTheme } from "@mui/material";
import { TextDefault, TagColors } from "../../../assets/styles";
import { ThemeContext } from "styled-components";

const theme = createTheme();

export const TagInfo = ({ type }) => {
  let color;
  let label;
  const themeGeneral = useContext(ThemeContext);

  switch (type) {
    case "MARKET COMMENTARY":
      color = themeGeneral.colors.main[500];
      label = "Market Commentary";
      break;
    case "ANALYSIS":
      color = "#3BC17A";
      label = "Analysis";
      break;
    case "NEWS":
      color = "#F19120";
      label = "News";
      break;
    default:
      color = "#E93939";
      label = "No Info";
  }

  return (
    <ThemeProvider theme={theme}>
      <TagColors color={color}>
        <TextDefault color="#fff">{label}</TextDefault>
      </TagColors>
    </ThemeProvider>
  );
};
