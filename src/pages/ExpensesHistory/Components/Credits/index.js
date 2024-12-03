import React, { useEffect, useMemo, useState } from "react";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../../../contexts/auth";
import getUserInfo, { getHistoryCredits } from "../../../../hooks/getUsers";

import { Container, FilterButton, Header } from "./styles";

import CreditsMock from "../../Mocks/Credits";
import { format, isAfter, subDays } from "date-fns";
import { History } from "@mui/icons-material";

export default function Credits({ toggleDrawer }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [historyC, setHistoryC] = useState([]);
  const [filter, setFilter] = useState(0);

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
    if (userInfo) {
      getHistoryCredits(userInfo?.uid)
        .then((dados) => {
          if (dados) {
            const historyArray = Object.values(dados);
            setHistoryC(historyArray);
          } else {
            setHistoryC(["No history"]);
          }
        })
        .catch((error) => {
          console.error("Erro ao verificar os dados do histórico:", error);
        });
    }
  }, [userInfo]);

  function FormatDate(date) {
    const correctDate = new Date(date);

    return format(correctDate, "MMM dd, yyyy");
  }

  const filteredCredits = useMemo(
    () =>
      historyC.filter((credits) => {
        if (filter !== 0) {
          const actualDate = new Date();
          const expenseDate = new Date(credits.date);

          const limitDate = subDays(actualDate, filter);

          const filteredDate = isAfter(expenseDate, limitDate);

          return filteredDate;
        }

        return credits;
      }),
    [filter]
  );

  return (
    <Container>
      <Header>
        <span>
          <History />
          <span>Credits History</span>
        </span>

        <div>
          <FilterButton
            onClick={() => setFilter(0)}
            isFilterSelected={filter === 0}
          >
            <p>All</p>
          </FilterButton>

          <FilterButton
            onClick={() => setFilter(7)}
            isFilterSelected={filter === 7}
          >
            <p>Last 7 days</p>
          </FilterButton>
          <FilterButton
            onClick={() => setFilter(15)}
            isFilterSelected={filter === 15}
          >
            <p>Last 15 days</p>
          </FilterButton>
          <FilterButton
            onClick={() => setFilter(30)}
            isFilterSelected={filter === 30}
          >
            <p>Last 30 days</p>
          </FilterButton>
        </div>
      </Header>
      <table>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Credits</th>
        </tr>
        {filteredCredits.map((item, index) => (
          <tr key={index}>
            <td>{FormatDate(item.date)}</td>
            <td>{item.text}</td>
            <td>{item.credits}</td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
