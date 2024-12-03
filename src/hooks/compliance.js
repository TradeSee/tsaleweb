import { message } from "antd";

import { database } from "../database/config";

export async function getSessionId() {
  try {
    const ref = database.ref("key");

    const snapshot = await ref.once("value");
    const sessionId = snapshot.val();
    return sessionId;
  } catch (error) {
    console.error("Erro ao recuperar sessionid:", error);
    throw error;
  }
}

export async function saveCompliance(userId, data) {
  database
    .ref(`Users/${userId}/MyCompliance`)
    .push(data)
    .then(() => {
      message.success("Compliance succefully saved");
    })
    .catch((error) => {
      console.error("Erro ao salvar os dados:", error);
      message.error("Error saving compliance, Please try again later");
    });
}

export async function getCompliance(userId) {
  try {
    const userRef = database.ref("Users").child(userId).child("MyCompliance");
    const snapshot = await userRef.once("value");
    const favoriteCompliance = snapshot.val() || {};

    return favoriteCompliance;
  } catch (error) {
    console.error("Error fetching favorite compliance:", error);
    throw error;
  }
}

export async function deleteCompliance(userId, key) {
  try {
    const userRef = database.ref("Users").child(userId).child("MyCompliance");
    await userRef.child(key).remove();
    message.success("Compliance succefully deleted");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    message.error("Error deleting compliance, Please try again later");
    throw error;
  }
}
