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
import DownIcon from "../../../icons/decreaseIcon.png";
import { getCompliance } from "../../../hooks/compliance";
import Select from "react-select";
import { BtnNextSolutions } from "../../findNewPartner/styles";
import {
  IconServices,
  RowContainer,
  TextDefault,
} from "../../../assets/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ButtonBlue from "../../../components/myButton";
import { InRow } from "../../compliance/search/style";
import SancIcon from "../../../icons/Sanctions.png";
import { getSanction } from "../../../hooks/sanction";

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

const choiceOptions = [
  { value: "sanctions", label: "Sanctions" },
  { value: "compliance", label: "Compliance" },
];

export default function ModalCompliance({ visible, onCancel, userId }) {
  const navigate = useNavigate();
  const [compliance, setCompliance] = useState("");
  const [sanction, setSanction] = useState("");
  const [choiceCompliance, setChoiceCompliance] = useState(null);
  const [step, setStep] = useState(0);
  const [animatedStep, setAnimatedStep] = useState("staticStep");

  useEffect(() => {
    if (userId) {
      getCompliance(userId)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setCompliance(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setCompliance([]);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getSanction(userId)
        .then((item) => {
          const valuesArray = item ? Object.values(item) : [];
          setSanction(valuesArray);
        })
        .catch((error) => {
          console.error("Erro ao buscar as favorite companies:", error);
          setSanction([]);
        });
    }
  }, [userId]);

  function handleItemClick(item) {
    if (userId) {
      navigate("/saved-compliance", { state: item });
    }
  }
  function handleItemClickSanction(item) {
    if (userId) {
      navigate("/saved-sanction", { state: item });
    }
  }

  function choiceSelect(selected) {
    setChoiceCompliance(selected.value);
  }

  function next() {
    if (choiceCompliance === "sanctions") {
      setStep(1);
    } else {
      setStep(2);
    }
  }

  const moveStepAnimation = (animation, step) => {
    //animation next = Direita para Esquerda
    //animation back = Esqueda pra direita
    //step = condicional da tela de exibição
    scrollTop();

    if (animation == "next") {
      setAnimatedStep("nextStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    } else {
      setAnimatedStep("backStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    }
  };

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
              <h1>Choose which saved operation you want to see</h1>
              <p>
                {" "}
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been...{" "}
              </p>
              <Select
                placeholder="Sanctions or Compliance"
                className="basic-select"
                classNamePrefix="Sanctions or Compliance"
                name="SanctionsCompliance"
                onChange={choiceSelect}
                options={choiceOptions}
                isSearchable
                formatOptionLabel={(option) => <div>{option.label}</div>}
              />

              <ButtonBlue width="200px" onClick={next} marginTop="10px">
                Next
                <ArrowForwardIcon
                  style={{ marginLeft: 20 }}
                  sx={{
                    fontSize: "1.2rem",
                    verticalAlign: "middle",
                  }}
                />
              </ButtonBlue>

              {/* <IconServices height='250px' iconUrl={SancIcon}/> */}
            </>
          ) : step === 1 ? (
            <>
              <InRow>
                <button
                  className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                  title="Go Back"
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                  }}
                  onClick={() => moveStepAnimation("back", step - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    className="stroke-blue-300"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M11 6L5 12M5 12L11 18M5 12H19"
                    ></path>
                  </svg>
                </button>
                <h1>Sanctions</h1>
              </InRow>
             
              <List
                sx={{
                  width: "100%",
                  maxHeight: 550,
                  overflow: "auto",
                }}
              >
                {Object.values(sanction).map((item) => {
                  const value = item;
                  const { listName  } = item;
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
                        handleItemClick(value);
                      }}
                    >
                      <IconButton aria-label="openlink">
                        <Avatar src={DownIcon} />
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
                                <strong>Sanctioning List:</strong>{" "}
                                {listName} -                              
                              </span>
                            }
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </>
          ) : step === 2 ? (
            <>
              <InRow>
                <button
                  className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                  title="Go Back"
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                  }}
                  onClick={() => moveStepAnimation("back", step - 2)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    className="stroke-blue-300"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M11 6L5 12M5 12L11 18M5 12H19"
                    ></path>
                  </svg>
                </button>
                <h1>Compliance</h1>
              </InRow>
              <List
                sx={{
                  width: "100%",
                  maxHeight: 550,
                  overflow: "auto",
                }}
              >
                {Object.values(compliance).map((item) => {
                  const value = item;
                  const { countryOfExport, countryOfImport, derivedReference } = item;
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
                        handleItemClickSanction(value);
                      }}
                    >
                      <IconButton aria-label="openlink">
                        <Avatar src={DownIcon} />
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
                                <strong>Derived Reference:</strong>{" "}
                                {derivedReference} | 
                                <strong> Country of Export:</strong>{" "}
                                {countryOfExport} | 
                                <strong> Country of Import:</strong>{" "}
                                {countryOfImport}
                              </span>
                            }
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
