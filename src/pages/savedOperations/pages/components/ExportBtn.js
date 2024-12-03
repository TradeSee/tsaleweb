import React, { useContext } from "react";
import PDF from "../../../../icons/pdf.png";
import { DirectionsBoat } from "@mui/icons-material";
import { ThemeContext } from "styled-components";

export default function ExportBtn({ action, exportSimu }) {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ position: "absolute", right: 50, top: -30 }}>
      <ul className="wrapper">
        <li className="icon twitter" onClick={() => action("AQUILOG")}>
          <span className="tooltip">PDF</span>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
          <img src={PDF} style={{ width: 25, height: 25 }} alt="PDF Icon" />
        </li>

        <li className="icon instagram" onClick={exportSimu}>
          <span className="tooltip">Create a simulation</span>
          <span>
            <i className="fab fa-instagram"></i>
          </span>
          <DirectionsBoat sx={{ color: `${theme.colors.dark[950]}` }} />
        </li>
      </ul>
    </div>
  );
}
