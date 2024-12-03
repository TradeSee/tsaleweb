import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../contexts/auth";
import LoadingPage from "../../components/LoadingPage";
import getUserInfo from "../../hooks/getUsers";
import { HeaderFilter, MyLine, SearchButton } from "./style";
import Select from "react-select";
import {
  addNotificationDraft,
  getDraftNews,
  moveDraftToPromotions,
  updateNotificationStatus,
} from "../../hooks/notifications";
import { Space, Table, message } from "antd";
import { NewsTag } from "../../utils/newsTag";
import ModalEditDraft from "./modalEdit";

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

export default function MarketingPage() {
  const [toggleDrawer, useTroggleDawer] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [description, setDescription] = useState("");
  const [draftNews, setDraftNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDraftId, setModalDraftId] = useState(false);

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setUserInfo(userData);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData().finally(() => {
        setLoading(false);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (userInfo) {
      const roleUser = userInfo?.userData?.role;

      if (auth && roleUser !== "admin") {
        navigate("/home");
      }
    }
  }, [auth, userInfo]);

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

  const OpenModal = (id) => {
    setIsModalOpen(true);
    setModalDraftId(id); 
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const formattedDate = new Date().toISOString();

  async function save() {
    try {
      const promotionData = {
        text: subject,
        type: type,
        description: description,
        route: route,
        status: "pending",
        created_at: formattedDate,
      };

      const newPromotionKey = await addNotificationDraft(promotionData);
      let successMessage = "New notification added";
      message.success(successMessage);
      console.log(newPromotionKey);
      window.location.reload(); 
    } catch (error) {
      console.error("Erro ao adicionar nova notificação", error);
      let errorMessage = error.message;
      message.error(errorMessage);
    }
  }

  async function updateDraftNews(id, status) {
    try {
      const newPromotionKey = await updateNotificationStatus(id, status);
      let successMessage;
      if (status === 'approved') {
       await moveDraftToPromotions(id);
        successMessage = "Notification approved";
      } else if (status === 'reproved') {
        successMessage = "Notification reproved";
      }
      window.location.reload(); 
      message.success(successMessage);
      console.log(newPromotionKey);
    } catch (error) {
      console.error("Erro ao atualizar a notificação", error);
      message.error(error.message);
    }
  }

  useEffect(() => {
    getDraftNews()
      .then((dados) => {
        const promotionsArray = Object.values(dados);
        setDraftNews(promotionsArray);
      })
      .catch((error) => {
        console.error("Erro ao retornar os dados de draft news:", error);
      });
  }, [auth]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (tags, status) => <NewsTag status={tags} />,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "Subject",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Redirect Route",
      dataIndex: "route",
      key: "route",
      render: (text, record) => {
        if (text === "none") {
          return <span>{text}</span>;
        } else {
          return (
            <a href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          );
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => updateDraftNews(record.id, 'approved')}>Approved</a>
          <a onClick={() => OpenModal(record.id)}>Edit</a>
          <a onClick={() => updateDraftNews(record.id, 'reproved')}>Reproved</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid container spacing={2}>
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid item xs={toggleDrawer ? 10 : 11} style={{ marginTop: 20 }}>
              <TextDefault
                color={"#4b4b4b"}
                size={"32px"}
                style={{ marginTop: 40, marginBottom: 15 }}
              >
                Dashboard Marketing
              </TextDefault>

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
                <SearchButton onClick={save}>Send</SearchButton>
              </HeaderFilter>
              <MyLine />
              <Table columns={columns} dataSource={draftNews} />
              <ModalEditDraft
                        visible={isModalOpen}
                        onCancel={CloseModal}
                        id={modalDraftId}
                      />
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
