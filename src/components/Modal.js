import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { ThemeContext } from "styled-components";

function SquareModal({ open, closeModal }) {
  const themeContext = useContext(ThemeContext);

  const handleClose = () => {
    closeModal();
  };

  const redirectToDashboard = () => {
    window.location.href = "/dashboard-sustainability";
  };

  const styles = {
    customButton: {
      backgroundColor: `${themeContext.colors.button.main}`,
      color: "#fff",
      borderRadius: 12,
      "&:hover": {
        backgroundColor: `${themeContext.colors.button.hover}`,
      },
    },
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        className="centered-content"
        style={{
          width: "300px",
          borderRadius: "20px",
          backgroundColor: "#fff",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircleIcon
          style={{ color: `${themeContext.colors.main[500]}`, fontSize: 48 }}
        />
        <Typography
          style={{ color: `${themeContext.colors.main[500]}` }}
          variant="h5"
        >
          Answers saved
        </Typography>
        <Typography
          style={{ color: "black", textAlign: "center" }}
          variant="body2"
        >
          You can change them whenever <br /> you want.
        </Typography>
        <br />
        <Button style={styles.customButton} onClick={redirectToDashboard}>
          Ok
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SquareModal;
