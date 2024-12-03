import React, { useEffect, useState } from "react";
import { Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import SocialIcon from "../../../../icons/group.png";
import GovernanceIcon from "../../../../icons/greek-temple.png";
import EnvironmentalIcon from "../../../../icons/leaf.png";
import Managementcon from "../../../../icons/greek-temple.png";
import { getSustainabilityDataByUserId } from "../../../../hooks/sustainability";
import { Progress } from "antd";
import getUserInfo from "../../../../hooks/getUsers";
import { CardContainer, Container, Header } from "./styles";
import { ChevronRight } from "@mui/icons-material";

const categories = [
  { icon: SocialIcon, text: "Social" },
  { icon: GovernanceIcon, text: "Governance" },
  { icon: EnvironmentalIcon, text: "Environment" },
  { icon: Managementcon, text: "Management & Diligence" },
];

export default function ThemeBar({ value }) {
  const [resGov, setResGov] = useState({});
  const [resSocial, setResSocial] = useState({});
  const [resMa, setResMa] = useState({});
  const [resDilig, setResDilig] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const data = await getSustainabilityDataByUserId(userInfo?.uid);
        setResGov(data?.resGov || []);
        setResSocial(data?.resSocial || []);
        setResMa(data?.resMa || []);
        setResDilig(data?.resDilig || []);
      } catch (error) {
        console.error("Erro ao verificar os dados de sustentabilidade:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);

  const soma =
    parseInt(resGov?.result) +
    parseInt(resSocial?.result) +
    parseInt(resMa?.result) +
    parseInt(resDilig?.result);

  const categoryPercentages = {
    Governance: resGov.result || 0,
    Social: resSocial.result || 0,
    Environment: resMa.result || 0,
    "Management & Diligence": resDilig.result || 0,
  };

  const maxValues = {
    Governance: 50,
    Social: 23,
    Environment: 30,
    "Management & Diligence": 30,
  };

  const qtyQuestions = {
    Governance: 20,
    Social: 8,
    Environment: 12,
    "Management & Diligence": 12,
  };

  function getColorForPercentage(percentage) {
    if (percentage >= 60) {
      return "#87d068"; // Verde
    } else if (percentage >= 50) {
      return "#FDC27B"; // Amarelo
    } else {
      return "#f5222d"; // Vermelho
    }
  }

  function calculatePercentage(actualValue, max) {
    const percentage = Number((actualValue / max) * 100).toFixed(0);

    return percentage;
  }

  // falta trazer o uid do usuario e editar a questão
  return (
    <Container style={{ gridRow: 5, gridColumn: "1 / -1" }}>
      {categories.map((category, index) => (
        <CardContainer key={index}>
          <Link
            to={
              categoryPercentages[category.text]
                ? `/editform-sustainability/${category.text}`
                : `/form-sustainability/${category.text}`
            }
            style={{ textDecoration: "none" }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="body2"
                style={{ color: "#1B3065", fontWeight: "bold" }}
              >
                {category.text}
              </Typography>
              <Header>
                <span>{qtyQuestions[category.text]} Questions</span>

                {categoryPercentages[category.text] !== 0 ? (
                  <span>
                    Continue <ChevronRight />
                  </span>
                ) : (
                  <span>
                    Start <ChevronRight />
                  </span>
                )}
              </Header>

              <Progress
                percent={calculatePercentage(
                  categoryPercentages[category.text],
                  maxValues[category.text]
                )}
              />
            </CardContent>
          </Link>
        </CardContainer>
      ))}
    </Container>
  );
}
