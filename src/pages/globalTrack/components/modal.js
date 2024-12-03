import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SameIcon from "../../../icons/dash_MetalPrice.png";
import { getTracking } from "../../../hooks/globalTrack";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "#F5F5F5",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

export default function ModalSavedTracking({ visible, onCancel, userId }) {
  const navigate = useNavigate();
  const [tracking, setTracking] = useState("");

  useEffect(() => {
    if (userId) {
      getTracking(userId)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setTracking(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setTracking([]);
        });
    }
  }, [userId]);

  async function handleItemClick(item) {
    if (userId) {
      navigate("/globaltrack-saved", { state: item });
    }
  }

  return (
    <div>
      <Modal
        open={visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
            sx={{
              width: "100%",
              maxHeight: 550,
              overflow: "auto",
            }}
          >
            {Object.values(tracking).map((item) => {
              const value = item;
              const company = value.trade;
              const containerNumber = value.containerNumber;

              return (
                <ListItem
                  key={value}
                  disableGutters
                  sx={{
                    width: "100%",
                    backgroundColor: "#e9edf8",
                    borderRadius: 4,
                    padding: 1,
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleItemClick(value);
                  }}
                >
                  <DirectionsBoatIcon />

                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >
                    <Grid item>
                      <ListItemText
                        primary={
                          <>
                            <span style={{ marginLeft: "20px" }}>
                              <strong>Company:</strong> {company}
                            </span>
                            <span style={{ marginLeft: "20px" }}>
                              <strong>Container Number:</strong>{" "}
                              {containerNumber}
                            </span>
                          </>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
