import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({priceId, userId, priceIdSponsor}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

// mapeamento de priceId
const priceToCredits = {
  'price_1NfU4xJcSI08Gr0KxdZsQbjT': 100,
  'price_1NfU7fJcSI08Gr0Kh9Ua7eS3': 100,
  'price_1NhZwUJcSI08Gr0KjQFDebtw': 500,
  'price_1NhZwUJcSI08Gr0KDA8n3o31': 500,
  'price_1NNcLWJcSI08Gr0KxdCgGR90': 1000,
  'price_1NNby8JcSI08Gr0KZfT3ztfK': 1000,
};

// pegar o valor dos credits com base no priceId
function getCreditsFromPriceId(priceId) {
  return priceToCredits[priceId] || 0; 
}

let creditsFromPriceIdSponsor = 0;

const creditsFromPriceId = getCreditsFromPriceId(priceId);
if (priceIdSponsor !== "") {
  // Se não for uma string vazia, some 40 créditos
  creditsFromPriceIdSponsor = 40;
}
const credits = creditsFromPriceId + creditsFromPriceIdSponsor;


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
    const stateParam = encodeURIComponent(JSON.stringify(stateData))

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

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
