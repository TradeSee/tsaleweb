import axios from "axios";

export default function ApiSanction(
  matchScore,
  entityName,
  dataSource,
  uid,
  country,
  address
) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      matchScore,
      entityName,
      dataSource,
      uid,
      country,
      address,
    });

    const header = {
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/sanction", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
