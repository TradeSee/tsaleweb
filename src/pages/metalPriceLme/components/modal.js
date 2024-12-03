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
import { getMetalPrice } from "../../../hooks/metalPrice";
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

export default function ModalList({
  visible,
  onCancel,
  metalname,
  userId,
  onClick,
}) {
  const [data, setData] = useState([]);
  const [custCredit, setCustCredit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMetalPrice().then((res) => setData(Object.values(res)));
  }, []);

  const filtrarRegistrosPorNome = (valorPesquisa) => {
    const keywords = valorPesquisa.toLowerCase().split(" ");

    const filterMetalsWithData = data.filter(
      (metal) =>
        metal.value1 !== undefined &&
        metal.value2 !== undefined &&
        metal.value3 !== undefined &&
        metal.value4 !== undefined &&
        metal.value1 !== "" &&
        metal.value2 !== "" &&
        metal.value3 !== "" &&
        metal.value4 !== ""
    );

    const registrosFiltrados = filterMetalsWithData.filter((registro) => {
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
      window.open(
        `/market-intelligence-details?name=${item.MetalName}&value1=${item.value1}&value2=${item.value2}&value3=${item.value3}&value4=${item.value4}`,
        "_blank"
      );
    }
  }

  return (
    <div>
      <AllModal
        type={"warning"}
        visible={isLimitModalVisible}
        onCancel={() => setIsLimitModalVisible(false)}
        message="You have reached your daily limit of 1000 credits"
        title="Limit Reached"
        onConfirm={() => setIsLimitModalVisible(false)}
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
