import { message } from "antd";
import { database } from "../database/config";
import CryptoJS from "crypto-js";

export async function getMetalPrice() {
  try {
    const metalPriceRef = database.ref("MetalPrice");
    const snapshot = await metalPriceRef.once("value");
    const metalPriceData = snapshot.val();

    const metalObjectArray = [];
    if (metalPriceData) {
      Object.entries(metalPriceData).forEach(([metalName, metalInfo]) => {
        const metalObject = {
          MetalName: metalInfo[0][0], // Pega o valor da coluna 0
          value1: metalInfo[0][1],
          value2: metalInfo[0][2],
          value3: metalInfo[0][3],
          value4: metalInfo[0][4],
        };

        metalObjectArray.push(metalObject);
      });
    }
    return metalObjectArray;
  } catch (error) {
    throw new Error(
      "Erro ao obter dados da tabela MetalPrice: " + error.message
    );
  }
}

export async function getFavoriteMetals(userId) {
  try {
    const userRef = database.ref("Users").child(userId).child("FavoriteMetal");
    const snapshot = await userRef.once("value");
    const favoriteMetals = snapshot.val() || {};

    return favoriteMetals;
  } catch (error) {
    console.error("Error fetching favorite metals:", error);
    throw error;
  }
}

// Função para gerar um ID único
function generateUniqueID() {
  return new Date().getTime().toString();
}

export async function addFavoriteMetal(data, userId) {
  const favoriteMetalRef = database
    .ref("Users")
    .child(userId)
    .child("FavoriteMetal");

  // Encontre a última chave numérica utilizada
  const snapshot = await favoriteMetalRef
    .orderByKey()
    .limitToLast(1)
    .once("value");

  let lastKeyNumber = 0;

  snapshot.forEach((childSnapshot) => {
    const lastKey = childSnapshot.key;
    lastKeyNumber = parseInt(lastKey.match(/\d+/)[0]);
  });

  const newKeyNumber = lastKeyNumber + 1;
  const newKey = `save${newKeyNumber}`;

  // Gerar um ID único para o novo favorito
  const newFavoriteId = generateUniqueID();

  // Adicionar o ID ao objeto de dados
  const newData = {
    ...data,
    id: newFavoriteId,
  };

  // Salvar os dados com a nova chave
  const newFavoriteMetalRef = favoriteMetalRef.child(newKey);
  await newFavoriteMetalRef.set({ data: newData });
}

export async function deleteFavoriteMetal(id, userId) {
  const favoriteMetalRef = database
    .ref("Users")
    .child(userId)
    .child("FavoriteMetal");

  // Encontre os nós com o MetalName correspondente
  const snapshot = await favoriteMetalRef.once("value");

  snapshot.forEach((childSnapshot) => {
    const nodeKey = childSnapshot.key;
    const nodeData = childSnapshot.val();

    if (nodeData.data && nodeData.data.id === id) {
      favoriteMetalRef.child(nodeKey).remove();
    }
  });
}

export async function createCompareList(userId, listName, data) {
  try {
    const userRef = database.ref(`Users/${userId}/CompareList`);
    const formattedDate = new Date().toISOString();

    // criando a lista
    const listId = CryptoJS.AES.encrypt(
      `${listName}${formattedDate}`,
      1
    ).toString();

    await userRef.child(listName).set({
      name: listName,
      created_at: formattedDate,
      listId: listId,
    });

    // add metais à nova lista
    await saveMetalList(data, userId, listName);

    message.success("New list created and metals added successfully!");
    return listName;
  } catch (error) {
    console.error("Erro ao criar nova lista:", error);
    message.error("Unable to create list, please try again later");
    throw error;
  }
}

//listId é o nome da lista
export async function getUniqueCompareList(userId, listId) {
  try {
    const userRef = database.ref(`Users/${userId}/CompareList`);

    const snapshot = await userRef.once("value");
    const listData = snapshot.val() || [];

    const selectedList = Object.values(listData).filter((list) => {
      return list.listId === listId.replace(" ", "+");
    });

    return selectedList[0];
  } catch (error) {
    console.error("Erro ao obter lista única:", error);
    throw error;
  }
}

export async function getCompareList(userId) {
  try {
    const userRef = database.ref(`Users/${userId}/CompareList`);

    const snapshot = await userRef.once("value");
    const lists = snapshot.val() || {};

    const listOfLists = Object.keys(lists).map((key) => ({
      ...lists[key],
    }));

    return listOfLists;
  } catch (error) {
    console.error("Erro ao obter todas as listas:", error);
    throw error;
  }
}

export async function saveMetalList(data, userId, listName) {
  const favoriteMetalRef = database
    .ref("Users")
    .child(userId)
    .child("CompareList")
    .child(listName);

  // verifiando a última chave numérica utilizada
  const snapshot = await favoriteMetalRef
    .orderByKey()
    .limitToLast(1)
    .once("value");

  let lastKeyNumber = 0;

  snapshot.forEach((childSnapshot) => {
    const lastKey = childSnapshot.key;
    const match = lastKey.match(/\d+/);
    if (match) {
      lastKeyNumber = parseInt(match[0]);
    }
  });

  const dataArray = Array.isArray(data) ? data : Object.values(data);

  for (const item of dataArray) {
    const newKeyNumber = ++lastKeyNumber;
    const newKey = `metal${newKeyNumber}`;

    // gerando um ID único
    const newFavoriteId = generateUniqueID();

    // add o ID ao objeto de dados
    const newData = {
      ...item,
      id: newFavoriteId,
    };

    const newFavoriteMetalRef = favoriteMetalRef.child(newKey);
    await newFavoriteMetalRef.set(newData);
  }
}

export async function deleteCompareList(userId, listId) {
  try {
    const userRef = database.ref(`Users/${userId}/CompareList`);
    const listToDelete = userRef.child(listId);

    const snapshot = await listToDelete.once("value");
    if (!snapshot.exists()) {
      console.warn(`List not found.`);
      return false;
    }

    await listToDelete.remove();
    message.success("List deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error when deleting list:", error);
    message.error("Unable to delete the list, please try again later.");
    throw error;
  }
}
