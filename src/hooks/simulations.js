import { database } from "../database/config";

export async function getBySimulations(userId) {
    try {
      let simulations = [];
      const snapshot = await database.ref("Users").child(userId).child("Simulations").once("value");
      snapshot.forEach((element) => {
        let obj = element.val();
        obj.id = element.key;
        simulations.push(obj);
      });
      return simulations;
    } catch (error) {
      throw error;
    }
  }
  
  export async function deleteSimulation(userId, id) {
    await  database.ref("Users").child(userId).child("Simulations").child(id).remove();
  }