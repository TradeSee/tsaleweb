import axios from "axios";
import { APITSALE_KEY } from "./key";
import { saveControlRequests } from "../hooks/controlRequets";
import { format } from "date-fns";

export default function GlobalCompany(
  country,
  hsCode,
  nCompanies,
  sMin,
  sMax,
  role,
  userName,
  userId,
  userIP,
  from,
  to,
  countryTrade,
  excludeId
) {
  return new Promise((resolve, reject) => {
    const formattedDate = new Date().toISOString();
    const lastYear = new Date().setFullYear(new Date().getFullYear() - 1);

    const infoRequest = {
      action: "Requested",
      date: formattedDate,
      api: "Global Company API",
      keywords: `${country} - ${hsCode} - ${role}`,
      user: userName,
    };
    saveControlRequests(infoRequest);

    const body = JSON.stringify({
      country,
      hsCode,
      nCompanies: multiploOfFive(nCompanies),
      sMin,
      sMax,
      role,
      user: userName,
      excludeId,
      sort: {
        field: "shipmentValue",
        direction: "descending",
      },
      fromDate:
        typeof from === "string" ? from : format(lastYear, "yyyy-MM-dd"),
      toDate: typeof to === "string" ? to : format(Date.now(), "yyyy-MM-dd"),
      userId,
      userIp: userIP,
      countriesTradingWithList: countryTrade,
    });

    const header = {
      headers: {
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/full-request", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

function multiploOfFive(num) {
  let resultado = Math.ceil(num / 5) * 5;
  return resultado < 5 ? 5 : resultado;
}
