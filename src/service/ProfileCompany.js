import axios from "axios";

export default function ProfileCompany(
  id,
  shipName,
  country,

  userName,
  userId,
  userIP
) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      id,
      shipName,
      country,

      user: userName,
      userId,
      userIp: userIP,
    });

    const header = {
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/fullDataCompanies", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
