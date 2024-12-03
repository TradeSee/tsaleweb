/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { message } from "antd";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Container } from "./styles";
import { TextDefault } from "../../../../assets/styles";

function CreditCardForm({ onCancel, info, address }) {
  const [currentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
  const [cardName, setCardName] = useState("");
  const [cardMonth] = useState("");
  const [cardYear] = useState("");
  const [cardCvv] = useState("***");
  const [cardBrand, setCardBrand] = useState("visa");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [maskedCardNumber] = useState("1234 #### #### 1234");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardNum = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvv = elements.getElement(CardCvcElement);

    if (!cardNum || !cardExpiry || !cardCvv) {
      console.error("Elemento do cartão não encontrado.");
      return;
    }

    const { token, error } = await stripe.createToken(cardNum, {
      name: cardName,
      address_zip: address?.postalCode || "",
      address_state: address?.state || "",
      address_city: address?.city || "",
      address_line1: address?.line1 || "",
      address_country: address.country || "",
    });

    if (error) {
      console.error(error);
    } else {
      fetch("https://api4242/save-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.id, info, address }),
      })
        .then((response) => {
          if (response.ok === true) {
            let sucessMesage = "Card saved successfully!";
            message.success(sucessMesage);
            window.location.reload();
            onCancel();
          }
        })
        .catch((error) => {
          console.error("Erro ao enviar token para o servidor:", error);
          let errorMessage = "Error";
          message.error(errorMessage);
        });
    }
  };

  const handleCardNumberChange = (e) => {
    setCardBrand(e.brand === "unknown" ? "visa" : e.brand);
  };

  const flipCard = (status) => {
    setIsCardFlipped(status);
  };

  return (
    <Container className="wrapper" id="app">
      <div className="card-form">
        <TextDefault color={"#17283E"} bold={"700"} size={"20px"}>
          Save new card for future payments
        </TextDefault>

        <div className="card-form__inner">
          <div
            className="card-input"
            style={{ display: "flex", alignItems: "center" }}
          >
            <CardNumberElement
              className="card-input__input"
              id="cardCvv"
              options={{
                style: { base: { fontSize: "18px", border: "none" } },
              }}
              onChange={(e) => handleCardNumberChange(e)}
            />

            <img
              src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${cardBrand}.png`}
              className="card-item__typeImg"
              alt="Card Flag"
            />
          </div>

          <div
            className="card-form __col -cvv"
            style={{ display: "flex", gap: "24px" }}
          >
            <div className="card-input" style={{ width: "100%" }}>
              <CardCvcElement
                onFocus={() => flipCard(true)}
                onBlur={() => flipCard(false)}
                className="card-input__input"
                id="cardCvv"
                options={{
                  style: { base: { fontSize: "18px" } },
                }}
              />
            </div>

            <div className="card-input" style={{ width: "100%" }}>
              <CardExpiryElement
                onFocus={() => flipCard(true)}
                onBlur={() => flipCard(false)}
                className="card-input__input"
                id="cardCvv"
                options={{
                  style: { base: { fontSize: "18px" } },
                }}
              />
            </div>
          </div>
        </div>

        <button className="card-form__button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </Container>
  );
}

export default CreditCardForm;
