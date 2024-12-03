import React from "react";
import PDF from "../../../icons/pdf.png";
import CSV from "../../../icons/csv.png";
import { BookmarkAdd, DirectionsBoat } from "@mui/icons-material";

export default function ExportBtn({ action, saveOp, exportSimu, step, excel }) {
  return (
    <div style={{ position: "absolute", right: 50, top: -30 }}>
      <ul className="wrapper">
        <li
          className="icon twitter"
          onClick={() => action("AQUILOG")}
          style={{
            width: "2.2dvw",
            height: "2.2dvw",
            minWidth: 40,
            minHeight: 40,
            maxWidth: 65,
            maxHeight: 65,
          }}
        >
          <span className="tooltip">PDF</span>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
          <img
            src={PDF}
            style={{ width: "75%", height: "75%" }}
            alt="PDF Icon"
          />
        </li>

        {step !== 4 && (
          <>
            <li
              className="icon twitter"
              onClick={excel}
              style={{
                width: "2.2dvw",
                height: "2.2dvw",
                minWidth: 40,
                minHeight: 40,
                maxWidth: 65,
                maxHeight: 65,
              }}
            >
              <span className="tooltip">Excel</span>
              <span>
                <i className="fab fa-twitter"></i>
              </span>
              <img
                src={CSV}
                style={{ width: "75%", height: "75%" }}
                alt="Excel Icon"
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
