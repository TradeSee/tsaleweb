import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextDefault } from "../../../../assets/styles";
import {
  createList,
  getAllLists,
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
  width: 1000,
  height: 600,
  bgcolor: "#F5F5F5",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

export default function ModalList({ visible, onCancel, userId, infos }) {
  const [lists, setLists] = useState([]);
  const [step, setStep] = useState(0);
  const [listName, setListName] = useState("");

  useEffect(() => {
    async function fetchLists() {
      try {
        const listsData = await getAllLists(userId);
        setLists(listsData);
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    }
    if (step === 0) {
      fetchLists();
    }
  }, [userId, step]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${year}`;
    return formattedDate;
  };

  const columnsList = [
    {
      title: "List Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created on",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return formatDate(created_at);
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        const lKey = Object.keys(record).filter((key) => key.startsWith("-"))[0];
        return (
         <Space size="middle">
          <SearchButton
            onClick={() => saveNewDataToList(userId, record.name, infos, lKey)}
          >
            Add{" "}
            <ArrowRightAltIcon
              sx={{ fontSize: "1rem", verticalAlign: "middle" }}
            />
          </SearchButton>
        </Space>
      )},
    },
  ];
  const saveNewDataToList = async (userId, listId, infos, key) => {
    try {
      if (infos.length === 0) {
        console.warn("Nenhum dado a ser salvo.");
        return;
      }

      for (let i = 0; i < infos.length; i++) {
        await saveDataToList(userId, listId, infos[i], key);
      }
      let sucessMessage = "Saved successfully!:";
      message.success(sucessMessage);
      onCancel();
    } catch (error) {
      console.error("Erro ao salvar novos dados:", error);
      let errorMesage = "Error!:";
      message.error(errorMesage);
    }
  };



  const buscar = () => {
    setStep(1);
  };

  function handleListName(event) {
    setListName(event.target.value);
  }

  function handleCreateList() {
    createList(userId, listName)
      .then((newListName) => {
        let sucessMessage = "Created successfully!:";
        setStep(0);
        message.success(sucessMessage);
      })
      .catch((error) => {
        console.error("Erro ao criar nova lista:", error);
        let errorMesage = "Error!:";
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
          {step === 0 ? (
            <>
              <TextDefault color={"#17283E"} bold={"700"} size={"28px"}>
                Add to list
              </TextDefault>
              <br />
              <TextDefault color={"#B7BCC3"} bold={"400"} size={"14px"}>
                Select the list you want to add or create a new one.
              </TextDefault>
              <br />
              <Box sx={{ textAlign: "right" }}>
                <SearchButton onClick={buscar}>
                  New List{" "}
                  <AddIcon sx={{ fontSize: "1rem", verticalAlign: "middle" }} />
                </SearchButton>
              </Box>
              <br />
              <Table columns={columnsList} dataSource={lists} />
            </>
          ) : (
            <>
              <TextDefault color={"#17283E"} bold={"700"} size={"28px"}>
                Create list
              </TextDefault>
              <br />

              <br />
              <Box sx={{ textAlign: "right" }}>
                <SearchButton onClick={handleCreateList}>
                  Save List{" "}
                  <AddIcon sx={{ fontSize: "1rem", verticalAlign: "middle" }} />
                </SearchButton>
              </Box>
              <br />
              <MainFilter>
                <TextDefault color={"#17283E"} bold={"700"} size={"12px"}>
                  List Name
                </TextDefault>
                <div className="searchBy">
                  <input
                    type="text"
                    placeholder="List Name"
                    value={listName}
                    onChange={handleListName}
                  />
                </div>
              </MainFilter>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
