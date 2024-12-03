import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../styles.css";
import { BackIconProduct, ImgIconProduct } from "../../../assets/styles";
import IconHs from "../../../icons/buyer.png";
import { Grid } from "@mui/material";
import { Header } from "./styles";

function ModalCode({ open, hs, close, next, descValue, handleDescription }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function handleCloseModal() {
    setIsOpen(false);
    close();
  }

  return (
    <div className="containerModal">
      <Modal className="card" isOpen={isOpen} onRequestClose={handleCloseModal}>
        <Grid
          container
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Header>
            <BackIconProduct style={{ backgroundColor: "#fff" }}>
              <ImgIconProduct src={IconHs} />
            </BackIconProduct>

            <div className="HsName">
              <h3 className="card__title">
                HS Code {hs.length > 0 ? hs[0].hsCode : ""}
              </h3>
              <p className="card__content">
                {hs.length > 0 ? hs[0].hsName : ""}{" "}
              </p>
            </div>
          </Header>
        </Grid>

        <textarea
          placeholder="Type the product description... (Optional)"
          className="inputarea"
          name="text"
          type="text"
          style={{ wordWrap: "normal", fontFamily: "sans-serif" }}
          value={descValue}
          onChange={(e) => handleDescription(e.target.value)}
        />

        <div className="card__arrow" onClick={() => next()}>
          <span style={{ marginRight: 12 }}>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="15"
            width="15"
          >
            <path
              fill="#fff"
              d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
            ></path>
          </svg>
        </div>

        <button className="repeat" onClick={handleCloseModal}>
          X
        </button>
      </Modal>
    </div>
  );
}

export default ModalCode;
