import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { message } from "antd";
import { HeaderFilter, InRow, SearchButton } from "../style";
import Select from "react-select";
import { editDraftNotification } from "../../../hooks/notifications";
import { TextDefault } from "../../../assets/styles";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: 300,
  bgcolor: "#F5F5F5",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const typeOptions = [
  { value: "news", label: "News" },
  { value: "promotion", label: "Promotion" },
  { value: "update", label: "Update" },
  { value: "other", label: "Other" },
];

const routeOptions = [
  { value: "/trade-data", label: "Trade Data" },
  { value: "/market-intelligence", label: "Market Intelligence" },
  { value: "/leadsenrichment", label: "Leads Enrichment" },
  { value: "/billing", label: "Billing" },
  { value: "/credits", label: "Subscriptions & Credits" },
  { value: "/profile", label: "Profile" },
  { value: "https://www.tsalemetals.com", label: "Website T-Sale" },
  { value: "https://www.linkedin.com/company/tsalemetals/", label: "Linkedin T-Sale" },
  { value: "none", label: "None" },
];

export default function ModalEditDraft({ visible, onCancel, id }) {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [description, setDescription] = useState("");

  function handleSubject(event) {
    setSubject(event.target.value);
  }
  function handleDescription(event) {
    setDescription(event.target.value);
  }
  function typeSelect(selected) {
    setType(selected.value);
  }
  function routeSelect(selected) {
    setRoute(selected.value);
  }


  function save() {

    const typeV = type != "" ? type : "vazio";
    const subjectV = subject != "" ? subject : "vazio";
    const descriptionV = description != "" ? description : "vazio";
    const routeV = route != "" ? route : "vazio";

    editDraftNotification(id, typeV, subjectV, descriptionV, routeV)
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

  const exitPage = () => {
    onCancel();
  };

  return (
    <div>
      <Modal
        open={visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InRow>
            <TextDefault color={"#17283E"} bold={"700"} size={"28px"}>
              Edit news
            </TextDefault>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={exitPage} />
          </InRow>

          <br />
          <HeaderFilter>
          <Select
                  placeholder="Type"
                  className="basic-select"
                  classNamePrefix="Select a country"
                  name="Type"
                  onChange={typeSelect}
                  options={typeOptions}
                  isSearchable
                  formatOptionLabel={(option) => <div>{option.label}</div>}
                />
                <Select
                  placeholder="Redirect Route"
                  className="basic-select"
                  classNamePrefix="Select a country"
                  name="Route"
                  onChange={routeSelect}
                  options={routeOptions}
                  isSearchable
                  formatOptionLabel={(option) => <div>{option.label}</div>}             
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={handleSubject}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescription}
                  maxLength={100}
                />
            <SearchButton onClick={save}>Save</SearchButton>
          </HeaderFilter>
        </Box>
      </Modal>
    </div>
  );
}
