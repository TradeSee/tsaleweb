import { database } from "../database/config";

export function addSustainability(info) {
    const { ResGov, ResSocial, ResMa, ResDilig, uid } = info;
    const databaseRef = database.ref();

    // verificando qual que vai enviar e salvar
    if (ResGov) {
      databaseRef.child(`/SustainabilityForm/${uid}/resGov`).update(ResGov);
     
    }
    if (ResSocial) {
      databaseRef
        .child(`/SustainabilityForm/${uid}/resSocial`)
        .update(ResSocial);        
    }
    if (ResMa) {
      databaseRef.child(`/SustainabilityForm/${uid}/resMa`).update(ResMa);
    }
    if (ResDilig) {
      databaseRef.child(`/SustainabilityForm/${uid}/resDilig`).update(ResDilig);
    }
  }

  export async function getSustainabilityDataByUserId(userId) {
    try {
      const sustainabilityRef = database.ref(`SustainabilityForm/${userId}`);

      const snapshot = await sustainabilityRef.once("value");
      const userData = snapshot.val();

      if (userData) {
        // se o usuário existir, retorna suas respostas
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        `Erro ao obter os dados de sustentabilidade para o usuário ${userId}:`,
        error
      );
      return null;
    }
  }

 export async function getQuestionSustain(questionId, uid, responseType) {
    const databaseRef = database.ref();

    try {
      const path = `/SustainabilityForm/${uid}/${responseType}/${questionId}`;
      const snapshot = await databaseRef.child(path).once("value");

      const questionData = snapshot.val();
      return questionData;
    } catch (error) {
      console.error("Erro ao obter a pergunta:", error);
      return null;
    }
  }