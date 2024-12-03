import React, { useEffect, useState, useMemo } from "react";
import { Button, Grid, Paper, Typography, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { ContainerHome } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";

import LoadingPage from "../../../components/LoadingPage";
import SquareModal from "../../../components/Modal";
import Question from "../components/Quentions";

import { authScreen } from "../../../contexts/auth";

import { addSustainability } from "../../../hooks/sustainability";
import getUserInfo from "../../../hooks/getUsers";

import Form from "../data/sustain.json";
import { Footer, QuestionsContainer } from "./styles";

const buttonStyle = {
  backgroundColor: "#EDEDED",
  color: "#A3A3A3",
  borderRadius: "15px",
};
const buttonNext = {
  backgroundColor: "#366DFB",
  color: "#fff",
  borderRadius: "15px",
  position: "fixed",
  right: 24,
  bottom: 24,
  padding: "12px 24px",
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#202237",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#55C7FF",
  },
}));

export default function FormSustainability() {
  const { name } = useParams();
  const [toggleDrawer, useTroggleDawer] = useState(true);
  const [question, setQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [socialSelectedAnswers, setSocialSelectedAnswers] = useState([]);
  const [govSelectedAnswers, setGovSelectedAnswers] = useState([]);
  const [maSelectedAnswers, setMASelectedAnswers] = useState([]);
  const [diligenceSelectedAnswers, setDiligenceSelectedAnswers] = useState([]);
  const [type] = useState({
    Social: "social",
    Governance: "gov",
    Environment: "ma",
  });

  function SetToggle(state) {
    useTroggleDawer(state);
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
    handleSelectedAnswer();
  }, [selectedAnswer]);

  const selectType = type[name] || "diligence";

  function saveSelectedAnswer(answer) {
    return setSelectedAnswer(answer);
  }

  //funções dos botões
  function anterior() {
    if (question > 1) {
      return setQuestion(question - 1);
    }
    if (question === 1) {
      window.location.href = "/dashboard-sustainability";
    }
  }

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    fetchData();
  }, []);

  const uid = userInfo?.uid;

  function proximo() {
    if (selectType === "gov") {
      const sum = [];

      govSelectedAnswers.map((answer) => {
        Array.isArray(answer)
          ? sum.push(answer.reduce((acc, answer) => acc + answer.value, 0))
          : sum.push(answer.value);
      });

      const result = sum.reduce((acc, value) => acc + value, 0);

      const ResGov = { ...govSelectedAnswers, result };

      addSustainability({ ResGov, uid });
      openModal();
    }

    if (selectType === "social") {
      const sum = [];

      socialSelectedAnswers.map((answer) => {
        Array.isArray(answer)
          ? sum.push(answer.reduce((acc, answer) => acc + answer.value, 0))
          : sum.push(answer.value);
      });

      const result = sum.reduce((acc, value) => acc + value, 0);
      const ResSocial = { ...socialSelectedAnswers, result };
      addSustainability({ ResSocial, uid });
      openModal();
    }
    if (selectType === "ma") {
      const sum = [];

      maSelectedAnswers.map((answer) => {
        Array.isArray(answer)
          ? sum.push(answer.reduce((acc, answer) => acc + answer.value, 0))
          : sum.push(answer.value);
      });

      const result = sum.reduce((acc, value) => acc + value, 0);

      const ResMa = { ...maSelectedAnswers, result };

      addSustainability({ ResMa, uid });

      openModal();
    }
    if (selectType === "diligence") {
      const sum = [];

      diligenceSelectedAnswers.map((answer) => {
        Array.isArray(answer)
          ? sum.push(answer.reduce((acc, answer) => acc + answer.value, 0))
          : sum.push(answer.value);
      });

      const result = sum.reduce((acc, value) => acc + value, 0);

      const ResDilig = { ...diligenceSelectedAnswers, result };

      addSustainability({ ResDilig, uid });
      openModal();
    }
  }

  function handleSelectedAnswer() {
    if (!selectedAnswer || selectedAnswer.length === 0) {
      return;
    }

    if (selectedAnswer[0].type === "gov") {
      setGovSelectedAnswers((prevState) => {
        const existingAnswerIndex = prevState.findIndex(
          (answer) => answer[0].questionId === selectedAnswer[0].questionId
        );

        if (existingAnswerIndex !== -1) {
          const newState = [...prevState];
          newState[existingAnswerIndex] = selectedAnswer;
          return newState;
        } else {
          return [...prevState, selectedAnswer];
        }
      });
    } else if (selectedAnswer[0].type === "social") {
      setSocialSelectedAnswers((prevState) => {
        const existingAnswerIndex = prevState.findIndex(
          (answer) => answer[0].questionId === selectedAnswer[0].questionId
        );

        if (existingAnswerIndex !== -1) {
          const newState = [...prevState];
          newState[existingAnswerIndex] = selectedAnswer;
          return newState;
        } else {
          return [...prevState, selectedAnswer];
        }
      });
    } else if (selectedAnswer[0].type === "ma") {
      setMASelectedAnswers((prevState) => {
        const existingAnswerIndex = prevState.findIndex(
          (answer) => answer[0].questionId === selectedAnswer[0].questionId
        );

        if (existingAnswerIndex !== -1) {
          const newState = [...prevState];
          newState[existingAnswerIndex] = selectedAnswer;
          return newState;
        } else {
          return [...prevState, selectedAnswer];
        }
      });
    } else if (selectedAnswer[0].type === "diligence") {
      setDiligenceSelectedAnswers((prevState) => {
        const existingAnswerIndex = prevState.findIndex(
          (answer) => answer[0].questionId === selectedAnswer[0].questionId
        );

        if (existingAnswerIndex !== -1) {
          const newState = [...prevState];
          newState[existingAnswerIndex] = selectedAnswer;
          return newState;
        } else {
          return [...prevState, selectedAnswer];
        }
      });
    }
  }

  // console.log("a", selectedAnswer);

  const LastQuestion = !!(
    (selectType === "gov" && question === 20) ||
    (selectType === "social" && question === 8) ||
    (selectType === "ma" && question === 12) ||
    (selectType === "diligence" && question === 12)
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const filteredByType = useMemo(
    () => Form.filter((question) => question.type === selectType),
    [selectType]
  );

  function calculateProgress(type, currentQuestion) {
    const maxAllowedQuestions =
      type === "social"
        ? 8
        : type === "gov"
        ? 20
        : type !== "gov" && type !== "social" && 12;

    const progress = (currentQuestion / maxAllowedQuestions) * 100;

    return Math.min(progress, 100);
  }

  const progress = calculateProgress(
    selectType,
    selectType === "social"
      ? socialSelectedAnswers.length
      : selectType === "gov"
      ? govSelectedAnswers.length
      : selectType === "ma"
      ? maSelectedAnswers.length
      : diligenceSelectedAnswers.length
  );
  const progressAdapted = progress.toFixed(2);

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid
              sx={{
                marginLeft: "75px",
                marginTop: "20px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paper
                style={{
                  width: "700px",
                  borderRadius: "20px",
                  backgroundColor: "#366DFB",
                  padding: "20px",
                  color: "#fff",
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  {selectType === "social"
                    ? "Social"
                    : selectType === "gov"
                    ? "Governance"
                    : selectType === "ma"
                    ? "Environment"
                    : "Management & Diligence"}
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection="row"
                >
                  <Typography variant="h6">
                    {selectType === "social"
                      ? "8 Questions"
                      : selectType === "gov"
                      ? "20 Questions"
                      : selectType !== "gov" &&
                        selectType !== "social" &&
                        "12 Questions"}
                  </Typography>
                  <Typography variant="body2">{progressAdapted} %</Typography>
                </Grid>
                <BorderLinearProgress variant="determinate" value={progress} />
              </Paper>
              <br />

              <QuestionsContainer>
                {filteredByType.map((question) => (
                  <Question
                    key={question.id}
                    question={question}
                    type={selectType}
                    onSelectedAnswer={saveSelectedAnswer}
                  />
                ))}
              </QuestionsContainer>
              <br />

              <Footer>
                <Button style={buttonStyle} onClick={anterior}>
                  Back
                </Button>
                <SquareModal open={modalOpen} closeModal={closeModal} />
              </Footer>

              <Button style={buttonNext} onClick={proximo}>
                Save
              </Button>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
