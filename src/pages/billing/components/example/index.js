const { default: axios } = require("axios");
const { useState } = require("react");

export default function Example() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const amount = "200";
  const context = {
    context: {
      mobile: false,
      isEcommerce: true,
    },
  };

  async function generateToken() {
    const card = {};
    const exp = cardExpiry.split("/");
    card.expYear = exp[1];
    card.expMonth = exp[0];
    card.name = cardName;
    card.cvc = cardCVC;
    card.number = cardNumber;

    card.address = {};
    card.address.streetAddress = streetName;
    card.address.country = country;
    card.address.region = state;
    card.address.city = city;
    card.address.postalCode = postalCode;

    const cardObj = { card: card };

    // Rota deles
    const token = await axios
      .post(
        "https://aaaaaaaa.com",
        JSON.stringify(cardObj),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log("Error to tokenize card:", err));

    return token;
  }

  async function authorizePurchase() {
    const token = await generateToken();

    const jsonBody = {
      amount: amount,
      capture: false,
      currency: "USD",
      token: token,
      ...context,
    };

    // Rota nosso back
    const result = await axios
      .post("/authorizePurchase", jsonBody)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log("Error to authorize purchase:", err));

    return result;
  }

  async function captureCharge() {
    await authorizePurchase();

    const jsonBody = {
      amount: amount,
      ...context,
    };

    // Rota nosso back
    const result = await axios
      .post("/captureCharge", jsonBody)
      .then((res) => {
        console.log(res);
        return result;
      })
      .catch((err) => console.log("Error to finalize purchase:", err));

    return result;
  }

  return (
    <>
      <h3>Example paymen</h3>

      <form>
        <input
          type="tel"
          placeholder="Valid card Number"
          autoComplete="cc-number"
          name="cardNumber"
          required
          autoFocus
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <input
          type="tel"
          placeholder="MM / YYYY"
          autoComplete="cc-exp"
          name="cardExpiry"
          required
          autoFocus
          onChange={(e) => setCardExpiry(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Valid card Number"
          autoComplete="cc-csc"
          name="cardCVC"
          required
          autoFocus
          onChange={(e) => setCardCVC(e.target.value)}
        />
        <input
          type="text"
          placeholder="Full name on card"
          onChange={(e) => setCardName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street Address"
          onChange={(e) => setStreetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postal Code"
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <button id="submitPurchase" type="submit" onClick={captureCharge}>
          Purchase
        </button>
      </form>
    </>
  );
}
