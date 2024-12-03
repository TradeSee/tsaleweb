import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Select from "react-select";
import { TextDefault } from "../../assets/styles";
import { ButtonContainer, CheckoutButton } from "../billing/credits/styles";

export default function CheckoutPage({
  priceId,
  userId,
  priceSponsor,
  cards,
  info,
  address,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const priceToCredits = {
    price_1OzHSRJcSI08Gr0KDBth9uWf: 100,
    price_1OzHSpJcSI08Gr0K7nBDzSsh: 100,
    price_1OzHSgJcSI08Gr0K9D6lV0Uh: 200,
    price_1OzHStJcSI08Gr0KFoVWoteD: 200,
    price_1OzHSlJcSI08Gr0KK3ZbnrrI: 500,
    price_1OzHSwJcSI08Gr0KrQMeLKJR: 500,
  };

  // pegar o valor dos credits com base no priceId
  function getCreditsFromPriceId(priceId) {
    return priceToCredits[priceId] || 0;
  }

  const creditsFromPriceId = getCreditsFromPriceId(priceId);

  const credits = creditsFromPriceId;

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
      priceId: priceId,
    };

    // Transforme o objeto de estado em uma string codificada
    const stateParam = encodeURIComponent(JSON.stringify(stateData));

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://app.tsalemetals.com/Success?state=${stateParam}`,
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

  function payPlan() {
    let cardId = selectedPaymentMethod;
    fetch("https://api4242/create-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ info, priceId, address, cardId }),
    })
      .then((res) => res.json())
      .then((data) => {
        const stateData = {
          userId: userId,
          credits: credits,
          priceId: priceId,
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

  console.log(selectedPaymentMethod);

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
            <CheckoutButton onClick={payPlan}>Pay now</CheckoutButton>
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
