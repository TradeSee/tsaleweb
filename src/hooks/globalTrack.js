import { database } from "../database/config";

export async function saveTracking(userId, data) {
    try {
      let trackNumber = 0;
      const ref = database.ref(`Users/${userId}/Tracking`);
  
      await ref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          if (key.startsWith("track")) {
            const num = parseInt(key.slice(5));
            if (!isNaN(num) && num >= trackNumber) {
              trackNumber = num + 1;
            }
          }
        });
      });
  
      await ref.child(`track${trackNumber}`).set(data);
      console.log("Dados salvos com sucesso no Firebase!");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  }
  

export async function getTracking(userId) {
  try {
    const userRef = database.ref("Users").child(userId).child("Tracking");
    const snapshot = await userRef.once("value");
    const favoriteTracking = snapshot.val() || {};

    return favoriteTracking;
  } catch (error) {
    console.error("Error fetching favorite compliance:", error);
    throw error;
  }
}

export async function deleteTracking(userId, trackName) {
    try {
      const ref = database.ref(`Users/${userId}/Tracking`);
  
      let keyToDelete = null;
      await ref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          if (key === trackName) {
            keyToDelete = key;
          }
        });
      });
  
      if (keyToDelete) {
        await ref.child(keyToDelete).remove();
        console.log(`Dados do ${trackName} deletados com sucesso!`);
      } else {
        console.log(`Nenhum registro encontrado com o nome ${trackName}.`);
      }
    } catch (error) {
      console.error("Erro ao deletar os dados:", error);
    }
  }