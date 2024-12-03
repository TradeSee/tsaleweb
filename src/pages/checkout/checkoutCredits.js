import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { TextDefault } from "../../assets/styles";
import { ButtonContainer, CheckoutButton } from "../billing/credits/styles";
import Select from "react-select";

export default function CheckoutCredits({
  credits,
  userId,
  cards,
  info,
  address,
  pay,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const stateData = {
      userId: userId,
      credits: credits,
    };

    // Transforme o objeto de estado em uma string codificada
    const stateParam = encodeURIComponent(JSON.stringify(stateData));

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://app.tsalemetals.com/successCredits?state=${stateParam}`,
        },
      });

      if (paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!");
      } else if (error) {
        setMessage(error.message);
      } else {
        setMessage("Payment processing or requires action.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  function payCredits() {
    let cardId = selectedPaymentMethod;

    fetch("https://api4242/payment-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, pay, address, cardId }),
    })
      .then((res) => res.json())
      .then((data) => {
        const stateData = {
          userId: userId,
          credits: credits,
          priceId: pay,
        };

        const stateParam = encodeURIComponent(JSON.stringify(stateData));
        window.open(
          `https://app.tsalemetals.com/Success?state=${stateParam}`,
          "_self"
        );
      })
      .catch((error) => {
        console.error("Erro ao obter o clientSecret:", error);
      });
  }

  const handleReturn = () => {
    setSelectedPaymentMethod(null);
  };

  return (
    <>
      <TextDefault color={"#002D68"}> Select saved card </TextDefault>
      <Select
        placeholder="Select payment method"
        className="basic-select"
        classNamePrefix="Select payment method"
        name="Cards"
        onChange={(selectedOption) =>
          setSelectedPaymentMethod(selectedOption.value)
        }
        options={cards.map((card) => ({
          value: card.id,
          label: `${card.brand} ending in ${card.last4}`,
        }))}
        isSearchable
      />

      <TextDefault color={"#002D68"}> Or </TextDefault>
      {selectedPaymentMethod ? (
        <>
          <ButtonContainer>
            <CheckoutButton onClick={handleReturn}>Back</CheckoutButton>
            <CheckoutButton onClick={payCredits}>Pay now</CheckoutButton>
          </ButtonContainer>
        </>
      ) : (
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      )}
    </>
  );
}
