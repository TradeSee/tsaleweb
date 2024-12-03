import React, { useContext } from "react";
import { BookmarkAdd } from "@mui/icons-material";
import { ThemeContext } from "styled-components";

export default function SaveIcon({ saveOp }) {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ position: "absolute", right: 50, top: -30 }}>
      <ul className="wrapper">
        <li className="icon instagram" onClick={saveOp}>
          <span className="tooltip">Save operation</span>
          <span>
            <i className="fab fa-instagram"></i>
          </span>
          <BookmarkAdd sx={{ color: `${theme.colors.dark[950]}` }} />
        </li>
      </ul>
    </div>
  );
}
