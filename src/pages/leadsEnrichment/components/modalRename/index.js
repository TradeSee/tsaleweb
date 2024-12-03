import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextDefault } from "../../../../assets/styles";
import {
  createList,
  getAllLists,
  renameList,
  saveDataToList,
} from "../../../../hooks/leads";
import { useEffect } from "react";
import { useState } from "react";
import { Table, Space, message } from "antd";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { SearchButton } from "../../profileCompany/styles";
import AddIcon from "@mui/icons-material/Add";
import { MainFilter } from "../../search/style";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "#F5F5F5",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

export default function ModalRenameList({ visible, onCancel, userId, listId }) {
  const [listName, setListName] = useState("");

  function handleListName(event) {
    setListName(event.target.value);
  }

  function handleRenameList() {
    renameList(userId, listId, listName)
      .then((newListName) => {
        let sucessMessage = "Saved successfully!";
        message.success(sucessMessage);
        onCancel();
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Erro ao criar nova lista:", error);
        let errorMesage = "Error!";
        message.error(errorMesage);
      });
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
          <TextDefault color={"#17283E"} bold={"700"} size={"28px"}>
            Rename list
          </TextDefault>
          <br />
          <Box sx={{ textAlign: "right" }}>
            <SearchButton onClick={handleRenameList}>
              Save List{" "}
              <AddIcon sx={{ fontSize: "1rem", verticalAlign: "middle" }} />
            </SearchButton>
          </Box>
          <br />
          <MainFilter>
            <div className="searchBy">
              <input
                type="text"
                placeholder="New List Name"
                value={listName}
                onChange={handleListName}
              />
            </div>
          </MainFilter>
        </Box>
      </Modal>
    </div>
  );
}
