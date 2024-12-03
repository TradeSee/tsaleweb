import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { History } from "@mui/icons-material";
import { format, isAfter, subDays } from "date-fns";
import { Button } from "antd";

import { authScreen } from "../../../../contexts/auth";
import getUserInfo from "../../../../hooks/getUsers";

import { Container, Header, FilterButton } from "./styles";
import { PaidStatusTag } from "../../../../utils/paidStatusTag";
import { stripeService } from "../../../../service/apiStripe";

export default function Payment({ toggleDrawer }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
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

  function FormatDate(date) {
    const correctDate = new Date(date);

    return format(correctDate, "MMM dd, yyyy");
  }

  const customerId = userInfo?.userData?.customerId;
  useEffect(() => {
    if (userInfo) {
      async function fetchPayments() {
        try {
          const response = await stripeService.getPayments(customerId);
          setPayments(response);
        } catch (error) {
          console.error("Erro ao buscar os pagamentos do cliente:", error);
        }
      }
      fetchPayments();
    }
  }, [userInfo]);

  const filteredPayments = useMemo(
    () =>
      payments.filter((credits) => {
        if (filter !== 0) {
          const actualDate = new Date();
          const expenseDate = new Date(credits.date);

          const limitDate = subDays(actualDate, filter);

          const filteredDate = isAfter(expenseDate, limitDate);

          return filteredDate;
        }

        return credits;
      }),
    [filter, payments]
  );

  return (
    <Container>
      <Header>
        <span>
          <History />
          <span>Payment History</span>
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
          <th>Status</th>
          <th>Invoice</th>
        </tr>
        {filteredPayments.map((item, index) => (
          <tr key={index}>
            <td>{FormatDate(item.date)}</td>
            <td>{item.description}</td>
            <td>
              <PaidStatusTag status={item.status} />
            </td>
            <td>
              <Button
                type="primary"
                href={item.hosted_invoice_url}
                target="_blank"
              >
                {" "}
                Download{" "}
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
}
