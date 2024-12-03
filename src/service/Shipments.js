import axios from "axios";
import { APITSALE_KEY } from "./key";

export default function ShipmentsCompany(shipName, country, role) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      shipName,
      country,
      role,
    });

    const header = {
      headers: {
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/shipments", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
