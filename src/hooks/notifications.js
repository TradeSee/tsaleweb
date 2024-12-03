import { database } from "../database/config";

export async function getPromotions() {
  return new Promise(async(resolve, reject) => {
    try {
      const promotionsRef = database.ref("Promotions");
      await promotionsRef.once("value", snapshot => {
  
        let array = []
        snapshot.forEach(item => {
          const obj = {
            created_at: item.val().created_at,
            id: item.val().id,
            status: item.val().status,
            text: item.val().text,
            type: item.val().type,
            description: item.val().description,
            route: item.val().route,
            key: item.key
          }
  
          array.push(obj)
  
        })
        resolve(array);
      });
  
  
  
    } catch (error) {
      reject("Erro ao obter dados das promoções: " + error.message);
    }
  })
}

export async function addNotification(promotionData) {
  try {
    const { text, type, created_at } = promotionData;

    const newPromotionRef = database.ref("Promotions").push();

    await newPromotionRef.set({
      text,
      type,
      created_at,
    });

    console.log("Nova promoção adicionada com sucesso!");

    return newPromotionRef.key;
  } catch (error) {
    throw new Error("Erro ao adicionar nova promoção: " + error.message);
  }
}

// criando um hash /id unico/
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // convertendo p um inteiro de 32 bits
  }
  return hash;
}

// para aprovação
export async function addNotificationDraft(promotionData) {
  try {
    const { text, type, description, route, status, created_at } = promotionData;
    const id = hashCode(`${text}${type}${status}${created_at}`).toString(16).substr(0, 5);
    const newPromotionRef = database.ref("DraftNews").push();

    await newPromotionRef.set({
      id,
      text,
      type,
      description,
      route,
      status,
      created_at,
    });

    console.log("Nova noticia adicionada com sucesso!");

    return id;
  } catch (error) {
    throw new Error("Erro ao adicionar nova noticia: " + error.message);
  }
}

export async function getDraftNews() {
  try {
    const promotionsRef = database.ref("DraftNews");
    const snapshot = await promotionsRef.once("value");
    const promotions = snapshot.val();

    return promotions;
  } catch (error) {
    throw new Error("Erro ao obter dados das promoções: " + error.message);
  }
}

export async function updateNotificationStatus(id, newStatus) {
  try {
    await database.ref('DraftNews').orderByChild('id').equalTo(id).once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.ref.update({
          status: newStatus
        });
      });
    });

    console.log("Status da promoção atualizado com sucesso!");
  } catch (error) {
    throw new Error("Erro ao atualizar o status da promoção: " + error.message);
  }
}

export async function moveDraftToPromotions(id) {
  try {
    const snapshot = await database.ref('DraftNews').orderByChild('id').equalTo(id).once('value');
    const promotionData = snapshot.val();

    if (promotionData && Object.keys(promotionData).length > 0) {
      const promotionKey = Object.keys(promotionData)[0]; 
      const promotion = promotionData[promotionKey]; 

      await database.ref('Promotions').push().update(promotion);

      await database.ref('DraftNews').child(promotionKey).remove();

      console.log("Promoção movida para a tabela Promotions com sucesso!");
    } else {
      throw new Error("Promoção não encontrada na tabela DraftNews ou está vazia.");
    }
  } catch (error) {
    throw new Error("Erro ao mover a promoção para a tabela Promotions: " + error.message);
  }
}

export async function editDraftNotification(id, newType, newText, newDescription, newRoute) {
  try {
    const snapshot = await database.ref('DraftNews').orderByChild('id').equalTo(id).once('value');
    const promotionData = snapshot.val();

    if (promotionData) {
      snapshot.forEach(function(childSnapshot) {
        const updateData = {};
        
        if (newText !== 'vazio') {
          updateData.text = newText;
        } else {
          updateData.text = promotionData.text;
        }

        if (newType !== 'vazio') {
          updateData.type = newType;
        } else {
          updateData.type = promotionData.type;
        }

        if (newDescription  !== 'vazio') {
          updateData.description = newDescription;
        } else {
          updateData.description = promotionData.description;
        }

        if (newRoute  !== 'vazio') {
          updateData.route = newRoute;
        } else {
          updateData.route = promotionData.route;
        }

        updateData.status = 'pending';

        childSnapshot.ref.update(updateData);
      });
      console.log("Texto e tipo da promoção atualizados com sucesso!");
    } else {
      throw new Error("Promoção não encontrada na tabela DraftNews.");
    }
  } catch (error) {
    throw new Error("Erro ao atualizar o texto e o tipo da promoção: " + error.message);
  }
}

export async function getDraftNewsById(id) {
  try {
    const promotionsRef = database.ref("DraftNews");
    const snapshot = await promotionsRef.orderByChild('id').equalTo(id).once("value");
    const promotion = snapshot.val();

    return promotion;
  } catch (error) {
    throw new Error("Erro ao obter dados da promoção: " + error.message);
  }
}
