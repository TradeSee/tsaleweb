import React from "react";
import PDF from "../../../icons/pdf.png";

export default function PdfExport({ action }) {
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
      </ul>
    </div>
  );
}
