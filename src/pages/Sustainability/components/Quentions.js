import React, { useState, useEffect, useMemo } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Grid, Paper, styled, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

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

export default function Questions({
  onSelectedAnswer,
  prevAnswers,
  question,
  type,
}) {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const initialAnswers = question.answers.map((answer, index) => ({
      ...answer,
      selected: false,
      type: question.type,
      questionId: question.id,
      questionLabel: question.question,
      id: (index + Math.random() * 1000).toFixed(5),
    }));

    setAnswers(initialAnswers.flat());

    const actualAnswer = initialAnswers
      .flat()
      .filter((answer) => answer.questionId === question.id);

    setQuestions({ ...question, answers: actualAnswer });
  }, [question]);

  useEffect(() => {
    const selectedAnswer = answers.filter((answer) => answer.selected === true);
    onSelectedAnswer(selectedAnswer);
  }, [answers]);

  useEffect(() => {
    if (!prevAnswers) {
      return;
    }

    if (answers.length === 0 || prevAnswers?.length === 0) {
      return;
    }

    const prevAnswersArray = answers.map((resposta) => {
      const matchingItem = prevAnswers.find(
        (item2) => resposta.id === item2.id
      );

      if (matchingItem && matchingItem?.selected) {
        return { ...resposta, selected: true };
      }

      return resposta;
    });

    setAnswers(prevAnswersArray);
  }, [prevAnswers, answers]);

  function handleAnswerQuestion(id) {
    if (question?.isMultipleChoice) {
      const updatedAnswers = answers.map((answer) =>
        answer.id === id ? { ...answer, selected: !answer.selected } : answer
      );

      setAnswers(updatedAnswers);
    } else {
      const updatedAnswers = answers.map((answer) => {
        return answer.id === id
          ? { ...answer, selected: true }
          : { ...answer, selected: false };
      });

      setAnswers(updatedAnswers);
    }
  }

  const currentQuestion = 2;
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
  const progress = calculateProgress(type, currentQuestion);
  const progressAdapted = progress.toFixed(2);

  return (
    <main>
      <section>
        <Typography
          variant="body1"
          style={{
            maxWidth: "800px",
            overflowWrap: "break-word",
          }}
          fontWeight={600}
        >
          {question.question}
        </Typography>
        {answers.map((answer) => (
          <Paper
            key={answer.id}
            onClick={() => handleAnswerQuestion(answer.id)}
            elevation={answer.selected ? 3 : 0}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
              border: answer.selected ? "2px solid #366DFB" : "2px solid #ccc",
              borderRadius: "12px",
              marginBottom: "5px",
              width: "100%",
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <Typography
                  style={{
                    maxWidth: "500px",
                    overflowWrap: "break-word",
                  }}
                >
                  {answer.label}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                {answer.selected ? (
                  <CheckBoxIcon
                    color="primary"
                    fontSize="large"
                    sx={{
                      color: "#366DFB",
                    }}
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    sx={{ color: "#ccc" }}
                    color="primary"
                    fontSize="large"
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}
      </section>
    </main>
  );
}
