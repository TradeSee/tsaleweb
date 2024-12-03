import { database } from "../database/config";

export async function FunctionActiveStatus(data) {
  try {
    const controlFunctionsRef = database.ref("ControlFunctions");
    await controlFunctionsRef.update({ ativo: data });
  } catch (error) {
    throw new Error("Erro ao atualizar o status da função: " + error.message);
  }
}

export async function FunctionTestStatus(data) {
  try {
    const controlFunctionsRef = database.ref("ControlFunctions");
    await controlFunctionsRef.update({ test: data });
  } catch (error) {
    throw new Error("Erro ao atualizar o status da função: " + error.message);
  }
}

export async function getFunctionStatus() {
  try {
    const controlFunctionsRef = database.ref("ControlFunctions");
    const snapshot = await controlFunctionsRef.once("value");

    return snapshot;
  } catch (error) {
    console.error("Error fetching favorite compliance:", error);
    throw error;
  }
}
