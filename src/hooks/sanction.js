import axios from "axios";
import { database } from "../database/config";

export async function saveSanction(userId, data) {
  database
    .ref(`Users/${userId}/MySanction`)
    .push(data)
    .then(() => {
      console.log("Dados salvos com sucesso no Firebase!");
    })
    .catch((error) => {
      console.error("Erro ao salvar os dados:", error);
    });
}

export async function getSanction(userId) {
  try {
    const userRef = database.ref("Users").child(userId).child("MySanction");
    const snapshot = await userRef.once("value");
    const favoriteSanction = snapshot.val() || {};

    return favoriteSanction;
  } catch (error) {
    console.error("Error fetching favorite Sanction:", error);
    throw error;
  }
}

export async function deleteSanction(userId, key) {
  try {
    const userRef = database.ref("Users").child(userId).child("MySanction");
    await userRef.child(key).remove();
    console.log('Excluido!');
  } catch (error) {
    console.error("Erro ao excluir:", error);
    throw error;
  }
}