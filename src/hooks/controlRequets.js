import { database } from "../database/config";

export async function saveControlRequests(info) {
  try {
    const newKey = database.ref().child(`ControlRequests`).push().key;
    const dataPath = `ControlRequests/${newKey}`;

    const newData = {  
      action: info.action,
      date: info.date,
      api: info.api,
      keywords: info.keywords,
      user:  info.user,
    };

    await database.ref(dataPath).set(newData);

    console.log("Dados salvos com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
}
