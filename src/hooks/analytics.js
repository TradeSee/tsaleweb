import { database } from "../database/config";

export async function saveAnalytics(userId, info) {
  try {
    const newKey = database.ref().child(`Analytics/${userId}`).push().key;

    const dataPath = `Analytics/${userId}/${newKey}`;

    const newData = {
      action: info.action,
      date: info.date,
      page: info.page,
      keywords: info.keywords,
      name: info.name,
    };

    await database.ref(dataPath).set(newData);
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
}

export async function getAllAnalyticsData() {
  try {
    const analyticsRef = database.ref("Analytics");
    const snapshot = await analyticsRef.once("value");
    return snapshot.val();
  } catch (error) {
    throw new Error("Erro ao obter dados de Analytics: " + error.message);
  }
}
