import axios from "axios";
import { APITSALE_KEY } from "./key";

export async function Snov(
  domain,
  type,
  limit,
  lastId,
  userName,
  userId,
  userIP  
  ) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      domain,
      type,
      limit,
      lastId,
      userName,
      userId,
      userIP       
    });

    const header = {
      headers: {         
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
    .post("https://apit-api/v1/domain-emails-with-info", body, header)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.log(error);
      reject("failed");
    });

  });
}

export default function SnovEmployeeData(
  linkedin,
  userName,
  userId,
  userIP
  ) {
  return new Promise((resolve, reject) => {

    const body = JSON.stringify({
      linkedin,
      userName,
      userId,
      userIP      
    });

    const header = {
      headers: {         
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
    .post("https://apit-api/v1/get-emails-from-url", body, header)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.log(error);
      reject("failed");
    });

  });
}

export async function SnovEmail(
  email,
  userName,
  userId,
  userIP
  ) {
  return new Promise((resolve, reject) => {

    const body = JSON.stringify({
      email,
      userName,
      userId,
      userIP      
    });

    const header = {
      headers: {         
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
    .post("https://apit-api/v1/profile-by-email", body, header)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.log(error);
      reject("failed");
    });

  });
}


export async function SnovAllEmails(
  emails,
  ) {
  return new Promise((resolve, reject) => {

    const body = JSON.stringify({
      emails,    
    });

    const header = {
      headers: {         
        Authorization: "Bearer " + APITSALE_KEY.key,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
    .post("https://apit-api/v1/all-emails", body, header)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.log(error);
      reject("failed");
    });

  });
}

