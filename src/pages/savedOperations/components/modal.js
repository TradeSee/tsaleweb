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
import {
  deleteCredit,
  handleLimitCredits,
  historyCredits,
} from "../../../hooks/credits";
import { getFavoriteMetals } from "../../../hooks/metalPrice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpIcon from "../../../icons/increaseIcon.png";
import DownIcon from "../../../icons/decreaseIcon.png";
import SameIcon from "../../../icons/dash_MetalPrice.png";

import AllModal from "../../../components/AllModal";

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

export default function ModalSavedMp({ visible, onCancel, userId }) {
  const [custCredit, setCustCredit] = useState(5);
  const navigate = useNavigate();
  const [metalPrice, setMetalPrice] = useState("");
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      getFavoriteMetals(userId)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setMetalPrice(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setMetalPrice([]);
        });
    }
  }, [userId]);

  const formattedDate = new Date().toISOString();

  const infoC = {
    text: `Credits used with research on Market Intelligence`,
    type: "decrease",
    date: formattedDate,
    credits: custCredit,
  };

  async function handleItemClick(item) {
    if (userId) {
      if (await handleLimitCredits(userId)) {
        setIsLimitModalVisible(true);
        return;
      }

      deleteCredit(userId, custCredit);
      historyCredits(infoC, userId);
      navigate("/market-intelligence-details", { state: item });
    }
  }

  console.log(Object.values(metalPrice));
  return (
    <div>
      <AllModal
        type={"warning"}
        visible={isLimitModalVisible}
        onCancel={() => setIsLimitModalVisible(false)}
        onConfirm={() => setIsLimitModalVisible(false)}
        message="You have reached your daily limit of 1000 credits"
        title="Limit Reached"
      />
      <Modal
        open={isLimitModalVisible ? !visible : visible}
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
            {Object.values(metalPrice).map((item) => {
              const value = item.data;
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
                    borderRadius: 4,
                    padding: 1,
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleItemClick(value);
                  }}
                >
                  <IconButton aria-label="openlink">
                    {value.value1 > value.value4 ? (
                      <Avatar alt={value.MetalName} src={SameIcon} />
                    ) : value.value1 < value.value4 ? (
                      <Avatar alt={value.MetalName} src={SameIcon} />
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
                          {value.value1 ? value.value1 : "0"}
                        </span>
                      ) : value.value1 < value.value4 ? (
                        <span style={{ color: "#008170" }}>
                          {value.value1 ? value.value1 : "0"}
                        </span>
                      ) : (
                        <span>{value.value1 ? value.value1 : "0"}</span>
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
