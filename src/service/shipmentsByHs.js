import axios from "axios";
import { APITSALE_KEY } from "./key";

export default function ShipmentsCompanyHS(
  hsCodes,
  country,
  role,
  countryTrader
) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      hsCodes,
      country,
      role,
      countryTrader,
    });

    const header = {
      headers: {
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/shipmentsByHs", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
