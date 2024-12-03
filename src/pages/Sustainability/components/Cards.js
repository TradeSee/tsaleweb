import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import SocialIcon from "../../../icons/group.png";
import GovernanceIcon from "../../../icons/greek-temple.png";
import EnvironmentalIcon from "../../../icons/leaf.png";
import Managementcon from "../../../icons/greek-temple.png";
import { getSustainabilityDataByUserId } from "../../../hooks/sustainability";
import { Progress } from "antd";
import getUserInfo from "../../../hooks/getUsers";

const categories = [
  { icon: SocialIcon, text: "Social" },
  { icon: GovernanceIcon, text: "Governance" },
  { icon: EnvironmentalIcon, text: "Environment" },
  { icon: Managementcon, text: "Management & Diligence" },
];

export default function CardsSustain({ value }) {
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
    Governance: resGov.result,
    Social: resSocial.result,
    Environment: resMa.result,
    "Management & Diligence": resDilig.result,
  };

  const maxValues = {
    Governance: 50,
    Social: 23,
    Environment: 30,
    "Management & Diligence": 30,
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

  // falta trazer o uid do usuario e editar a questão
  return (
    <div
      style={{
        gridRow: 3,
        gridColumn: "1/-1",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridAutoFlow: "row",
        columnGap: 16,
        justifyContent: "space-between",
      }}
    >
      {categories.map((category, index) => (
        <Grid item key={index}>
          <Link
            to={
              categoryPercentages[category.text]
                ? `/editform-sustainability/${category.text}`
                : `/form-sustainability/${category.text}`
            }
            style={{ textDecoration: "none" }}
          >
            <Card
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "100%",
                }}
              >
                {categoryPercentages[category.text] ? (
                  <Progress
                    type="circle"
                    percent={(
                      (categoryPercentages[category.text] /
                        maxValues[category.text]) *
                      100
                    ).toFixed(2)}
                    size={window.innerWidth >= 1100 ? 80 : 60}
                    strokeColor={getColorForPercentage(
                      (categoryPercentages[category.text] /
                        maxValues[category.text]) *
                        100
                    )}
                  />
                ) : (
                  <img src={category.icon} alt={category.text} />
                )}
                <Typography
                  variant="body2"
                  style={{ color: "#1B3065", marginTop: 16 }}
                >
                  {category.text}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </div>
  );
}
