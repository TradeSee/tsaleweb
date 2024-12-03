import axios from "axios";
import { message } from "antd";

import { auth, database } from "../database/config";

export const signIn = async (email, pass) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signInWithEmailAndPassword(email, pass)
      .then((value) => {
        resolve("Login bem sucedido " + value);
      })
      .catch((err) => {
        reject("Erro ai se conectar: " + err);
      });
  });
};

export const authScreen = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const logout = async () => {
  await auth.signOut();
};

const injectLeads = async (name, lastName, email) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        "http://aaaaaaaaaa:34200/t-api/v1/newLeads",
        JSON.stringify({
          name,
          lastName,
          email,
        }),
        {
          headers: {
            Authorization: "Bearer " + "TOKENTAPI.key",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        resolve(response.data.id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export async function requestRegister(address, step1Data) {
  let firstLogin = true;
  let name = step1Data.name;
  let lastName = step1Data.lastName;
  let email = step1Data.email;
  let password = step1Data.password;
  let phone = step1Data.phone;
  let role = step1Data.role;
  let Credits = 100;

  let uid = null;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    uid = userCredential.user.uid;

    // leads
    //   const id = await injectLeads(name, lastName, email);

    await database.ref("Users").child(uid).set({
      name,
      lastName,
      email,
      phone,
      role,
      // leadId: id,
      firstLogin,
      address,
      Credits,
    });

    message.success(
      "Your account has been successfully created. Welcome aboard!"
    );
  } catch (error) {
    console.error("Erro durante o registro: ", error);
    message.error(
      "Unable to create account. Please check your information and try again."
    );
  }

  return uid;
}

export async function listEmail(email) {
  return new Promise(async (resolve, reject) => {
    await auth
      .fetchSignInMethodsForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
