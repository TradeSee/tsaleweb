import axios from "axios";

export function getAllDataHunter(companyId, domain, limit) {
  return new Promise((resolve, reject) => {
    const body = {};
    if (companyId) {
      body.companyId = companyId;
    }
    body.domain = domain;
    body.limit = limit;
    const payload = JSON.stringify(body);

    console.log("companyId", body);
    console.log("payload", payload);

    const header = {
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/hunter-all-data", payload, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

export function finderLink(companyName, country) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      companyName,
      country,
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://api3741/finder-link", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

export function finderLinkSecond(companyName, country) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      companyName,
      country,
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://api3741/finder-link-second", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

export function HunterGetEmail(
  domain,
  first_name,
  last_name,
  user,
  userId,
  userIp
) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      domain,
      first_name,
      last_name,
      user,
      userId,
      userIp,
    });

    const header = {
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post("https://apit-api/v1/hunter-email-data", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
