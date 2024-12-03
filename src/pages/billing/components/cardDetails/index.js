import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import axios from "axios";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCcAmex,
  faCcDinersClub,
  faCcDiscover,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import { Table } from "antd";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #dedede;
  border-radius: 4px;
  width: 100%;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardIcon = styled.img`
  width: 40px;
  margin-right: 10px;
`;

const CardName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark[950]};
`;

const CardEnding = styled.div`
  font-size: 12px;
  color: #888;
`;

const RemoveButton = styled.button`
  background-color: #fff;
  color: #ff6347;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const CardDetails = ({ cards }) => {
  const theme = useContext(ThemeContext);

  if (!cards || !Array.isArray(cards)) {
    return null;
  }

  const handleRemoveCard = async (customerId, cardId) => {
    try {
      const response = await axios.post(
        "https://api4242/removecard",
        {
          customerId,
          cardId,
        }
      );
      console.log(response.data.message);
      let successMessage = "Card successfully deleted";
      message.success(successMessage);
    } catch (error) {
      console.error("Erro ao excluir cartão:", error);
      let errorMessage = "Error";
      message.error(errorMessage);
    }
  };

  library.add(
    faCcJcb,
    faCcAmex,
    faCcDinersClub,
    faCcDiscover,
    faCcMastercard,
    faCcVisa
  );

  const formatCardExpiry = (expMonth, expYear) => {
    return `${expMonth}/${expYear}`;
  };

  const columns = [
    {
      title: "Card Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => (
        <FontAwesomeIcon
          icon={[
            "fab",
            `fa-cc-${
              text === "American Express"
                ? "amex"
                : text.toLowerCase().replace(" ", "-")
            }`,
          ]}
          size="2xl"
          color={theme.colors.dark[950]}
          style={{
            marginRight: 12,
          }}
        />
      ),
    },
    {
      title: "Last 4",
      key: "last4",
      dataIndex: "last4",
      render: (text) => <CardEnding>Credit card ending {text}</CardEnding>,
    },
    {
      title: "Card Expiry",
      dataIndex: "card_expiry",
      key: "card_expiry",
      render: (text, record) =>
        formatCardExpiry(record.exp_month, record.exp_year),
    },
    {
      title: "Settings",
      dataIndex: "settings",
      key: "settings",
      render: (text, record) => (
        <RemoveButton
          onClick={() => handleRemoveCard(record.customer, record.id)}
        >
          Remove
        </RemoveButton>
      ),
    },
  ];

  return (
    // <>
    //   {cards.map((card) => (
    //     <CardContainer key={card.id}>
    //       <CardInfo>
    //         <FontAwesomeIcon
    //           icon={[
    //             "fab",
    //             `fa-cc-${
    //               card.brand === "American Express"
    //                 ? "amex"
    //                 : card.brand.toLowerCase().replace(" ", "-")
    //             }`,
    //           ]}
    //           size="2xl"
    //           color="#002C67"
    //           style={{
    //             marginRight: 12,
    //           }}
    //         />
    //         {/* <CreditCardIcon /> */}
    //         <div>
    //           <CardName>{card.brand}</CardName>
    //           <CardEnding>Credit card ending {card.last4}</CardEnding>
    //         </div>
    //         <div style={{ marginLeft: "80px" }}>
    //           <CardEnding>
    //             {card.exp_month}/{card.exp_year}
    //           </CardEnding>
    //         </div>
    //       </CardInfo>
    //       <RemoveButton
    //         onClick={() => handleRemoveCard(card.customer, card.id)}
    //       >
    //         Remove
    //       </RemoveButton>
    //     </CardContainer>
    //   ))}
    // </>
    <>
      <Table columns={columns} dataSource={cards} />
    </>
  );
};

export default CardDetails;
