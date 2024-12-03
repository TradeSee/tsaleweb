import React from "react";
import PDF from "../../../../../icons/pdf.png";
import CSV from "../../../../../icons/csv.png";

export default function ExtraExport({ action, excel }) {
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
        <li className="icon twitter" onClick={excel}>
          <span className="tooltip">EXCEL</span>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
          <img src={CSV} style={{ width: 25, height: 25 }} alt="CSV Icon" />
        </li>
      </ul>
    </div>
  );
}
