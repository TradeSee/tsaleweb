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
  viewCredit,
} from "../../../hooks/credits";
import { getMetalPrice } from "../../../hooks/metalPrice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpIcon from "../../../icons/increaseIcon.png";
import DownIcon from "../../../icons/decreaseIcon.png";
import SameIcon from "../../../icons/dash_MetalPrice.png";
import ButtonBlue from "../../../components/myButton";
import { saveAnalytics } from "../../../hooks/analytics";
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

export default function ModalExtra({
  visible,
  onCancel,
  metalname,
  userId,
  userName,
  onClick,
}) {
  const [data, setData] = useState([]);
  const [custCredit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const [userCredit, setUserCredit] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (userId) {
      const fetchCredits = async () => {
        try {
          const userCredits = await viewCredit(userId);
          setUserCredit(userCredits);
        } catch (error) {
          console.error("Erro ao buscar os créditos do usuário:", error);
        }
      };

      fetchCredits();
    }
  }, [userId]);

  const formattedDate = new Date().toISOString();

  const infoA = {
    action: `Compare Metal `,
    date: formattedDate,
    page: "Market Intelligence Details",
    keywords: `${searchValue}`,
    name: userName,
  };

  const infoD = {
    text: `Credits used with research on Market Intelligence Details`,
    type: "decrease",
    date: formattedDate,
    credits: custCredit,
  };

  const buscar = () => {
    if (userCredit <= custCredit) {
      handleOpenModal();
    } else if (searchValue !== "") {
      const resultadosFiltrados = filtrarRegistrosPorNome(searchValue);
      setRegistrosFiltrados(resultadosFiltrados);
      historyCredits(infoD, userId);
      saveAnalytics(userId, infoA);
    } else {
      console.log("erro");
    }
  };

  useEffect(() => {
    getMetalPrice().then((res) => setData(Object.values(res)));
  }, []);

  const filtrarRegistrosPorNome = (valorPesquisa) => {
    const keywords = valorPesquisa.toLowerCase().split(" ");

    const registrosFiltrados = data.filter((registro) => {
      const metal = registro?.MetalName?.toLowerCase();

      return keywords.every((keyword) => metal.includes(keyword));
    });
    return registrosFiltrados;
  };

  // atualiza de acordo c a nova pesquisa
  const atualizarRegistrosFiltrados = () => {
    const novoTermoPesquisa = searchValue || metalname;

    const novosRegistrosFiltrados = filtrarRegistrosPorNome(novoTermoPesquisa);
    setRegistrosFiltrados(novosRegistrosFiltrados);
  };

  useEffect(() => {
    if (data.length > 0) {
      //iniciando com metalname
      atualizarRegistrosFiltrados();
    }
  }, [metalname, data]);

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
      onClick(item);
    }
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmAction = () => {
    navigate(`/credits`);
  };

  return (
    <div>
      <AllModal
        type={"warning"}
        visible={modalVisible}
        onCancel={handleCloseModal}
        message="You need to add more credits to continue the search"
        title="No Balance"
        onConfirm={handleConfirmAction}
      />
      <Modal
        open={isLimitModalVisible ? !visible : visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: 50 }}
      >
        <Box sx={style}>
          <div
            style={{
              width: "84%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "24px 0",
            }}
          >
            <input
              className="mainSearch"
              name="text"
              placeholder="Aluminum, Zinc, Steel, Scrap, etc..."
              type="search"
              style={{
                marginLeft: 30,
                width: "100%",
              }}
              value={searchValue}
              onChange={handleInputChange}
              list="optionsA"
            />
            <ButtonBlue width="100px" marginLeft="8px" onClick={buscar}>
              Search
            </ButtonBlue>
          </div>

          <List
            sx={{
              width: "100%",
              maxHeight: 450,
              overflow: "auto",
            }}
          >
            {registrosFiltrados.map((value) => {
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
                    <Avatar alt={value.MetalName} src={SameIcon} />
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
