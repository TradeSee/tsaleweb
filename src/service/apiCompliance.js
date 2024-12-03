import axios from "axios";
import { APITSALE_KEY } from "./key";

export default function ApiCompliance(
  hsCode,
  countryOfImport,
  countryOfExport,
  hsCodeType,
  tradeDirection
) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      hsCode,
      countryOfImport,
      countryOfExport,
      hsCodeType,
      tradeDirection,
    });

    const header = {
      headers: {
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/compliance", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
