import axios from "axios";

export default function getLinkedin(
  personName,
  companyName,
  userName,
  userId,
  userIP
) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      personName,
      companyName,
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
      .post("https://apit-api/v1/linkedin-person", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

export function getDataCompany(companyName, userName, userId, userIP) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      companyName,
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
      .post("https://apit-api/v1/data-company", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

export function getEmployeesCompany(companyName, userName, userId, userIP) {
  return new Promise((resolve, reject) => {
    console.log("aq");
    const body = JSON.stringify({
      companyName,
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
      .post("https://apit-api/v1/employees-company", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}

export function getUrlCompany(companyName, userName, userId, userIP) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      companyName,
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
      .post("https://apit-api/v1/get-url", body, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject("failed");
      });
  });
}
