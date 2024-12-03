import { useEffect, useState } from "react";
import { database } from "../database/config";
import { cipherCKey } from "../service/key/index";
import CryptoJS from "crypto-js";
import { getHistoryCredits } from "./getUsers";

// Função para descriptografar o campo "Credits"
function decryptCredits(encryptedCredits, cipherKey) {
  try {
    if (!encryptedCredits) {
      console.error(
        "Error decrypting credits: encryptedCredits is empty or undefined"
      );
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedCredits, cipherKey);
    const decryptedCredits = parseFloat(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedCredits;
  } catch (error) {
    console.error("Error decrypting credits:", error);
    return null;
  }
}

export async function handleLimitCredits(userId) {
  const allCreditsObj = await getHistoryCredits(userId);

  if (!allCreditsObj) {
    const formattedDate = new Date().toISOString();

    const infoC = {
      text: `First login`,
      type: "decrease",
      date: formattedDate,
      credits: 0,
    };

    await historyCredits(infoC, userId);

    const allCreditsObj = await getHistoryCredits(userId);
    const allCredits = Object.values(allCreditsObj);
    const allCreditsUsed = allCredits.filter(
      (credit) => credit.type === "decrease"
    );

    const creditsUsedToday = allCreditsUsed.filter((credit) => {
      if (credit.date) {
        const date = new Date(credit?.date);
        const today = new Date();

        const actualDate =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();

        return actualDate;
      }

      return false;
    });

    const creditsUsed = creditsUsedToday.reduce(
      (acc, actual) => acc + parseFloat(actual.credits),
      0
    );

    return creditsUsed >= 1000;
  }

  const allCredits = Object.values(allCreditsObj);
  const allCreditsUsed = allCredits.filter(
    (credit) => credit.type === "decrease"
  );

  const creditsUsedToday = allCreditsUsed.filter((credit) => {
    if (credit.date) {
      const date = new Date(credit?.date);
      const today = new Date();

      const actualDate =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      return actualDate;
    }

    return false;
  });

  const creditsUsed = creditsUsedToday.reduce(
    (acc, actual) => acc + parseFloat(actual.credits),
    0
  );

  return creditsUsed >= 1000;
}

export async function viewCredit(userId) {
  const userRef = database.ref("Users").child(userId);

  const snapshot = await userRef.child("Credits").once("value");
  let creditsValue = snapshot.val();

  if (typeof creditsValue === "number") {
    const encryptedCredits = CryptoJS.AES.encrypt(
      creditsValue.toString(),
      cipherCKey.key
    ).toString();
    creditsValue = encryptedCredits;
    await userRef.update({ Credits: encryptedCredits });
  } else if (typeof creditsValue === "string") {
    let decryptedCredit = decryptCredits(creditsValue, cipherCKey.key);
    if (decryptedCredit < 0) {
      decryptedCredit = 0;
      return decryptedCredit;
    }

    return decryptedCredit;
  } else {
    console.error("Invalid value for Credits:", creditsValue);
  }
}

export async function viewPlanMonthly(userId) {
  const userRef = database.ref("Users").child(userId);

  const snapshot = await userRef.child("planMonthly").once("value");
  let planValue = snapshot.val();

  if(planValue) {
    return planValue
  }
  return 0;


}
export async function viewAddMonthly(userId) {
  const userRef = database.ref("Users").child(userId);

  const snapshot = await userRef.child("addMonthly").once("value");
  let planValue = snapshot.val();

  if(planValue) {
    return planValue
  }
  return 0;

}

export async function registerPlan(userId, credits) {
  try {
    database.ref("Users").child(userId).update({
      planMonthly: credits
    });
  } catch (error) {
    console.error("Error register plan:", error);
  }
}
export async function registerAdd(userId, credits) {
  try {
    database.ref("Users").child(userId).update({
      addMonthly: credits
    });
  } catch (error) {
    console.error("Error register plan:", error);
  }
}

export async function addCredit(userId, credits) {
  try {
    const userRef = database.ref("Users").child(userId);

    const snapshot = await userRef.child("Credits").once("value");
    const encryptedCredits = snapshot.val();

    const decryptedCredits = decryptCredits(encryptedCredits, cipherCKey.key);

    // converter credits para número e somar ao valor atual de "Credits"
    const creditsToAdd = parseFloat(credits);
    const newCredits = decryptedCredits + creditsToAdd;

    // criptografar o novo valor de "Credits"
    let cipher = CryptoJS.AES.encrypt(
      newCredits.toString(),
      cipherCKey.key
    ).toString();
    // atualizar o valor do campo "Credits"
    await userRef.update({ Credits: cipher });
  } catch (error) {
    console.error("Error updating credits:", error);
  }
}

export async function deleteCredit(userId, data) {
  try {
    const userRef = database.ref("Users").child(userId);

    const snapshot = await userRef.child("Credits").once("value");
    const encryptedCredits = snapshot.val();

    // descriptografar o valor de "Credits"
    const decryptedCredits = decryptCredits(encryptedCredits, cipherCKey.key);

    // subtrair o valor desejado do valor atual de "Credits"
    const creditsToSubtract = parseFloat(data);
    const newCredits = decryptedCredits - creditsToSubtract;

    // criptografar o novo valor de "Credits"
    let cipher = CryptoJS.AES.encrypt(
      newCredits.toString(),
      cipherCKey.key
    ).toString();

    // atualizar o valor do campo "Credits"
    await userRef.update({ Credits: cipher });
  } catch (error) {
    console.error("Error deleting credits:", error);
  }
}

export async function historyCredits(infoC, userId) {
  try {
    const userRef = database.ref("HCredits").child(userId);

    const snapshot = await userRef.once("value");
    const childrenKeys = snapshot.val() ? Object.keys(snapshot.val()) : [];

    const infoNumbers = childrenKeys
      .filter((key) => key.startsWith("info"))
      .map((key) => parseInt(key.replace("info", ""), 10));
    const maxInfoNumber = Math.max(...infoNumbers, 0);

    const newKey = `info${maxInfoNumber + 1}`;

    await userRef.child(newKey).set(infoC);
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
}
