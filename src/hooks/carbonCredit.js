import { database } from "../database/config";


  export async function getIdCarbonCredit(userId) {
    try {
      const userRef = database.ref(`Users/${userId}`);

      const snapshot = await userRef.once("value");
      const userData = snapshot.val();

      if (userData.idAband) {
        // se o usuário existir, retorna suas respostas
        return userData.idAband;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        `Erro ao obter os dados o usuário ${userId}:`,
        error
      );
      return null;
    }
  }

  
  export async function getTokenCarbon(userId) {
    try {
      const userRef = database.ref(`Users/${userId}`);

      const snapshot = await userRef.once("value");
      const userData = snapshot.val();

      if (userData.accessToken) {
        // se o usuário existir, retorna suas respostas
        return userData.accessToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        `Erro ao obter os dados o usuário ${userId}:`,
        error
      );
      return null;
    }
  }
