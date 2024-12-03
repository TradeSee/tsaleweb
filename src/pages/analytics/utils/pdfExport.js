import React from "react";
import PDF from "../../../icons/pdf.png";
import CSV from "../../../icons/csv.png";
import { BookmarkAdd } from "@mui/icons-material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function ExcelExport({ excel }) {
  return (
    <div style={{ position: "absolute", right: 50, top: -30 }}>
      <ul className="wrapper">      
        <li className="icon twitter" onClick={excel}>
          <span className="tooltip">Excel</span>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
          <img src={CSV} style={{ width: 25, height: 25 }} alt="Excel Icon" />
        </li>         
      </ul>
    </div>
  );
}
