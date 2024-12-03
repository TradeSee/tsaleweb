import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  List,
  Grid,
  ListItem,
  ListItemText,
} from "@mui/material";

import { getMetalPrice } from "../../../../hooks/metalPrice";
import UpIcon from "../../../../icons/increaseIcon.png";
import DownIcon from "../../../../icons/decreaseIcon.png";
import SameIcon from "../../../../icons/sameIcon.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "#F5F5F5",
  borderRadius: 12,
  boxShadow: 24,
  p: 4,
};

export default function ModalList({
  visible,
  onCancel,
  data,
  handleSelectMetal,
}) {
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
            {data()
              .filter((value) => value?.value4)
              .map((value) => {
                const metalNameArray = value.MetalName.split(" ");
                const metalName = metalNameArray[0] + " " + metalNameArray[1];
                const restOfText = value.MetalName.substring(metalName.length);

                return (
                  <ListItem
                    key={value}
                    disableGutters
                    sx={{
                      width: "100%",
                      backgroundColor: "#e9edf8",
                      borderRadius: 8,
                      padding: 1,
                      marginBottom: "5px",
                    }}
                    onClick={() => {
                      handleSelectMetal(value.value4);
                    }}
                  >
                    <IconButton aria-label="openlink">
                      {value.value1 > value.value4 ? (
                        <Avatar alt={value.MetalName} src={DownIcon} />
                      ) : value.value1 < value.value4 ? (
                        <Avatar alt={value.MetalName} src={UpIcon} />
                      ) : (
                        <Avatar alt={value.MetalName} src={SameIcon} />
                      )}
                    </IconButton>

                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      style={{ width: "100%" }}
                    >
                      <Grid item>
                        <ListItemText
                          primary={
                            <span>
                              <strong>{metalName}</strong> <br /> {restOfText}
                            </span>
                          }
                        />
                      </Grid>
                      <Grid item>
                        {value.value1 > value.value4 ? (
                          <span style={{ color: "#BB2525" }}>
                            {value.value4 ? value.value4 : "0"}
                          </span>
                        ) : value.value1 < value.value4 ? (
                          <span style={{ color: "#008170" }}>
                            {value.value4 ? value.value4 : "0"}
                          </span>
                        ) : (
                          <span>{value.value4 ? value.value4 : "0"}</span>
                        )}
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
