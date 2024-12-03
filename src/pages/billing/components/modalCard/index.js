import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { TextDefault } from "../../../../assets/styles";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardForm from "../Card";

const stripePromise = loadStripe(
  "a"
);

const ModalSaveCard = ({ visible, onCancel, info, address }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);

  useEffect(() => {
    if (!stripe || !elements) {
      return setIsStripeLoaded(false);
    }

    return setIsStripeLoaded(true);
  }, [stripe, elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);

    if (!card) {
      console.error("Elemento do cartão não encontrado.");
      return;
    }

    const { token, error } = await stripe.createToken(card);

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

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      style={{ minHeight: "700px" }}
    >
      <CreditCardForm onCancel={onCancel} info={info} address={address} />
    </Modal>
  );
};

export default ModalSaveCard;
