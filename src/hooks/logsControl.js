import { database } from "../database/config";

export async function getAllLogs() {
  try {
    const logcontrolRef = database.ref("T-API").child("log");
    const snapshot = await logcontrolRef.once("value");
    return snapshot.val(); 
  } catch (error) {
    throw new Error("Erro ao obter dados de Analytics: " + error.message);
  }
}
